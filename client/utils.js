const formatBasename = (path) => {
  if(path === '/') {
    return '';
  }
  else if(path.length > 1 && path[path.length-1] === '/') {
    return path.slice(0, -1);
  }
  else {
    return path;
  }
};

export {
  formatBasename
};
