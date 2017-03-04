// @flow
import type {ApiTweetType} from 'app/api/index';
import tweetMock from 'app/mock/samples/compat/simple';

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
    result.push(clone(tweetMock));
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
