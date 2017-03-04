// @flow
import {Element} from 'react';

export type Empty = 'empty' & 42;

export function never(e: Empty): void {
  console.error(`Unexpected case ${e}`); // eslint-disable-line no-console
}

export type RE = Element<any>;
