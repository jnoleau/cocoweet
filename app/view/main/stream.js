/* @flow */
import type {ApiTweetType} from 'app/api/index';
import type {TweetBodyEntity} from 'app/util/tweet';
import {unexpectedCase} from 'app/flow/misc';

import React, {Element} from 'react';
import moment from 'moment';
import style from 'app/view/main/stream.less';
import Elink from 'app/view/util/elink';
import {bodyEntities} from 'app/util/tweet';

import {tweet} from 'app/mock/tweet';

console.log(tweet(2));
console.log(tweet(0));

const Tweet = ({tweet}: {tweet: ApiTweetType}): Element<*> => {
  const date = moment(new Date(tweet.created_at));

  const bodyElements = bodyEntities(tweet).map((e: TweetBodyEntity, i: number): Element<any> => {
    switch (e.type) {
      case 'text':
        return <span key={i}>{e.value}</span>;

      case 'url':
        return (
          <Elink key={i} href={e.value.expanded_url ? e.value.expanded_url : e.value.url}>
            {e.value.display_url}
          </Elink>
        );

      case 'mention':
        return (
          <a>@{e.value.screen_name}</a>
        );

      case 'hashtag':
        return (
          <a>#{e.value.text}</a>
        );

      default:
        unexpectedCase(e.type);
        return <span key={i}>dsd</span>;
    }
  });

  return (
    <div className={style.tweet}>
      <img alt="avatar" src={tweet.user.profile_image_url_https} />
      <header>
        <a className="user-info">
          <b>{tweet.user.name}</b>
          <span className="txt-small user-scname">@{tweet.user.screen_name}</span>
        </a>
        <time title={date.format('lll')} className="txt-small">
          <Elink href="http://google.fr">{date.format('HH:mm')}</Elink>
        </time>
      </header>
      <div className="tweet-body">
        {bodyElements}
      </div>
      <footer />
    </div>
  );
};

export default (): Element<*> => (
  <div className={style.stream}>
    <header className={style.head}>TIMELINE</header>
    <ul>
      <li><Tweet tweet={tweet()} /></li>
      <li><Tweet tweet={tweet(2)} /></li>
    </ul>
  </div>
);
