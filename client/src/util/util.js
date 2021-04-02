export const productRate = (product) => {
  let rate = 0;
  let count = parseInt(product.commentsList.length);
  if (count === 0) {
    return 0;
  }
  if (product) {
    product.commentsList.map(
      (item) => (rate = parseInt(rate) + parseInt(item.rating))
    );
  }
  return (rate / count).toFixed(1);
};
