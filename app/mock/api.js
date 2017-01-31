import {u214572759} from 'app/mock/user';
import {tweetArray} from 'app/mock/tweet';

function delay<R>(result: R): Promise<R> {
  return new Promise((resolve) => setTimeout(() => resolve(result), 100));
}

export default {
  '/1.1/account/verify_credentials.json': () => delay(u214572759),
  '/1.1/statuses/home_timeline.json': ({count}) => delay(tweetArray(count, true))
};
