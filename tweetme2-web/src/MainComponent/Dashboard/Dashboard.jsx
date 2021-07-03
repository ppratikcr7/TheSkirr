import React, { useEffect, useState } from 'react'
import { Button,Col, Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { TweetCreate } from '../../tweets/create';
import { backendLookup } from '../../lookup/index';
import { TweetsList } from '../../tweets/list';
import './Dashboard.css';
import NSAII_logo from '../../Assets/nsaii_logo.png';
import formatDate from './date';
import { apiTweetList } from '../../tweets/lookup';
import {
    UserWhoToFollowDisplay
} from '../../profiles'
import $ from 'jquery';

const { Search } = Input;

export default function Dashboard(props) {

    const [newTweets, setNewTweets] = useState([]);
    let [newProfile, setNewProfile] = useState();
    let [newUserName, setUserName] = useState();
    let [whoToFollowUser1, setwhoToFollowUser1] = useState();
    let [whoToFollowUser2, setwhoToFollowUser2] = useState();
    let [whoToFollowUser3, setwhoToFollowUser3] = useState();
    let [searchType, setSearch] = useState();
    // let [whotofollowProfile1, setProfile1] = useState();
    let [currentUserTotalLikes, setCurrentUserTotalLikes] = useState();
    let [currentUserTotalClacks, setCurrentUserTotalClacks] = useState();

    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
    const handleNewUsername = (newUserName) => {

        setUserName(newUserName ? newUserName.username : "")
        //get random 3 users to follow:
        getWhoToFollowUser1();
        getWhoToFollowUser2();
        getWhoToFollowUser3();
        // function call for getting current user profile
        getMainProfile(newUserName.username, handleNewProfile);
        // function call for getting gagan user profile
        // getProfile1("Gagan123", handleNewProfile1);
        // function call for getting total likes for current user
        getCurrentUserTotalLikes();
        // function call for getting total clacks for current user
        getCurrentUserTotalClacks();

    }

    const handleNewProfile = (newProfile) => {
        setNewProfile(newProfile)
    }

    // who to follow:
    // const handleNewProfile1 = (whotofollowProfile1) => {
    //     setProfile1(whotofollowProfile1)
    // }

    const handleSearch = (searchType) => {
        setSearch(searchType)
    }

    const handleWhoToFollowUser1 = (whoToFollowUser1) => {
        setwhoToFollowUser1(whoToFollowUser1)
    }
    const handleWhoToFollowUser2 = (whoToFollowUser2) => {
        setwhoToFollowUser2(whoToFollowUser2)
    }
    const handleWhoToFollowUser3 = (whoToFollowUser3) => {
        setwhoToFollowUser3(whoToFollowUser3)
    }

    const handleCurrentUserTotalLikes = (currentUserTotalLikes) => {
        setCurrentUserTotalLikes(currentUserTotalLikes)
    }

    const handleCurrentUserTotalClacks = (currentUserTotalClacks) => {
        setCurrentUserTotalClacks(currentUserTotalClacks)
    }

    function getWhoToFollowUser1() {
        try {
            let endpoint = `/profiles/who_to_follow_users/user1/`;
            backendLookup("GET", endpoint, handleWhoToFollowUser1)
        } catch (error) {
            console.log("error:", error);
        }
    }

    function getWhoToFollowUser2() {
        try {
            let endpoint = `/profiles/who_to_follow_users/user2/`;
            backendLookup("GET", endpoint, handleWhoToFollowUser2)
        } catch (error) {
            console.log("error:", error);
        }
    }

    function getWhoToFollowUser3() {
        try {
            let endpoint = `/profiles/who_to_follow_users/user3/`;
            backendLookup("GET", endpoint, handleWhoToFollowUser3)
        } catch (error) {
            console.log("error:", error);
        }
    }

    function getCurrentUserTotalLikes() {
        try {
            let endpoint = `/profiles/current_user/likes/`;
            backendLookup("GET", endpoint, handleCurrentUserTotalLikes)
        } catch (error) {
            console.log("error:", error);
        }
    }

    function getCurrentUserTotalClacks() {
        try {
            let endpoint = `/profiles/current_user/clacks/`;
            backendLookup("GET", endpoint, handleCurrentUserTotalClacks)
        } catch (error) {
            console.log("error:", error);
        }
    }

    function getMainProfile(username) {
        try {
            let endpoint = `/profiles/user/${username}/`;
            backendLookup("GET", endpoint, handleNewProfile)
        } catch (error) {
            console.log("error:", error);
        }
    }

    // join date update:
    if (newProfile && newProfile.date_joined) {
        var date = newProfile.date_joined;
        var cleanDate = formatDate(date)
    }
    else {
        var cleanDate = "1 Jan 2021, 12AM";
    }

    const handleListLookup = (response, status) => {
        if (status === 200) {
            setNewTweets(response.results)
        } else {
            alert("There was an error")
        }
    }

    function handleTweetList(value) {
    apiTweetList(null, handleListLookup);
    }

    useEffect(() => {
        try {
            let endpoint1 = "/profiles/get_user/username/";
            backendLookup("GET", endpoint1, handleNewUsername)
        } catch (error) {
            console.log("error:", error);
        }
    }, [])

    const MAX_TWEET_LENGTH = 200;

    $("#clackText").keyup(function(){
        $("#info").text(($(this).val().length) + " / " + MAX_TWEET_LENGTH)
    });

    $('#clackText').keypress(function () {
        var charLength = $(this).val().length;
        if (charLength >= MAX_TWEET_LENGTH) {
            $("#error").text(('You cannot enter more than ' + MAX_TWEET_LENGTH + ' characters'));
            return false;
        }
        var textareaLength = document.getElementById("clackText").length;
        if (textareaLength < MAX_TWEET_LENGTH) {
            $("#error").text((''));
            return false;
        }
    });

    const handleClick = ({key}) => {
        window.localStorage.setItem('search_type', key);
        if(key == 0){
            console.log("User")
        }
        else if(key == 1){
            console.log("Clacks")
        }
        else {
            console.log("Trends")
        }

      }

    const menu = (
        <Menu onClick={handleClick}>
          <Menu.Item key="0">
              User
          </Menu.Item>
          <Menu.Item key="1">
              Clacks
          </Menu.Item>
          {/* <Menu.Divider /> */}
          <Menu.Item key="2">
            Trends
          </Menu.Item>
        </Menu>
      );


    const onSearch = value => {
        console.log("searched keyword: ", value);
        // replace below key value with one set from menu item:
        const key = window.localStorage.getItem('search_type');
        // const key = 0;
        console.log("key: ",key);
        try {
            if(key == 0){
                let endpoint = `/accounts/seach_users/?value`;
                backendLookup("GET", endpoint, handleSearch);
            }
            else if(key == 1){
                let endpoint = `/accounts/seach_clacks/?value`;
                backendLookup("GET", endpoint, handleSearch);
            }
            else {
                value = "!" + value;
                let endpoint = `/accounts/seach_trends_in_clacks/?value`;
                backendLookup("GET", endpoint, handleSearch);
            } 
            
        } catch (error) {
            console.log("error:", error);
        }
    }


    // $('#clackText').trigger(function () {
    //     var maxLength = $(this).val().length;
    //     if (maxLength < MAX_TWEET_LENGTH) {
    //         $("#error").text((''));
    //         return false;
    //     }
    // });

        return (
            <>
                <div className="bg-white shadow">
                    {/* style={{ marginTop: 104 }} */}
                    <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                        <div className="w-full lg:w-1/5">
                        </div>
                        <div className="w-full lg:w-2/5">
                            <ul className="list-reset flex">
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                    <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Clacks</div>
                                        <div className="text-lg tracking-tight font-bold text-teal">{currentUserTotalClacks ? currentUserTotalClacks : "0"}</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Fans</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">{newProfile ? newProfile.follower_count : "0"}</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Companion</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">{newProfile ? newProfile.following_count : "0"}</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Likes</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">{currentUserTotalLikes ? currentUserTotalLikes : "0"}</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Moments</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full lg:w-2/5 flex lg:my-0 lg:justify-end items-center">
                            <div className="mr-2">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Search Type <DownOutlined />
                                </a>
                            </Dropdown>
                            </div>
                            {/* search box */}
                            <Search
                                placeholder="input search text"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch} style={{ width: 300, color: "#3b82f6"}}
                                />

                            {/* <svg version="1.1" className="h-4 text-dark" x="0px" y="0px" viewBox="0 0 52.966 52.966" >
                                <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                                        c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                                        C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
                                        S32.459,40,21.983,40z"/></svg>
                            <div className="searchbox">
                                <div className="relative ml-2">
                                    <input type="search" className="bg-purple-white shadow rounded border-0 p-3" placeholder="Search" />
                                    <div className="absolute pin-r pin-t text-purple-lighter">

                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <div className="w-full lg:w-1/5 pl-2 lg:pl-0 pr-2 mt-0 mb-4">
                        <div className="mb-4">
                            <span className="text-lg font-bold">User Bio</span>
                            <br />
                        </div>
                        <h1><a href="#" className="text-black font-bold no-underline">{newProfile ? newProfile.first_name + " " + newProfile.last_name : "Name"}</a></h1>
                        <div className="mb-4"><a href="#" className="text-grey-darker no-underline">{newProfile ? newProfile.username : "@username"}</a></div>
                        <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline">{newProfile ? newProfile.email : "EmailID"}</a></div>
                        <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline">{newProfile ? "Joined: " + cleanDate : "Joined: 1 Jan 2021 12AM"}</a></div>
                        <Col span={7} >
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} onClick={() => { this.props.history.push(`/profiles/my_wall/?username=${newUserName}`) }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href={"/profiles/my_wall/" + newUserName} style={{ textDecoration: "none" }}>My wall</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} onClick={() => { this.props.history.push("/") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/" style={{ textDecoration: "none" }}>My Dashboard</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} onClick={() => { this.props.history.push("/profiles/trending_exclamation") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/profiles/trending_exclamation" style={{ textDecoration: "none" }}>Trending Exclamation</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} onClick={() => { this.props.history.push("/profiles/more_accounts") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/profiles/more_accounts" style={{ textDecoration: "none" }}>Who to Follow</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} onClick={() => { this.props.history.push("/") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/" style={{ textDecoration: "none" }}>Clack Now</a>
                            </Button>
                        </Col>
                    </div>

                    <div className="w-full lg:w-3/5 bg-white mb-20">
                        <div className="flex justify-between mb-1">
                            <div>
                                <span className="text-lg font-bold">&emsp;&emsp;Home</span>
                            </div>
                        </div>
                        <div className="p-3 text-lg font-bold border-b border-solid border-grey-light">
                            {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
                        </div>
                        <TweetsList newTweets={newTweets} tweetHandle={handleTweetList} {...props} />
                        {/* <TweetsList newTweets={newTweets} {...props} /> */}

                    </div>

                    <div className="w-full lg:w-1/5 pl-0">
                        <div className="bg-white p-3 mb-3">
                            <div>
                                <span className="text-lg font-bold p-2">Who to follow</span>
                            </div>
                            <div className="p-2">
                            
                                {(whoToFollowUser1) ? <UserWhoToFollowDisplay includeFullName user={whoToFollowUser1} /> : <div></div>}
                                {/* use the below for color encoding */}
                                {/* <span class="text-grey-dark">&middot;</span> */}
                            </div>
                            <div className="p-2">
                                {(whoToFollowUser2) ? <UserWhoToFollowDisplay includeFullName user={whoToFollowUser2} /> : <div></div>}
                                {/* use the below for color encoding */}
                                {/* <span class="text-grey-dark">&middot;</span> */}
                            </div>
                            <div className="p-2">
                                {(whoToFollowUser3) ? <UserWhoToFollowDisplay includeFullName user={whoToFollowUser3} /> : <div></div>}
                                {/* use the below for color encoding */}
                                {/* <span class="text-grey-dark">&middot;</span> */}
                            </div>
                            {/* <div className="flex border-b border-solid border-grey-light">
                            <div className="py-2">
                                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow1.jpg" alt="follow1" className="rounded-full h-12 w-12" /></a>
                            </div>
                            <div className="pl-2 py-2 w-full">
                                <div className="flex justify-between mb-1">
                                    <div>
                                        <a href="#" className="font-bold text-black">Vidhi</a> <a href="#" className="text-grey-dark">@vidhi123</a>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-b border-solid border-grey-light">
                            <div className="py-2">
                                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow2.jpg" alt="follow1" className="rounded-full h-12 w-12" /></a>
                            </div>
                            <div className="pl-2 py-2 w-full">
                                <div className="flex justify-between mb-1">
                                    <div>
                                        <a href="#" className="font-bold text-black">Gagan</a> <a href="#" className="text-grey-dark">@gagan123</a>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                        Follow
                            </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex border-b border-solid border-grey-light">
                            <div className="py-2">
                                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow3.jpg" alt="follow1" className="rounded-full h-12 w-12" /></a>
                            </div>
                            <div className="pl-2 py-2 w-full">
                                <div className="flex justify-between mb-1">
                                    <div>
                                        <a href="#" className="font-bold text-black">Ketul</a> <a href="#" className="text-grey-dark">@ketulshah</a>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div> */}
                            <hr className="mt-2 mb-2"></hr>
                            <div className="flex justify-between mb-1">
                                <div>  
                                    <a href="/profiles/more_accounts" className="font-bold text-black">Show more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }