import React, { useEffect, useState } from 'react'
import { Layout, Button, Row, Col, Card, Avatar, Typography, Space } from 'antd';
import 'antd/dist/antd.css';
import { TweetCreate } from '../../tweets/create';
import { backendLookup } from '../../lookup/index';
import { TweetsList } from '../../tweets/list';
import './Dashboard.css';
import NSAII_logo from '../../Assets/nsaii_logo.png';
import formatDate from './date';
import { apiTweetList } from '../../tweets/lookup';

export default function Dashboard(props) {
    const [newTweets, setNewTweets] = useState([]);
    let [newProfile, setNewProfile] = useState();
    let [newUserName, setUserName] = useState();
    // const { Content, Footer } = Layout;
    const { Meta } = Card;
    const navOption = {
        Home: "Home",
        Moments: "Moments",
        Notifications: "Notifications",
        Messages: "Messages"
    }
    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
    const handleNewUsername = (newUserName) => {
        console.log("new user:", newUserName)
        let tempNewUser = newUserName
        console.log("new user:", tempNewUser.username)
        setUserName(tempNewUser ? tempNewUser.username : "")
        getProfile(tempNewUser.username);
    }

    function getProfile(username) {
        try {
            let endpoint = `/profiles/user/${username}/`;
            backendLookup("GET", endpoint, handleNewProfile)
        } catch (error) {
            console.log("error:", error);
        }
    }

    const handleNewProfile = (newProfile) => {
        console.log("new profile:", newProfile)
        let tempNewProfile = newProfile
        // tempNewProfile.unshift(newProfile)
        setNewProfile(tempNewProfile)
    }

    // join date update:
    if (newProfile && newProfile.date_joined) {
        var date = newProfile.date_joined;
        var cleanDate = formatDate(date)
    }
    else {
        var cleanDate = "1 Jan 2021, 12AM";
    }

    // useEffect(() => {
    //     try {
    //         let endpoint = "/profiles/chinu123";
    //         backendLookup("GET", endpoint, handleNewProfile)
    //     } catch (error) {
    //         console.log("error:", error);
    //     }
    // }, [])
    const handleListLookup = (response, status) => {
        if (status === 200) {
            setNewTweets(response.results)
        } else {
            alert("There was an error")
        }
    }

    function handleTweetList(value) {
        console.log("sucees call", value);
        apiTweetList(null, handleListLookup);
        // window.location.reload();
    }

    useEffect(() => {
        try {
            let endpoint1 = "/profiles/get_username/";
            backendLookup("GET", endpoint1, handleNewUsername)
            console.log("profilename:", newUserName);
        } catch (error) {
            console.log("error:", error);
        }
    }, [])

    return (
        <>
            <div className="bg-white shadow">
                {/* style={{ marginTop: 104 }} */}
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="w-full lg:w-1/5">
                    </div>
                    <div className="w-full lg:w-3/5">
                        <ul className="list-reset flex">
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Clacks</div>
                                    <div className="text-lg tracking-tight font-bold text-teal">1</div>
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
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Moments       </div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/5 flex lg:my-0 lg:justify-end items-center">
                        <svg version="1.1" className="h-4 text-dark" x="0px" y="0px" viewBox="0 0 52.966 52.966" >
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
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                {/* <div className="w-full lg:w-1/5 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                    <h1><a href="#" className="text-black font-bold no-underline hover:underline">Pratik Prajapati</a></h1>
                    <div className="mb-4"><a href="#" className="text-grey-darker no-underline hover:underline">@gp33</a></div>

                    <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">ppratik.cr7@gmail.com</a></div>
                    <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">Joined {cleanDate}</a></div> */}
                <div className="w-full lg:w-1/5 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                    <h1><a href="#" className="text-black font-bold no-underline hover:underline">{newProfile ? newProfile.first_name + " " + newProfile.last_name : "Name"}</a></h1>
                    <div className="mb-4"><a href="#" className="text-grey-darker no-underline hover:underline">{newProfile ? newProfile.username : "@username"}</a></div>

                    {/* <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">{newProfile ? newProfile.email : "email@gmail.com"}</a></div> */}
                    <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">{newProfile ? newProfile.email : ""}</a></div>
                    <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">{newProfile ? cleanDate : "Joined 25 May 2021"}</a></div>

                    {/* <div className="mb-4">
                        <button href="/profiles?username=gp33" className="bg-blue-500 hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">My Wall</button>
                    </div>
                    <div className="mb-4">
                        <button href="" className="bg-blue-500 hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">My Dashboard</button>
                    </div>
                    <div className="mb-4">
                        <button href="" className="bg-blue-500 hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Trending Exclamations!</button>
                    </div>
                    <div className="mb-4">
                        <button href="" className="bg-blue-500 hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Messages</button>
                    </div>
                    <div className="mb-4">
                        <button href="" className="bg-blue-500 hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Who to Follow</button>
                    </div>
                    <div className="mb-4">
                        <button href="" className="bg-blue-500 hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Clack Now</button>
                    </div> */}
                    <Col span={7} >
                        <Button type={'primary'} style={{ width: 230, margin: 5 }} onClick={() => { this.props.history.push(`/profiles?username=${newUserName}`) }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href={"/profiles/" + newUserName} style={{ textDecoration: "none" }}>My wall</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 230, margin: 5 }} onClick={() => { this.props.history.push("/dashboard") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/dashboard" style={{ textDecoration: "none" }}>My Dashboard</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 230, margin: 5 }} onClick={() => { this.props.history.push("/dashboard") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/dashboard" style={{ textDecoration: "none" }}>Trending Exclamations!</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 230, margin: 5 }} onClick={() => { this.props.history.push("/dashboard") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/dashboard" style={{ textDecoration: "none" }}>Who to Follow</a>
                        </Button>
                        <Button type={'primary'} style={{ width: 230, margin: 5 }} onClick={() => { this.props.history.push("/dashboard") }} shape="round" size={'large'} block htmlType="submit" className="bg-blue-500 login-form-button button-container">
                            <a href="/dashboard" style={{ textDecoration: "none" }}>Clack Now</a>
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
                </div>

                <div className="w-full lg:w-1/5 pl-4">
                    <div className="bg-white p-3 mb-3">
                        <div>
                            <span className="text-lg font-bold">Who to follow</span>
                        </div>

                        <div className="flex border-b border-solid border-grey-light">
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
                        </div>
                        <div className="flex justify-between mb-1">
                            <div>
                                <a href="#" className="font-bold text-black">Show more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}