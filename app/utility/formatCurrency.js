export default formatCurrency = (amount) =>
  parseFloat(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
