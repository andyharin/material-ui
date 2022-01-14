import { Children, isValidElement, cloneElement } from 'react';

export function extendChildren(children, extendedProps, extendedChildren) {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const newProps = typeof extendedProps === 'function' ?
      extendedProps(child) : extendedProps;

    const newChildren = typeof extendedChildren === 'function' ?
      extendedChildren(child) : extendedChildren ?
      extendedChildren : child.props.children;

    return cloneElement(child, newProps, newChildren);
  });
}

