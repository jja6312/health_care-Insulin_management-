const numberFormat = (number) => {
  return new Intl.NumberFormat().format(number);
};

export default numberFormat;
