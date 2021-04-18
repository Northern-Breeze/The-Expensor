const ellipse = (string) => {
  if (string.length > 29) {
    return string.substr(0, 29 - 1) + '...';
  }
  return string;
};

export default ellipse;
