// @flow

export function warn(...args: any[]): void {
  console.warn(...args); // eslint-disable-line no-console
}

export function error(...args: any[]): void {
  console.error(...args); // eslint-disable-line no-console
}

export function info(...args: any[]): void {
  console.log(...args); // eslint-disable-line no-console
}
