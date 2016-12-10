// @flow
import type {ApiTweetType, ApiTweetEntityUrlType, ApiTweetEntityMentionType} from 'app/api/index';

import TwitterText from 'twitter-text';
import Unicode from 'app/util/unicode';

export type TweetBodyEntity = {
  type: 'text',
  value: string,
  indices: [number, number]
} | {
  type: 'url',
  value: ApiTweetEntityUrlType,
  indices: [number, number]
} | {
  type: 'mention',
  value: ApiTweetEntityMentionType,
  indices: [number, number]
};

/**
 * Extract all entities including text.
 * The final result will represent the tweet text as pieces in the good
 * order. Exemple for : "Hi @jnoleau, just chek your #mailbox"
 * --> [
 *  {indices: [0,3], value: 'Hi ', type:'text'},
 *  {indices: [3,11], value: {screen_name: "jnoleau" , .. }, type:'mention'},
 *  ..
 * ]
 * @param  {Object} Tweet returned by the twitter api
 * @return {array<Object>}
 */
export const bodyEntities = (tweet: ApiTweetType): TweetBodyEntity[] => {
  // aggregate entities in an array
  let entities: TweetBodyEntity[] = [];

  if (tweet.entities) {
    if (tweet.entities.urls) {
      entities = entities.concat(
        tweet.entities.urls.map(
          (e: ApiTweetEntityUrlType): TweetBodyEntity => (
            {indices: e.indices, value: e, type: 'url'}
          )
        )
      );
    }

    if (tweet.entities.user_mentions) {
      entities = entities.concat(
        tweet.entities.user_mentions.map(
          (e: ApiTweetEntityMentionType): TweetBodyEntity => (
            {indices: e.indices, value: e, type: 'mention'}
          )
        )
      );
    }
  }

  const text = new Unicode(tweet.text);

  if (entities.length === 0) {
    return [{
      indices: [0, text.length],
      value: text.toString(),
      type: 'text'
    }];
  }

  // sort by indices
  entities.sort(
    (a: TweetBodyEntity, b: TweetBodyEntity): number => a.indices[0] - b.indices[0]);

  // insert text entities
  const ret = [];

  // start -> entity:first
  ret.push({
    indices: [0, entities[0].indices[0]],
    type: 'text',
    value: text.slice(0, entities[0].indices[0]).toString()
  });

  // entity[n] -> entity[n+1]
  for (let i = 0; i < (entities.length - 1); i += 1) {
    ret.push(entities[i]);
    const indices = [entities[i].indices[1], entities[i + 1].indices[0]];
    ret.push({
      indices,
      type: 'text',
      value: text.slice(indices[0], indices[1]).toString()
    });
  }

  // entity:last -> end
  const last = entities[entities.length - 1];
  ret.push(last);
  if (last.indices[1] < text.length) {
    ret.push({
      indices: [last.indices[1], text.length],
      type: 'text',
      value: text.slice(last.indices[1], text.length).toString()
    });
  }

  return ret;
};

export const bodyLength: (text: string) => number = TwitterText.getTweetLength;
