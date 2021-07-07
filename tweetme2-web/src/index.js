import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProfileBadgeComponent } from './profiles'
import { Dashboard, Home, MyWall, FeedComponent, TweetsComponent, TweetDetailComponent } from './tweets'
import * as serviceWorker from './serviceWorker';
import Footer from './Common/footer';

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}
const e = React.createElement
const tweetsEl = document.getElementById("tweetme-home")
if (tweetsEl) {
    ReactDOM.render(
        e(Home, tweetsEl.dataset), tweetsEl);
}

const tweetFeedEl = document.getElementById("tweetme-feed")
if (tweetFeedEl) {
    ReactDOM.render(
        e(Dashboard, tweetFeedEl.dataset), tweetFeedEl);
}

const tweetPorfileWallEl = document.getElementById("tweetme-profile-myWall")
if (tweetPorfileWallEl) {
    ReactDOM.render(
        e(MyWall, tweetPorfileWallEl.dataset), tweetPorfileWallEl);
}

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")

tweetDetailElements.forEach(container => {
    ReactDOM.render(
        e(TweetDetailComponent, container.dataset),
        container);
})

const userProfileBadgeElements = document.querySelectorAll(".tweetme-2-profile-badge")

userProfileBadgeElements.forEach(container => {
    ReactDOM.render(
        e(ProfileBadgeComponent, container.dataset),
        container);
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
