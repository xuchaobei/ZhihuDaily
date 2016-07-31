import React, { Component, PropTypes } from 'react';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll/build/iscroll-probe';
import Spinner from 'react-spin';
import fetchNewsList, {fetchLatestNews, setPositionOffset} from '../actions/MainAction';

require('./PullToRefresh.less');

const pullThreshold = 5;
const pullDownOffset = 25;

const spinConfig = {
  lines: 13,
  length: 3,
  width: 2,
  radius: 6,
  scale: 1,
  corners: 1,
  color: '#000',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  className: 'spinner',
  shadow: false,
  hwaccel: false,
  position: 'relative'
};

export default class PullToRefresh extends Component {
  constructor(props) {
    super(props);
    this._iScrollInstance = null;
    this._pullDownEl = null;
    this._pullUpEl = null;
    this._scrollStartPos = 0;
    this.state = {
      showPullUp: false,
      keepPosition: false
    };
    this._setTitle = props.onScrollEnd;
    this._onScrollStartHandler = this._onScrollStart.bind(this);
    this._onScrollHandler = this._onScroll.bind(this);
    this._onScrollEndHandler = this._onScrollEnd.bind(this);
    this._onRefreshHandler = this._onRefresh.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  render() { // eslint-disable-line
    const {children, pullDownLabel, options, onPullDown} = this.props;
    return (
      <div className="pull-to-refresh-wrapper">
        <ReactIScroll ref="ref_iscroller" className="wrapper"
                      iScroll={iScroll}
                      options={options}
                      onScrollStart={this._onScrollStartHandler}
                      onScroll={this._onScrollHandler}
                      onScrollEnd={this._onScrollEndHandler}
                      onRefresh={this._onRefreshHandler}>
          <div className="scroller">
            {
              onPullDown ? <div ref="ref_pulldown" className="pullDown scrolledUp">
                <span className="pullDownIcon"></span><span className="pullDownLabel">{pullDownLabel}</span>
              </div> : ''
            }
            {children}
            {
              this.state.showPullUp ?
                <div ref="ref_pullup" className="pullUp">
                  <Spinner config={spinConfig}/>
                </div> : ''
            }
          </div>
        </ReactIScroll>
        <span className="arrow arrow-up" onClick={this.scrollToTop}/>
      </div>
    );
  }

  componentDidUpdate() {
    // 确保Carousel的高度被同步到iScroollInstance对象上
    setTimeout(() => {
      this.refresh();
    }, 10);
  }

  componentWillUnmount() {
    if (this._iScrollInstance) {
      this._iScrollInstance.off('scrollStart');
      this._iScrollInstance.off('scrollEnd');
      this._iScrollInstance.off('scroll');
      this._onScrollStartHandler = null;
      this._onScrollHandler = null;
      this._onScrollEndHandler = null;
      this._onRefreshHandler = null;

      this._iScrollInstance.destroy();
    }
  }

  refresh() { // eslint-disable-line
    if (this._iScrollInstance) {
      this._iScrollInstance.refresh();
    }
  }

  getScrollerOffset() { // eslint-disable-line
    if (this._iScrollInstance) {
      return this._iScrollInstance.y;
    } else {
      return 0;
    }
  }

  scrollToOffset(y, time) {
    if (this._iScrollInstance) {
      this._iScrollInstance.scrollTo(0, y, (time === undefined ? 250 : time), iScroll.utils.ease.quadratic);
    } else {

    }
  }

  scrollToTop() {
    if (this._iScrollInstance) {
      this._iScrollInstance.scrollTo(0, 0, 250, iScroll.utils.ease.quadratic);
    }
  }

  scrollToEnd() {
    if (this._iScrollInstance) {
      this._iScrollInstance.scrollTo(0, this._iScrollInstance.wrapperHeight
        - this._iScrollInstance.scrollerHeight + pullDownOffset * 2, 250, iScroll.utils.ease.elastic);
    }
  }

  _showPullDownElNow(className) {
    this._pullDownEl.style.transitionDuration = '';
    this._pullDownEl.style.marginTop = '';
    this._pullDownEl.className = 'pullDown ' + className;
  }

  _hidePullDownEl(time, refresh) {
    this._pullDownEl.style.transitionDuration = (time > 0 ? time + 'ms' : '');
    this._pullDownEl.style.marginTop = '';
    this._pullDownEl.className = 'pullDown scrolledUp';
    if (refresh) {
      setTimeout(() => {
        this._iScrollInstance.refresh();
      }, time + 10);
    }
  }

  _showPullUpElNow(position, contentHeight) {
    if (this._pullUpEl) {
      this._pullUpEl.className = 'pullUp loading';
      setTimeout(() => {
        this._hidePullUpEl(position, contentHeight);
      }, 500);
    }
  }

  _hidePullUpEl(position, contentHeight) {
    if (this._iScrollInstance.scrollerHeight === contentHeight) {
      this._iScrollInstance.scrollTo(0, position + pullDownOffset * 2, 300,
        iScroll.utils.ease.quadratic);
    }
  }

  _onScrollStart() {
    console.log("onScrollStart");
    if (this._iScrollInstance) {
      this._scrollStartPos = this._iScrollInstance.y;
    }
  }

  _onScrollEnd() {
    console.log("onScrollEnd");
    const {onPullDown, onPullUp, pullDownLabel} = this.props;
    if (onPullDown && this._pullDownEl && this._pullDownEl.className.match('flip')) {
      this._showPullDownElNow('loading');
      this._pullDownEl.querySelector('.pullDownLabel').innerHTML = pullDownLabel;
      onPullDown();
    }
    const outOfRange = this._iScrollInstance.y + this._iScrollInstance.scrollerHeight - this._iScrollInstance.wrapperHeight - pullDownOffset * 2;
    if (outOfRange < 0 && onPullUp) {
      this._showPullUpElNow(this._iScrollInstance.y, this._iScrollInstance.scrollerHeight);
      onPullUp();
    }
    this._setTitle();
  }

  _onScroll() {
    console.log("onScroll");
    if (this._pullDownEl || this._pullUpEl) {
      if (this._scrollStartPos === 0 && this._iScrollInstance.y === 0) {
        // 'scroll' called, but scroller is not moving!
        // Probably because the content inside wrapper is small and fits the screen, so drag/scroll is disabled by iScroll

        // Fix this by a hack: Setting "myScroll.hasVerticalScroll=true" tricks iScroll to believe
        // that there is a vertical scrollbar, and iScroll will enable dragging/scrolling again...
        this._iScrollInstance.hasVerticalScroll = true;
        // Set scrollStartPos to -1000 to be able to detect this state later...
        this._scrollStartPos = -1000;
      } else if (this._scrollStartPos === -1000 &&
        (((!this._pullUpEl) && (this._iScrollInstance.y < 0)) ||
        ((!this._pullDownEl) && (this._iScrollInstance.y > 0)))) {
        // Scroller was not moving at first (and the trick above was applied), but now it's moving in the wrong direction.
        // I.e. the user is either scrolling up while having no "pull-up-bar",
        // or scrolling down while having no "pull-down-bar" => Disable the trick again and reset values...
        this._iScrollInstance.hasVerticalScroll = false;
        this._scrollStartPos = 0;

        // Adjust scrolling position to undo this "invalid" movement
        this._iScrollInstance.scrollBy(0, -this._iScrollInstance.y, 0);
      }

      if (this._pullDownEl) {
        if (this._iScrollInstance.y > pullDownOffset + pullThreshold && !this._pullDownEl.className.match('flip')) {
          this._showPullDownElNow('flip');
          // Adjust scrolling position to match the change in this._pullDownEl's margin-top
          this._iScrollInstance.scrollBy(0, -pullDownOffset, 0);
          this._pullDownEl.querySelector('.pullDownLabel').innerHTML = this.props.releaseToRefresh;
        } else if (this._iScrollInstance.y < 0 && this._pullDownEl.className.match('flip')) { // User changes his mind...
          this.hidePullDownEl(0, false);
          // Adjust scrolling position to match the change in this._pullDownEl's margin-top
          this._iScrollInstance.scrollBy(0, pullDownOffset, 0);
          this._pullDownEl.querySelector('.pullDownLabel').innerHTML = this.props.pullDownToRefresh;
        }
      }
      if (this._pullUpEl) {
        if (this._iScrollInstance.y < (this._iScrollInstance.maxScrollY - pullThreshold) && !this._pullUpEl.className.match('flip')) {
          this._pullUpEl.className = 'pullUp show';
        } else if (this._iScrollInstance.y > (this._iScrollInstance.maxScrollY + pullThreshold) && this._pullUpEl.className.match('flip')) {
          this._pullUpEl.className = 'pullUp';
        }
      }
    }
  }

  _onRefresh() {
    console.log("onScrollRefresh");
    this._iScrollInstance = this.refs.ref_iscroller.getIScroll();
    this._pullDownEl = this.refs.ref_pulldown;
    this._pullUpEl = this.refs.ref_pullup;
    if ((this._iScrollInstance.wrapperHeight < this._iScrollInstance.scrollerHeight - pullDownOffset)
      && !this.state.showPullUp && this.props.onPullUp) {
      this.setState({
        showPullUp: true
      });
      return;
    } else if ((this._iScrollInstance.wrapperHeight >= this._iScrollInstance.scrollerHeight - pullDownOffset)
      && this.state.showPullUp && this.props.onPullUp) {
      this.setState({
        showPullUp: false
      });
      return;
    }
    if (this._pullDownEl && this._pullDownEl.className.match('loading')) {
      this._pullDownEl.querySelector('.pullDownLabel').innerHTML = this.props.pullDownToRefresh;
      if (this._iScrollInstance.y >= 0) {
        // The pull-down-bar is fully visible:
        // Hide it with a simple 250ms animation
        setTimeout(()=>this._hidePullDownEl(250, true), 500);
      } else if (this._iScrollInstance.y > -pullDownOffset) {
        // The pull-down-bar is PARTLY visible:
        // Set up a shorter animation to hide it
        // Firt calculate a new margin-top for pullDownEl that matches the current scroll position
        this._pullDownEl.style.marginTop = this._iScrollInstance.y + 'px';

        // CSS-trick to force webkit to render/update any CSS-changes immediately: Access the offsetHeight property...
        this._pullDownEl.offsetHeight;

        // Calculate the animation time (shorter, dependant on the new distance to animate) from here to completely 'scrolledUp' (hidden)
        // Needs to be done before adjusting the scroll-positon (if we want to read this._iScrollInstance.y)
        const animTime = (250 * (pullDownOffset + this._iScrollInstance.y) / pullDownOffset);

        // Set scroll positon to top
        // (this is the same as adjusting the scroll postition to match the exact movement pullDownEl made due to the change of margin-top above, so the content will not "jump")
        this._iScrollInstance.scrollTo(0, 0, 0);

        // Hide pullDownEl with the new (shorter) animation (and reset the inline style again).
        // Do this in a new thread to avoid glitches in iOS webkit (will make sure the immediate margin-top change above is rendered)...
        setTimeout(() => {
          this._hidePullDownEl(animTime, true);
        }, 0);
      } else {
        // The pull-down-bar is completely off screen:
        // Hide it immediately
        this._hidePullDownEl(0, true);
        // And adjust the scroll postition to match the exact movement pullDownEl made due to change of margin-top above, so the content will not "jump"
        this._iScrollInstance.scrollBy(0, pullDownOffset, 0);
      }
    }
  }
}

PullToRefresh.propTypes = {
  children: PropTypes.any,
  options: PropTypes.object,
  onPullDown: PropTypes.func,
  onPullUp: PropTypes.func,
  pullDownLabel: PropTypes.string,
  releaseToRefresh: PropTypes.string,
  releaseToLoadMore: PropTypes.string,
  pullDownToRefresh: PropTypes.string,
  pullDownRefresh: PropTypes.string,
  pullUpRefresh: PropTypes.string
};

PullToRefresh.defaultProps = {
  options: {
    useTransition: true,
    probeType: 2,
    startY: 0
  },
  pullDownLabel: '下拉刷新',
  releaseToRefresh: '释放加载...',
  releaseToLoadMore: '释放加载更多',
  pullDownToRefresh: '释放加载...',
  pullDownRefresh: '加载中...',
  pullUpRefresh: '加载中...'
};
