import React, { useEffect, useState } from 'react'
import { Button, Col, Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { backendLookup } from '../../lookup/index';
import './Trends.css';
import NSAII_logo from '../../Assets/nsaii_logo.png';
import {
    UserWhoToFollowDisplay
} from '../../profiles'
import { TweetCreate } from '../../tweets/create';
import {apiProfileDetail, apiProfileFollowToggle} from '../../profiles/lookup'
import ReactDOM from 'react-dom';
import news1 from "../../Assets/news1.png";
import news2 from "../../Assets/news2.png";
import news3 from "../../Assets/news3.png";
import $ from 'jquery';

function ProfileBadge(props) {
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div style={{ paddingTop: 0, paddingBottom: 4, paddingRight: 20, paddingLeft: 100,  margin: 5 }}>
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
    </div> : null
}

export function ProfileBadgeComponent (props) {
    const {username} = props;
    console.log("follow button username: ", username)
    // lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response, status) => {
    if (status === 200) {
        setProfile(response)
    }
    }
    useEffect(()=>{
        if (didLookup === false){
        apiProfileDetail(username, handleBackendLookup)
        setDidLookup(true)
    }
    }, [username, didLookup, setDidLookup])

    const handleNewFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status)=>{
            // console.log(response, status)
            if (status===200) {
                setProfile(response)
                // apiProfileDetail(username, handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
        
    }
    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : null
}

// Search feature
const { Search } = Input;

export default function Trends(props) {
    let {username, trendlist} = props;
    console.log("trendlist:", trendlist);
    trendlist = trendlist.replace(/'/g, '"')
    const trends = JSON.parse(trendlist)
    console.log("trendlist:", trends);
    let newUserName = username;
    let [currentUserName, setCurrentUserName] = useState();
    let [newProfile, setNewProfile] = useState();
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
    
    useEffect(() => {
        try {
            let endpoint1 = "/profiles/get_user/username/";
            backendLookup("GET", endpoint1, handleCurrentUsername)
        } catch (error) {
            console.log("error:", error);
        }
        try {
            let endpoint = `/profiles/user/${newUserName}/`;
            backendLookup("GET", endpoint, handleNewProfile)
        } catch (error) {
            console.log("error:", error);
        }
        //get random 3 users to follow:
        getWhoToFollowUser1();
        getWhoToFollowUser2();
        getWhoToFollowUser3();
    }, [])

    useEffect(() => {
    })

    const handleCurrentUsername = (currentUserName) => {
        setCurrentUserName(currentUserName ? currentUserName : "")
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

    const MAX_TWEET_LENGTH = 200;

    function myfunction2(thisObj2){
        $("#info2").text((thisObj2.val().length) + " / " + MAX_TWEET_LENGTH)
    }

    function myfunction2a(thisObj2a){
        var charLength = thisObj2a.val().length;
        if (charLength >= MAX_TWEET_LENGTH) {
            $("#error2").text(('Use less than ' + MAX_TWEET_LENGTH + ' characters'));
            return false;
        }
        var textareaLength = document.getElementById("smallclackText").length;
        if (textareaLength < MAX_TWEET_LENGTH) {
            $("#error2").text((''));
            return false;
        }
    }
    
    $("#smallclackText").keyup(function () {
        myfunction2($(this));
    });

    $('#smallclackText').keypress(function () {
        myfunction2a($(this));
    });

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
    // let uname = [];
    // { (usernamelist) ? (uname = usernamelist.map((username) =>
    // <li className="p-4 hover:bg-gray-50 cursor-pointer"><a href='/profiles/dashboard/{{username}}'>{username}</a></li>)) : uname=[]}

    return (
        
        <>
            <div className="bg-white shadow">
                {/* style={{ marginTop: 104 }} */}
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="w-full lg:w-1/5">

                    </div>
                    <div className="w-full lg:w-2/5">
                        
                    </div>
                    <div className="w-full lg:w-2/5 flex lg:my-0 lg:justify-end items-center mt-1 mb-2">
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
                            onSearch={onSearch} style={{ width: 300, color: "#3b83f6" }}
                        />
                    </div>
                </div>
            </div>

            {/* LEFT SECTION for page navigation: */}
            <div className="container mx-auto flex lg:flex-row mt-3 text-sm leading-normal">
                <div className="w-full lg:w-1/6 pl-2 lg:pl-0 pr-2 -mt-2 mb-4">
                    <Col span={7} >
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href={"/profiles/my_wall/" + currentUserName} style={{ textDecoration: "none" }}>My wall</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 180, height: 35, margin: 3}} shape="round" size='sm' block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href={"/profiles/dashboard/" + currentUserName} style={{ textDecoration: "none" }}>My Dashboard</a>
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
                <div style={{ position:"fixed", top: 475}}>
                    <span className="mb-2 pl-2"><i className="text-2xl font-bold fa fa-lg text-grey-darker mr-1"></i><a href= {"/profiles/dashboard/" + newUserName} className="text-grey-darker no-underline">{newProfile ? "@" + newProfile.username : "@username"}</a></span>
                    <div className="p-1 text-lg font-bold">
                        {canTweet === true && <TweetCreate didTweet={handleNewTweet} clackTextId='smallclackText' className='col-12 mb-3' />}
                    </div>
                </div>
            
                {/* CENTRAL AREA FOR EACH PAGE: */}
                <div className="w-full lg:w-6/7 bg-white mb-20">
                    {/* <div className="flex justify-center mb-1">
                        <span className="text-lg font-bold">Who To Follow:</span>
                        <hr className="mt-2 mb-2"></hr>
                    </div> */}
                    <div class="flex justify-center h-full bg-gray-100" style={{ width: 850}}>
                        <div class="container">
                            <div class="flex justify-center p-1 mb-2">
                                <h1 class="text-xl text-blue-500">Trending Exclamations to follow: </h1>
                            </div>
                            <div class="flex justify-center">
                                <div class="bg-white shadow-xl rounded-lg w-1/2">
                                    <ul class="divide-y divide-gray-300">
                                    {(trends) ? trends.map(function(trend, index){
                                            return <li key={index} className="p-4 hover:bg-gray-50 cursor-pointer"><a href=''>{trend.topic}</a></li>;
                                        }) : ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* RIGHT SECTION with who to follow, trends, news: */}

                <div className="w-full lg:w-1/6 pl-0">
                    <div className="bg-white p-3 mb-3">
                        <div>
                            <span className="text-lg font-bold p-2">Trending Exclamations:</span>
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
                        {/* new section */}
                        <div>
                            <span className="text-lg font-bold p-2">News</span>
                            <hr className="mt-2 mb-1"></hr>
                        </div>
                        <div className="p-3">
                            {/* <p>News article 1</p> */}
                            <img src={news1} alt="" width="100%" height="70%" />
                        </div>
                        <div className="p-3">
                        {/* <p>News article 2</p> */}
                        <img src={news2} alt="" width="100%" height="70%" />
                        </div>
                        <div className="p-3">
                        {/* <p>News article 3</p> */}
                        <img src={news3} alt="" width="100%" height="70%" />
                        </div>
                        <hr className="mt-2 mb-2"></hr>
                        {/* <div className="flex justify-between mb-1">
                            <div>
                                <a href="" className="font-bold text-black">Show more news</a>
                            </div>
                        </div> */}
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}

const userProfileBadgeElements = document.querySelectorAll(".tweetme-2-profile-badge")
console.log("userProfileBadgeElements: ", userProfileBadgeElements)

const e = React.createElement;
userProfileBadgeElements.forEach(container => {
    console.log("container: ", container)
    ReactDOM.render(
        e(ProfileBadgeComponent, container.dataset),
        container);
})