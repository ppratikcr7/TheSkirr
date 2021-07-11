import React, { useEffect, useState } from 'react'
import { Button, Col, Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { TweetCreate } from '../../tweets/create';
import { backendLookup } from '../../lookup/index';
import { TweetsList } from '../../tweets/list';
import './Mywall.css';
import NSAII_logo from '../../Assets/nsaii_logo.png';
import formatDate from './date';
import { apiTweetList } from '../../tweets/lookup';
import {
    UserWhoToFollowDisplay
} from '../../profiles'
import $ from 'jquery';

const { Search } = Input;

export default function MyWall(props) {

    const [newTweets, setNewTweets] = useState([]);
    let [newProfile, setNewProfile] = useState();
    let [newUserName, setUserName] = useState();
    let [whoToFollowUser1, setwhoToFollowUser1] = useState();
    let [whoToFollowUser2, setwhoToFollowUser2] = useState();
    let [whoToFollowUser3, setwhoToFollowUser3] = useState();
    // let [currentUserTotalLikes, setCurrentUserTotalLikes] = useState();
    // let [currentUserTotalClacks, setCurrentUserTotalClacks] = useState();

    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) => {
        console.log("newTweet1:", newTweet);
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        console.log("tempNewTweets2:", tempNewTweets);
        setNewTweets(tempNewTweets)
    }
    const handleNewUsername = (newUserName) => {
        setUserName(newUserName ? newUserName : "")
        getMainProfile(newUserName, handleNewProfile);
        //get random 3 users to follow:
        getWhoToFollowUser1();
        getWhoToFollowUser2();
        getWhoToFollowUser3();
    }

    // useEffect(() => {
    //     getCurrentUserTotalLikes();
    //     getCurrentUserTotalClacks();
    // })

    const handleNewProfile = (newProfile) => {
        setNewProfile(newProfile)
    }

    // who to follow:
    const handleWhoToFollowUser1 = (whoToFollowUser1) => {
        setwhoToFollowUser1(whoToFollowUser1)
    }
    const handleWhoToFollowUser2 = (whoToFollowUser2) => {
        setwhoToFollowUser2(whoToFollowUser2)
    }
    const handleWhoToFollowUser3 = (whoToFollowUser3) => {
        setwhoToFollowUser3(whoToFollowUser3)
    }

    // const handleCurrentUserTotalLikes = (currentUserTotalLikes) => {
    //     setCurrentUserTotalLikes(currentUserTotalLikes)
    // }

    // const handleCurrentUserTotalClacks = (currentUserTotalClacks) => {
    //     setCurrentUserTotalClacks(currentUserTotalClacks)
    // }

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

    // function getCurrentUserTotalLikes() {
    //     try {
    //         let endpoint = `/profiles/current_user/likes/`;
    //         backendLookup("GET", endpoint, handleCurrentUserTotalLikes)
    //     } catch (error) {
    //         console.log("error:", error);
    //     }
    // }

    // function getCurrentUserTotalClacks() {
    //     try {
    //         let endpoint = `/profiles/current_user/clacks/`;
    //         backendLookup("GET", endpoint, handleCurrentUserTotalClacks)
    //     } catch (error) {
    //         console.log("error:", error);
    //     }
    // }

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
        console.log("value:", value);
        if (value !== "like" && value !== "unlike") {
            console.log("enter1");
            apiTweetList(null, handleListLookup);
        } else {
            console.log("enter2");
            console.log("setNewTweets", newTweets);
        }
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

    $("#clackText").keyup(function () {
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

    const handleClick = ({ key }) => {
        window.localStorage.setItem('search_type', key);
        if (key == 0) {
            console.log("User")
        }
        else if (key == 1) {
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
        const key = window.localStorage.getItem('search_type');
        try {
            if(key == 0){
                window.open(`http://localhost:8000/profiles/search_users/${value}`, '_self')
            }
            else if(key == 1){
                window.open(`http://localhost:8000/profiles/search_clacks/${value}`, '_self')
            }
            else {
                value = "!" + value;
                window.open(`http://localhost:8000/profiles/search_trends/${value}`, '_self')
            } 
            
        } catch (error) {
            console.log("error in search:", error);
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
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative mt-2 mb-2">
                    <div className="w-full lg:w-1/5">
                    </div>
                    <div className="w-full lg:w-2/5">
                    </div>
                    <div className="w-full lg:w-2/5 flex lg:my-0 lg:justify-end items-center mb-2">
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
                            onSearch={onSearch} style={{ width: 300, color: "#3b82f6" }}
                        />
                    </div>
                </div>
            </div>

                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <div className="w-full lg:w-1/5 pl-2 lg:pl-0 pr-2 mt-0 mb-4">
                        <div className="mb-2">
                            <span className="text-lg font-bold">User Bio</span>
                        </div>
                        <div className="mb-2"><i className="fa fa-id-badge fa-lg text-grey-darker mr-1"></i>Name: {newProfile ? newProfile.first_name + " " + newProfile.last_name : "User"}</div>
                        <div className="mb-2"><i className="fa fa-user fa-lg text-grey-darker mr-1"></i>Username: <a href= {"/profiles/my_wall/" + newUserName} className="text-grey-darker no-underline">{newProfile ? "@" + newProfile.username : "@username"}</a></div>
                        <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i>Email: {newProfile ? newProfile.email : "EmailID"}</div>
                        { (newProfile && newProfile.email2) ? <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i>Secondary Email: {newProfile.email2}</div> : <div></div>}
                        <div className="mb-2"><i className="fa fa-phone fa-lg text-grey-darker mr-1"></i>Contact Number: {newProfile ? newProfile.phone_number : ""}</div>
                        { (newProfile && newProfile.areaOfInterest) ? <div className="mb-2"><i className="fa fa-clipboard fa-lg text-grey-darker mr-1"></i>Area of Interest: {newProfile.areaOfInterest}</div> : <div></div>}
                        <div className="mb-2"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i>Joined: {newProfile ? cleanDate : "Joined: 1 Jan 2021 12AM"}</div>
                        <hr class="mt-3 mb-3"></hr>
                        <Col span={7} >
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href={"/profiles/my_wall/" + newUserName} style={{ textDecoration: "none" }}>My wall</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href={"/profiles/dashboard/" + newUserName} style={{ textDecoration: "none" }}>My Dashboard</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/profiles/trending_exclamation" style={{ textDecoration: "none" }}>Trending Exclamation</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/profiles/more_accounts" style={{ textDecoration: "none" }}>Who to Follow</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/" style={{ textDecoration: "none" }}>Clack Now</a>
                            </Button>
                        </Col>
                    </div>

                <div className="w-full lg:w-3/5 bg-white mb-20">
                    <div className="flex justify-between mb-1">
                        <div>
                            <span className="text-lg font-bold">&emsp;&emsp;My Wall</span>
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