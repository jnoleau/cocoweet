/* @flow */

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
export type ApiTweetType = {
  id_str: string,
  created_at: string,
  entities: {
    urls: ?ApiTweetEntityUrlType[],
    user_mentions: ?ApiTweetEntityMentionType[],
    hashtags: ?ApiTweetEntityHashtagType[]
  },
  text: string,
  user: ApiTweetAuthorType
};
