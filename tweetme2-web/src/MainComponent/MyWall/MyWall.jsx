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
    // const {username} = props;
    // let newUserName = username;
    let [newProfile, setNewProfile] = useState();
    let [newUserName, setUserName] = useState();
    let [whoToFollowUser1, setwhoToFollowUser1] = useState();
    let [whoToFollowUser2, setwhoToFollowUser2] = useState();
    let [whoToFollowUser3, setwhoToFollowUser3] = useState();

    const [newTweets, setNewTweets] = useState([]);
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

    function myfunction1(thisObj1){
        $("#info1").text((thisObj1.val().length) + " / " + MAX_TWEET_LENGTH)
    }

    function myfunction1a(thisObj1a){
        var charLength = thisObj1a.val().length;
        if (charLength >= MAX_TWEET_LENGTH) {
            $("#error1").text(('You cannot enter more than ' + MAX_TWEET_LENGTH + ' characters'));
            return false;
        }
        var textareaLength = document.getElementById("clackText").length;
        if (textareaLength < MAX_TWEET_LENGTH) {
            $("#error1").text((''));
            return false;
        }
    }
      
    function myfunction2(thisObj2){
        $("#info2").text((thisObj2.val().length) + " / " + MAX_TWEET_LENGTH)
    }

    function myfunction2a(thisObj2a){
        var charLength = thisObj2a.val().length;
        if (charLength >= MAX_TWEET_LENGTH) {
            $("#error2").text(('You cannot enter more than ' + MAX_TWEET_LENGTH + ' characters'));
            return false;
        }
        var textareaLength = document.getElementById("smallclackText").length;
        if (textareaLength < MAX_TWEET_LENGTH) {
            $("#error2").text((''));
            return false;
        }
    }

    $("#clackText").keyup(function () {
        myfunction1($(this));
    });

    $('#clackText').keypress(function () {
        myfunction1a($(this));
    });

    $("#smallclackText").keyup(function () {
        myfunction2($(this));
    });

    $('#smallclackText').keypress(function () {
        myfunction2a($(this));
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
            // let domain = "https://www.theskirr.com/";
            let domain = "http://localhost:8000/";

            if(key == 0){
                window.open(`${domain}profiles/search_users/${value}`, '_self')
            }
            else if(key == 1){
                window.open(`${domain}profiles/search_clacks/${value}`, '_self')
            }
            else {
                value = "!" + value;
                window.open(`${domain}profiles/search_trends/${value}`, '_self')
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

                <div className="container mx-auto flex justify-left flex-col lg:flex-row mt-3 text-sm leading-normal">
                <div className="w-full lg:w-1/6 pl-2 lg:pl-0 pr-2 -mt-2 mb-4">
                    <Col span={7} >
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href={"/profiles/my_wall/" + newUserName} style={{ textDecoration: "none" }}>My wall</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href={"/profiles/dashboard/" + newUserName} style={{ textDecoration: "none" }}>My Dashboard</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/profiles/trending_exclamation" style={{ textDecoration: "none" }}>Trending Exclamation</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/profiles/more_accounts" style={{ textDecoration: "none" }}>Who to Follow</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="#" style={{ textDecoration: "none" }}>Skirr</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="#" style={{ textDecoration: "none" }}>Messages</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="#" style={{ textDecoration: "none" }}>Notification</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/" style={{ textDecoration: "none" }}>Clack Now</a>
                        </Button>
                    </Col>
                    <hr className="mt-2 mb-2"></hr>
                </div>
                <div style={{ position:"fixed", top: 480}}>
                    <span className="mb-2 pl-2"><i className="text-2xl font-bold fa fa-lg text-grey-darker mr-1"></i><a href= {"/profiles/dashboard/" + newUserName} className="text-grey-darker no-underline">{newProfile ? "@" + newProfile.username : "@username"}</a></span>
                    <div className="p-1 text-lg font-bold">
                        {canTweet === true && <TweetCreate didTweet={handleNewTweet} clackTextId='smallclackText' className='col-9 mb-3' />}
                    </div>
                </div>

                <div className="w-full lg:w-6/7 bg-white mb-20">
                    <div className="flex justify-center mb-1">
                        <div>
                            <span className="text-lg font-bold">My Wall</span>  
                        </div>
                        <hr className="mt-2 mb-2"></hr>
                    </div>
                    <br />
                    <span className="mb-2 pl-4"><i className="text-2xl font-bold fa fa-lg text-grey-darker mr-1"></i><a href= {"/profiles/dashboard/" + newUserName} className="text-grey-darker no-underline">{newProfile ? "@" + newProfile.username : "@username"}</a></span>
                    <div className="p-2 text-lg font-bold">
                        {canTweet === true && <TweetCreate didTweet={handleNewTweet} clackTextId='clackText' className='col-12 mb-3' />}
                    </div>
                    <TweetsList newTweets={newTweets} tweetHandle={handleTweetList} {...props} />
                    {/* <TweetsList newTweets={newTweets} {...props} /> */}

                </div>

                <div className="w-full lg:w-1/6 pl-0">
                    <div className="bg-white p-3 mb-3">
                        <div>
                            <span className="text-lg font-bold p-2">Who to follow</span>
                            <hr className="mt-2 mb-2"></hr>
                        </div>
                        <div className="p-3">

                            {(whoToFollowUser1) ? <UserWhoToFollowDisplay includeFullName user={whoToFollowUser1} /> : <div></div>}
                            {/* use the below for color encoding */}
                            {/* <span class="text-grey-dark">&middot;</span> */}
                        </div>
                        <div className="p-3">
                            {(whoToFollowUser2) ? <UserWhoToFollowDisplay includeFullName user={whoToFollowUser2} /> : <div></div>}
                            {/* use the below for color encoding */}
                            {/* <span class="text-grey-dark">&middot;</span> */}
                        </div>
                        <div className="p-3">
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
                        <br />
                        <br />
                        <br />
                        {/* new section */}
                        <div>
                            <span className="text-lg font-bold p-2">News</span>
                            <hr className="mt-2 mb-2"></hr>
                        </div>
                        <div className="p-3">
                            <p>News article 1</p>
                        </div>
                        <div className="p-3">
                        <p>News article 2</p>
                        </div>
                        <div className="p-3">
                        <p>News article 3</p>
                        </div>
                        <hr className="mt-2 mb-2"></hr>
                        {/* <div className="flex justify-between mb-1">
                            <div>
                                <a href="" className="font-bold text-black">Show more news</a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}