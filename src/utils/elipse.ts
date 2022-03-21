const ellipse = (string: string, length = 29) => {
  if (string.length > length) {
    return string.substr(0, length - 1) + '...';
  }
  return string;
};

export default ellipse;
