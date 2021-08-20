import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProfileBadgeComponent } from './profiles'
import { Dashboard, Home, MyWall, FeedComponent, TweetsComponent, TweetDetailComponent } from './tweets'
import * as serviceWorker from './serviceWorker';
import WhoToFollow from './MainComponent/WhoToFollow/WhoToFollow';
import ReportAdverse from './MainComponent/ReportAdverse/ReportAdverse';
import Trends from './MainComponent/Trends/Trends';
import SearchedUsers from './MainComponent/SearchedUsers/SearchedUsers';
import SearchedClacks from './MainComponent/SearchedClacks/SearchedClacks';
import SearchedTrendAllClacks from './MainComponent/SearchedTrendAllClacks/SearchedTrendAllClacks';
import ClacksView from './MainComponent/ClacksView/ClacksView';
import EditProfile from './MainComponent/EditProfile/EditProfile';

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

// Searched Users Page:
const SearchedUsersElement = document.getElementById("tweetme-profile-SearchedUsers")
if (SearchedUsersElement) {
    ReactDOM.render(
        e(SearchedUsers, SearchedUsersElement.dataset), SearchedUsersElement);
}
// Searched Clacks Page:
const SearchedClacksElement = document.getElementById("tweetme-profile-SearchedClacks")
if (SearchedClacksElement) {
    ReactDOM.render(
        e(SearchedClacks, SearchedClacksElement.dataset), SearchedClacksElement);
}

// Searched Trend Clacks Page:
const SearchedTrendAllClacksElement = document.getElementById("tweetme-profile-SearchedTrendClacks")
if (SearchedTrendAllClacksElement) {
    ReactDOM.render(
        e(SearchedTrendAllClacks, SearchedTrendAllClacksElement.dataset), SearchedTrendAllClacksElement);
}

// Clacks View Page:
const ClacksViewElement = document.getElementById("tweetme-profile-clacks-view")
if (ClacksViewElement) {
    ReactDOM.render(
        e(ClacksView, ClacksViewElement.dataset), ClacksViewElement);
}

// Edit Profile Page:
const EditProfileElement = document.getElementById("tweetme-profile-edit")
if (EditProfileElement) {
    ReactDOM.render(
        e(EditProfile, EditProfileElement.dataset), EditProfileElement);
}

// Tweet Details Element:
const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")
console.log("tweetDetailElements: ", tweetDetailElements)
tweetDetailElements.forEach(container => {
    console.log("container.dataset:", container.dataset)
    ReactDOM.render(
        e(TweetDetailComponent, container.dataset), container);
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
