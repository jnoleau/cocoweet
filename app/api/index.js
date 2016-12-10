/* @flow */

export type ApiUserType = {
  id_str: string,
  name: string,
  screen_name: string,
  profile_image_url_https: string
};

export type ApiTweetAuthorType = ApiUserType;
// https://dev.twitter.com/overview/api/entities-in-twitter-objects#urls
export type ApiTweetEntityUrlType = {
  url: string, // The t.co URL that was extracted from the Tweet text
  display_url: string, // Not a valid URL but a string to display instead of the URL
  expanded_url: ?string, // The resolved URL
  indices: [number, number]
}
export type ApiTweetEntityType = ApiTweetEntityUrlType;
export type ApiTweetType = {
  id_str: string,
  created_at: string,
  entities: {
    urls: ?ApiTweetEntityUrlType[]
  },
  text: string,
  user: ApiTweetAuthorType
};
