// @flow
export type Empty = 'empty' & 42;

export function unexpectedCase(impossible: Empty): void {
  console.error(`Unexpected case ${impossible}`); // eslint-disable-line no-console
}
