export default {

  isDescendant(parent, child) {
    let node = child.parentNode;

    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },

  offset(el) {
    if (!canUseDom) return {top: 0, left: 0};
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  },

};

export const canUseDom = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const getWindowDim = () => {
  if (!canUseDom) return {width: 1000, height: null};
  const width = document.documentElement.clientWidth || document.clientWidth ||
    document.body.clientWidth || window.innerWidth;
  const height = document.documentElement.clientHeight || document.clientHeight ||
    document.body.clientHeight || window.innerHeight;
  return {width, height};
};
