// @flow
import type {ApiTweetType} from 'app/api/index';
import type {RE} from 'app/flow/misc';
import type {TweetBodyEntity} from 'app/util/tweet';

import React from 'react';
import moment from 'moment';
import {never} from 'app/flow/misc';
import style from 'app/view/main/stream.less';
import Elink from 'app/view/util/elink';
import {bodyEntities, displayableRange} from 'app/util/tweet';

const Entity = ({entity}: {entity: TweetBodyEntity}): ?RE => {
  switch (entity.type) {
    case 'text':
      return <span>{entity.value}</span>;

    case 'media':
      return (
        <Elink href={entity.value.expanded_url ? entity.value.expanded_url : entity.value.url}>
          {entity.value.display_url}
        </Elink>
      );

    case 'url':
      return (
        <Elink href={entity.value.expanded_url ? entity.value.expanded_url : entity.value.url}>
          {entity.value.display_url}
        </Elink>
      );

    case 'mention':
      return (
        <a>@{entity.value.screen_name}</a>
      );

    case 'hashtag':
      return (
        <a>#{entity.value.text}</a>
      );

    default:
      never(entity.type);
      return null;
  }
};

const StreamTweet = ({tweet}: {tweet: ApiTweetType}): RE => {
  const date = moment(new Date(tweet.created_at));

  const range = displayableRange(tweet);

  console.log(bodyEntities(tweet), tweet);

  let media: ?RE = null;
  const bodyElements = bodyEntities(tweet).map((e: TweetBodyEntity, i: number): ?RE => {
    const inRange: boolean = (range[0] <= e.indices[1] && range[1] >= e.indices[0]);
    return inRange ? <Entity key={i} entity={e} /> : null;
  });

  const link: string =
    `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

  return (
    <div className={style.tweet}>
      <img alt="avatar" src={tweet.user.profile_image_url_https} />
      <header>
        <a className="user-info">
          <b>{tweet.user.name}</b>
          <span className="txt-small user-scname">@{tweet.user.screen_name}</span>
        </a>
        <time title={date.format('lll')} className="txt-small">
          <Elink href={link}>{date.format('HH:mm')}</Elink>
        </time>
      </header>
      <div className="tweet-body">
        {bodyElements}
        {media}
      </div>
      <footer />
    </div>
  );
};

export default StreamTweet;
