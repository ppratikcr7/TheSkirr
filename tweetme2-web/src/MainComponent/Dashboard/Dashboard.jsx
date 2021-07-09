import React, { useEffect, useState } from 'react'
import { Button, Col, Input } from 'antd';
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
    let [currentUserTotalLikes, setCurrentUserTotalLikes] = useState();
    let [currentUserTotalClacks, setCurrentUserTotalClacks] = useState();

    // const canTweet = props.canTweet === "false" ? false : true

    // const handleNewTweet = (newTweet) => {
    //     console.log("newTweet1:", newTweet);
    //     let tempNewTweets = [...newTweets]
    //     tempNewTweets.unshift(newTweet)
    //     console.log("tempNewTweets2:", tempNewTweets);
    //     setNewTweets(tempNewTweets)
    // }
    const handleNewUsername = (newUserName) => {
        setUserName(newUserName ? newUserName : "")
        console.log("newUserName", newUserName)
        getMainProfile(newUserName, handleNewProfile);
    }

    useEffect(() => {
        try {
            let endpoint1 = "/profiles/get_user/username/";
            backendLookup("GET", endpoint1, handleNewUsername)
        } catch (error) {
            console.log("error:", error);
        }
    }, [])

    useEffect(() => {
        getCurrentUserTotalLikes();
        getCurrentUserTotalClacks();
    })

    const handleNewProfile = (newProfile) => {
        setNewProfile(newProfile)
    }

    const handleCurrentUserTotalLikes = (currentUserTotalLikes) => {
        setCurrentUserTotalLikes(currentUserTotalLikes)
    }

    const handleCurrentUserTotalClacks = (currentUserTotalClacks) => {
        setCurrentUserTotalClacks(currentUserTotalClacks)
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
        console.log("username", username)
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
            // console.log("enter1");
            apiTweetList(null, handleListLookup);
        } else {
            getCurrentUserTotalLikes();
            getCurrentUserTotalClacks();
            // console.log("enter2");
            // console.log("setNewTweets", newTweets);
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
                        <div className="mb-2"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i>Joined: {newProfile ? cleanDate : "Joined: 1 Jan 2021 12AM"}</div>
                        <Col span={7} >
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href={"/profiles/my_wall/" + newUserName} style={{ textDecoration: "none" }}>My wall</a>
                            </Button>
                            <Button type={'primary'} style={{ width: 190, margin: 5 }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                                <a href="/" style={{ textDecoration: "none" }}>My Dashboard</a>
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
                            <span className="text-lg font-bold">&emsp;&emsp;My Dashboard</span>
                        </div>
                    </div>
                    <TweetsList newTweets={newTweets} tweetHandle={handleTweetList} {...props} />
                    {/* <TweetsList newTweets={newTweets} {...props} /> */}

                </div>

                <div className="w-full lg:w-1/5 pl-0">
                    {/* profile new */}
                    <div class="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-yellow-500">
                        <img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
                            <div class="flex justify-center -mt-2">
                                { ( newProfile && newProfile.photo ) ? 
                                    <div class="relative w-25 h-25">
                                        <img class="rounded-full border border-gray-100 shadow-sm h-100" src={`/media/${newProfile.photo}`} alt="user image" width="100px" height="100px"/>
                                        <div class="absolute top-0 right-0 h-3 w-3 my-1 mx-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                                    </div>
                                    : 
                                    <div class="relative w-25 h-25">
                                        <img class="rounded-full border border-gray-100 shadow-sm h-100" src={`/media/images/default.jpg`} alt="user image" width="100px" height="100px"/>
                                        <div class="absolute top-0 right-0 h-3 w-3 my-1 mx-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                                    </div>
                                }    
                            </div>
                            <div class="text-center px-3 pb-2 pt-2">
                                <h3 class="text-white text-sm bold font-sans">Username: {newUserName}</h3>
                                { (newProfile && newProfile.first_name_public_access) ?
                                    <div>
                                        <p class="mt-1 font-sans font-light text-white">First Name: {newProfile && newProfile.first_name}</p>
                                    </div>
                                    :
                                    <div></div>
                                }
                                {/* { newProfile.ln_pa } */}
                                {/* <p class="mt-1 font-sans font-light text-white">Last Name: {{newProfile.last_name}}</p> */}
                                
                                { (newProfile && newProfile.gender_public_access) ?
                                    <div>
                                        <p class="mt-1 font-sans font-light text-white">Gender: {newProfile && newProfile.gender}</p>
                                    </div>
                                    :
                                    <div></div>
                                }

                                { (newProfile && newProfile.dob_public_access) ?
                                    <div>
                                        <p class="mt-1 font-sans font-light text-white">DOB: {newProfile && newProfile.dob}</p>
                                    </div>
                                    :
                                    <div></div>
                                }

                                { (newProfile && newProfile.phone_number_public_access) ?
                                    <div>
                                        <p class="mt-1 font-sans font-light text-white">Contact: {newProfile && newProfile.phone_number}</p>
                                    </div>
                                    :
                                    <div></div>
                                }

                                { (newProfile && newProfile.email_public_access) ?
                                    <div>
                                        <p class="mt-1 font-sans font-light text-white">Email: {newProfile && newProfile.email}</p>
                                    </div>
                                    :
                                    <div></div>
                                }

                                {/* { newProfile.em2_pa }
                                <p class="mt-2 font-sans font-light text-white">Secondary Email: {{newProfile.email2}}</p> */}
                            </div>
                            <hr class="mt-1 mb-1"></hr>
                            <div class="flex justify-center pb-1 text-white">
                                <div class="text-center mr-4 border-r pr-3">
                                    <h2>{newProfile && newProfile.follower_count}</h2>
                                    <span>Fans</span>
                                </div>
                                <div class="text-center">
                                    <h2>{newProfile && newProfile.following_count}</h2>
                                    <span>Companions</span>
                                </div>
                            </div>
                            { (newUserName) ?
                                <div>
                                    <div class="tweetme-2-profile-badge" data-username={newUserName} style={{ margin:"2px", padding: "2px"}}><br/></div>
                                    <div id='tweetme-2' style={{ margin:"2px", padding: "2px"}} data-username={newUserName} data-can-tweet="false"></div>
                                </div>
                                :
                                <div></div>
                            }
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </>
    )
}