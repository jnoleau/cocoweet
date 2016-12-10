// @flow
import React, {Element} from 'react';

export default ({href, children}: {href: string, children?: any}): Element<*> => {
  const onClick = (e: Event): void => {
    e.preventDefault();
    window.require('electron').shell.openExternal(href);
  };

  return <a href={href} onClick={onClick} rel="noopener noreferrer">{children}</a>;
};
