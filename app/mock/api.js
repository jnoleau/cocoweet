import {u214572759} from 'app/mock/user';

function delay<R>(result: R): Promise<R> {
  return new Promise((resolve) => setTimeout(() => resolve(result), 200));
}

export default {
  '/1.1/account/verify_credentials.json': () => delay(u214572759)
};
