import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProfileBadgeComponent } from './profiles'
import { Dashboard, Home, MyWall, FeedComponent, TweetsComponent, TweetDetailComponent } from './tweets'
import * as serviceWorker from './serviceWorker';
import Footer from './Common/footer';
import WhoToFollow from './MainComponent/WhoToFollow/WhoToFollow';
import ReportAdverse from './MainComponent/ReportAdverse/ReportAdverse';
import Trends from './MainComponent/Trends/Trends';

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}
// Home page:
const e = React.createElement
const tweetsEl = document.getElementById("tweetme-home")
if (tweetsEl) {
    ReactDOM.render(
        e(Home, tweetsEl.dataset), tweetsEl);
}

// My Wall Page:
const MyWallElement = document.getElementById("tweetme-profile-myWall")
if (MyWallElement) {
    ReactDOM.render(
        e(MyWall, MyWallElement.dataset), MyWallElement);
}

// Dashboard Page:
const DashboardElement = document.getElementById("user-dashboard-view")
if (DashboardElement) {
    ReactDOM.render(
        e(Dashboard, DashboardElement.dataset), DashboardElement);
}

// Who to Follow Page:
const WhoToFollowElement = document.getElementById("tweetme-profile-whoToFollow")
if (WhoToFollowElement) {
    ReactDOM.render(
        e(WhoToFollow, WhoToFollowElement.dataset), WhoToFollowElement);
}

// Report Adverse Page:
const ReportAdverseElement = document.getElementById("tweetme-profile-reportAdverse")
if (ReportAdverseElement) {
    ReactDOM.render(
        e(ReportAdverse, ReportAdverseElement.dataset), ReportAdverseElement);
}

// Trends Page:
const TrendsElement = document.getElementById("tweetme-profile-Trends")
if (TrendsElement) {
    ReactDOM.render(
        e(Trends, TrendsElement.dataset), TrendsElement);
}

// Tweet Details Element:
const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")
console.log("tweetDetailElements: ", tweetDetailElements)
tweetDetailElements.forEach(container => {
    ReactDOM.render(
        e(TweetDetailComponent, container.dataset),
        container);
})

// User Profile Badge Element:
const userProfileBadgeElements = document.querySelectorAll(".tweetme-2-profile-badge")
console.log("userProfileBadgeElements: ", userProfileBadgeElements)

userProfileBadgeElements.forEach(container => {
    console.log("container: ", container)
    ReactDOM.render(
        e(ProfileBadgeComponent, container.dataset),
        container);
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
