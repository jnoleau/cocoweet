// @flow
import Request from 'superagent';
import Oauth from 'app/api/lib/oauth';
import Const from 'app/const';
import MockRestApi from 'app/mock/api';
import * as Log from 'app/util/log';

const apiMocked = [
  '/1.1/account/verify_credentials.json',
  '/1.1/statuses/home_timeline.json'
];

export type ApiCredentialsType = {
  key: string,
  secret: string
};

export type ApiUserType = {
  id_str: string,
  name: string,
  screen_name: string,
  profile_image_url_https: string
};

export type ApiTweetAuthorType = ApiUserType;
// https://dev.twitter.com/overview/api/entities-in-twitter-objects
export type ApiTweetEntityUrlType = {
  url: string, // The t.co URL that was extracted from the Tweet text
  display_url: string, // Not a valid URL but a string to display instead of the URL
  expanded_url: ?string, // The resolved URL
  indices: [number, number]
}
export type ApiTweetEntityMentionType = {
  id: number,
  id_str: string,
  screen_name: string,
  name: string, // The user full name
  indices: [number, number]
}
export type ApiTweetEntityHashtagType = {
  text: string,
  indices: [number, number]
}
export type ApiTweetEntityMediaType = {
  id: number,
  id_str: string,
  media_url: string,
  media_url_https: string,
  url: string, // The media URL that was extracted
  display_url: string, // Not a URL but a string to display instead of the media URL
  expanded_url: string, // The fully resolved media URL
  sizes: {
    [key: 'thumb' | 'small' | 'medium' | 'large']: {
      w: number,
      h: number,
      resize: 'crop' | 'fit'
    }
  }, // use media_url:size ie http://pbs.twimg.com/media/A7EiDWcCYAAZT1D.jpg:thumb
  type: 'photo',
  indices: [number, number]
}
type ApiTweetCommonType = {
  id_str: string,
  created_at: string,
  entities: {
    urls?: ApiTweetEntityUrlType[],
    user_mentions?: ApiTweetEntityMentionType[],
    hashtags?: ApiTweetEntityHashtagType[],
    media?: ApiTweetEntityMediaType[]
  },
  user: ApiTweetAuthorType
}
// export type ApiTweetType = ApiTweetCommonType & {
//   text: string
// };

export type ApiTweetType = ApiTweetCommonType & {
  full_text: string
};


function sendRequest(request: *, noFail: boolean = false): Promise<*> {
  return new Promise((resolve: Function, reject: Function): void => {
    request
      .end((err: Error, res: *): void => {
        if (err !== null) {
          if (noFail) resolve(res);
          else reject(new Error('API_ERROR'));
        } else {
          resolve(res);
        }
      });
  });
}

function correctTimestamp(dateStr: string): void {
  const time: number = new Date(dateStr).getTime();
  if (!isNaN(time)) {
    Oauth.correctTimestamp(time / 1000);
  }
}

/**
 * Synchronise local clock with Twitter servers because Twitter only accepts
 * very little delay on oauth_timestamp
 */
export async function syncTime(): Promise<void> {
  const res = await sendRequest(
    Request.head('https://api.twitter.com/1.1/help/configuration.json'), true);

  correctTimestamp(res.header.date);
}

/**
 * @throws API_ERROR
 */
async function signRequest<P: Object>(
  method: 'GET' | 'POST',
  url: string,
  parameters: P,
  consumerKey: string,
  token: ?string,
  tokenSecret: ?string): Promise<P> {
  const m = {parameters: {...parameters}, action: url, method};
  Oauth.completeRequest(m, {consumerKey, token, tokenSecret});
  type Data = $Subtype<{message: string}>;
  const data: Data = {message: Oauth.SignatureMethod.getBaseString(m)};
  if (tokenSecret !== undefined) data.token = tokenSecret;

  const signature: {text: string} = await sendRequest(
    Request.post(Const.COCOWEET_SIGNER_ENDPOINT)
      .type('form')
      .send(data)
  );

  Oauth.setParameter(m, 'oauth_signature', signature.text);
  return m.parameters;
}

/**
 * @throws API_ERROR
 */
export async function get(url: string, params: Object, creds: ?ApiCredentialsType): Promise<*> {
  if (~apiMocked.indexOf(url)) {
    const result = await MockRestApi[url](params);
    Log.info('Mock call', url, params, result);

    return result;
  }

  const finalUrl = `https://api.twitter.com${url}`;
  const promise = creds ?
    signRequest('GET', finalUrl, params, Const.TWITTER_CONSUMER_KEY, creds.key, creds.secret)
    : signRequest('GET', finalUrl, params, Const.TWITTER_CONSUMER_KEY)
  ;

  const signedParams = await promise;
  const result = await Request.get(finalUrl).query(signedParams);

  return result.body === null ? result : result.body;
}

/**
 * @throws API_ERROR
 */
export async function
  post(url: string, params: Object, {key, secret}: ApiCredentialsType): Promise<*> {
  const finalUrl = `https://api.twitter.com${url}`;

  const signedParams =
    await signRequest('POST', finalUrl, params, Const.TWITTER_CONSUMER_KEY, key, secret);
  const result = await Request.post(finalUrl).type('form').send(signedParams);

  return result.body === null ? result : result.body;
}

function urlExtractCredentials(uri: string): ApiCredentialsType {
  const matches = uri.match(/oauth_token=([^&]*)&oauth_token_secret=([^&]*)/);
  if (matches && matches.length === 3) {
    const [, key, secret] = matches;
    return {key, secret};
  }

  throw new Error('API_ERROR');
}
/**
 * 3-legged authentication step 1
 * @return {Promise} request token
 * @throws API_ERROR
 */
export async function oauthRequestToken(callbackUrl: string): Promise<ApiCredentialsType> {
  const rtokenUri: string = (await get('/oauth/request_token', {oauth_callback: callbackUrl})).text;

  return urlExtractCredentials(rtokenUri);
}

/**
 * 3-legged authentication step 2
 */
export function oauthAuthenticateUrl(rtokenKey: string): string {
  return `https://api.twitter.com/oauth/authenticate?oauth_token=${rtokenKey}`;
}

/**
* 3-legged authentication step 3
* @return {Promise} access token
* @throws API_ERROR
*/
export async function oauthAccessToken(
  verifier: string, rtoken: ApiCredentialsType): Promise<ApiCredentialsType> {
  const atokenUri: string =
    (await get('/oauth/access_token', {oauth_verifier: verifier}, rtoken)).text;

  return urlExtractCredentials(atokenUri);
}

export function accountVerifyCredentials(creds: ApiCredentialsType): Promise<ApiUserType> {
  return get('/1.1/account/verify_credentials.json', {}, creds);
}

export function homeTimeline(creds: ApiCredentialsType, count: number
  ): Promise<ApiTweetType[]> {
  return get('/1.1/statuses/home_timeline.json', {count, tweet_mode: 'extended'}, creds);
}
