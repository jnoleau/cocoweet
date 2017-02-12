// @flow
import type {ApiTweetType} from 'app/api/index';
import tweetExtendedBig from 'app/mock/samples/initial/extended_big';

function clone<T>(t: T): T {
  if (typeof t === 'object') return {...t};

  return t;
}

// function cloneArray<T>(els: Array<T>): Array<T> {
//   return els.map((t: T): T => clone(t));
// }

export function tweetArray(nb: number, fakeId: boolean = false): ApiTweetType[] {
  let result = [];

  while (result.length < nb) {
    result.push(clone(tweetExtendedBig));
  }

  result = result.slice(0, nb);

  if (fakeId) {
    result.forEach((t: ApiTweetType): void => {
      const id = Math.round(Math.random() * 100000000);
      t.id_str = `${id}`;
    });
  }

  return result;
}

export function tweet(pos: number = 0): ApiTweetType {
  return tweetArray(pos + 1)[pos];
}
