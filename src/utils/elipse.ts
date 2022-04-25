const ellipse = (str: string, length = 29) => {
  if (str.length > length) {
    return str.substr(0, length - 1) + '...';
  }
  return str;
};

export default ellipse;
