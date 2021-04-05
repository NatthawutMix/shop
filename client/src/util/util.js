export const productRate = (product) => {
  let rate = 0;
  let count = parseInt(product.comments.length);
  if (count === 0) {
    return 0;
  }
  if (product) {
    product.comments.map(
      (item) => (rate = parseInt(rate) + parseInt(item.rating))
    );
  }
  return (rate / count).toFixed(1);
};
