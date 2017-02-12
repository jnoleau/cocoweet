// @flow
import type {ApiTweetType} from 'app/api/index';
import type {RE} from 'app/flow/misc';

import React, {Component} from 'react';
import StreamTweet from 'app/view/main/stream.tweet';

type Props = {
  tweets: ApiTweetType[],
  offsetStep: number
};

type State = {
  from: number,
  to: number
};

class StreamList extends Component {
  static defaultProps = {
    nbDisplayed: 40,
    offsetStep: 20
  };

  clientHeight: number = 0; // eslint-disable-line react/sort-comp
  node: any;
  props: Props;
  scrollHeight: number = 0;
  scrollTop: number = 0;
  state: State = {
    from: 0,
    to: 40
  };

  getHeightRemaining(): number {
    const {scrollTop, clientHeight, scrollHeight} = this.node;
    return scrollHeight - scrollTop - clientHeight;
  }

  componentWillUpdate(): void {
    const {scrollTop, clientHeight, scrollHeight} = this.node;
    this.scrollTop = scrollTop;
    this.clientHeight = clientHeight;
    this.scrollHeight = scrollHeight;
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    console.log('scrollTop', this.scrollTop, this.node.scrollTop);
    console.log('scrollHeight', this.scrollHeight, this.node.scrollHeight);
    console.log('clientHeight', this.clientHeight, this.node.clientHeight);

    if (
      prevState.from !== this.state.from
      // && prevProps.stream.tweets[0].id_str !== this.props.stream.tweets[0].id_str
      // && !this.props.stream.columnOnTop
    ) {
      this.node.scrollTop = this.scrollTop + (this.node.scrollHeight - this.scrollHeight);
    }
  }

  onScroll = (): void => {
    const node = this.node;
    const onTop = node.scrollTop === 0;
    const isScrollingToBottom = (node.scrollTop - this.scrollTop) > 0;
    this.scrollTop = node.scrollTop;
    // //
    console.log('SCROLL - ', this.scrollTop, this.getHeightRemaining());
    //
    const stepBottom = Math.min(this.props.offsetStep, this.props.tweets.length - this.state.to);
    if (
      isScrollingToBottom &&
      this.getHeightRemaining() < 100 &&
      stepBottom > 0
    ) {
      this.setState({
        to: this.state.to + stepBottom
      }, (): void => {
        this.setState({
          from: this.state.from + stepBottom
        });
      });
    }

    const stepTop = Math.min(this.props.offsetStep, this.state.from);
    if (
      !isScrollingToBottom &&
      this.scrollTop < 100 &&
      stepTop > 0
    ) {
      this.setState({
        from: this.state.from - stepTop
      }, (): void => {
        this.setState({
          to: this.state.to - stepTop
        });
      });
    }
    //
    //
    //
    // if (onTop !== this.props.stream.columnOnTop) {
    //   this.context.store.dispatch(streamScrollTop(this.props.stream.id, onTop));
    // }
    //
    // if (isScrollingToBottom) this.testNeedMore();
  }

  render(): RE {
    const {tweets} = this.props;
    const {from, to} = this.state;
    const displayed: ApiTweetType[] = tweets.slice(from, to);

    window.setFromTo = (from, to): void => this.setState({from, to});

    return (
      <ul ref={(node: any): any => { this.node = node; return node; }} onScroll={this.onScroll}>
        {(displayed.map((tweet: ApiTweetType): RE => (
          <li key={tweet.id_str}>
            <StreamTweet tweet={tweet} />
          </li>
          )))}
      </ul>
    );
  }
}

export default StreamList;
