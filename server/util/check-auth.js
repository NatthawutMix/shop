const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (headers) => {
  console.log(headers);
  const authHeader = headers;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provider");
};
