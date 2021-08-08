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

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {apiProfileDetail, apiProfileFollowToggle} from '../../profiles/lookup'
import ReactDOM from 'react-dom';
function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && (
        <Box p={3}>
        <Typography>{children}</Typography>
        </Box>
    )}
    </div>
);
}

TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

const useStyles = makeStyles((theme) => ({
root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
},
}));


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

export default function Dashboard(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {username} = props;
    let newUserName = username;
    let [currentUserName, setCurrentUserName] = useState();
    let [newProfile, setNewProfile] = useState();
    // let [newUserName, setUserName] = useState();
    let [currentUserTotalLikes, setCurrentUserTotalLikes] = useState();
    let [currentUserTotalClacks, setCurrentUserTotalClacks] = useState();
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
        getCurrentUserTotalLikes();
        getCurrentUserTotalClacks();
    })

    const handleCurrentUsername = (currentUserName) => {
        setCurrentUserName(currentUserName ? currentUserName : "")
    }

    const handleNewProfile = (newProfile) => {
        setNewProfile(newProfile)
    }

    const handleCurrentUserTotalLikes = (currentUserTotalLikes) => {
        setCurrentUserTotalLikes(currentUserTotalLikes)
    }

    const handleCurrentUserTotalClacks = (currentUserTotalClacks) => {
        setCurrentUserTotalClacks(currentUserTotalClacks)
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

    // function getMainProfile(username) {
    //     try {
    //         let endpoint = `/profiles/user/${username}/`;
    //         backendLookup("GET", endpoint, handleNewProfile)
    //     } catch (error) {
    //         console.log("error:", error);
    //     }
    // }

    // join date update:
    if (newProfile && newProfile.date_joined) {
        var date = newProfile.date_joined;
        var cleanDate = formatDate(date)
    }
    else {
        var cleanDate = "1 Jan 2021";
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
            $("#error2").text(('You cannot enter more than ' + MAX_TWEET_LENGTH + ' characters'));
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

    return (
            <>  
            <div className="bg-white shadow">
                {/* style={{ marginTop: 104 }} */}
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="w-full lg:w-1/5">
                    </div>
                    <div className="w-full lg:w-2/5">
                        <ul className="list-reset flex">
                            <li className="text-center px-4 border-b-2 border-solid border-transparent border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Clacks</div>
                                    <div className="text-lg tracking-tight font-bold text-teal">{currentUserTotalClacks ? currentUserTotalClacks : "0"}</div>
                                </a>
                            </li>
                            <li className="text-center px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Fans</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">{newProfile ? newProfile.follower_count : "0"}</div>
                                </a>
                            </li>
                            <li className="text-center px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Companion</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">{newProfile ? newProfile.following_count : "0"}</div>
                                </a>
                            </li>
                            <li className="text-center px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Likes</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">{currentUserTotalLikes ? currentUserTotalLikes : "0"}</div>
                                </a>
                            </li>
                            <li className="text-center px-4 border-b-2 border-solid border-transparent hover:border-teal">
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
                            onSearch={onSearch} style={{ width: 300, color: "#3b83f6" }}
                        />
                    </div>
                </div>
            </div>

                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
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
                        <span className="text-lg font-bold">My Dashboard</span>
                        <hr className="mt-2 mb-2"></hr>
                    </div>
                    <div className="flex justify-between mb-1">
                        <div class="bg-gray-100">
                            <div class="w-full text-white bg-main-color">
                                <div class="container mx-auto my-2 p-2">
                                    <div class="md:flex no-wrap md:-mx-2 ">
                                        {/* Left Side */}
                                        <div class="w-full md:w-2/12 md:mx-2">
                                            {/* Profile Card */}
                                            <div class="bg-white p-2 border-t-4 border-green-400">
                                                <div class="image overflow-hidden">
                                                <span className="flex justify-center mt-2">
                                                    { ( newProfile && newProfile.photo_url ) ? 
                                                        <span className="relative w-18 h-18">
                                                            <img className="rounded-full border border-gray-100 shadow-sm h-100" src={`${newProfile.photo_url}`} alt="user image" width="60px" height="60px"/>
                                                            <div className="absolute top-0 right-0 h-3 w-3 my-1 mx-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                                                        </span>
                                                        : 
                                                        <span className="relative w-18 h-18">
                                                            <img className="rounded-full border border-gray-100 shadow-sm h-100" src={`/media/images/default.jpg`} alt="user image" width="60px" height="60px"/>
                                                            <div className="absolute top-0 right-0 h-3 w-3 my-1 mx-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                                                        </span>
                                                    }    
                                                </span>
                                                </div>
                                                <h1 class="flex justify-center text-gray-900 font-bold text-l leading-8 my-1"><a href= {"/profiles/my_wall/" + newUserName} className="text-grey-darker no-underline">{newProfile ? "@" + newProfile.username : "@username"}</a></h1>
                                                {/* <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3> */}
                                                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                                { (newProfile && newProfile.areaOfInterest) ? <div className="mb-2">Area of Interest: {newProfile.areaOfInterest}</div> : <div></div>}
                                                </p>
                                                <ul
                                                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-0 mt-1 divide-y rounded shadow-sm">
                                                    {/* <li class="flex items-center py-3">
                                                        <span>Status</span>
                                                        <span class="ml-auto"><span
                                                                class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                                    </li> */}
                                                    <li class="flex items-center py-3">
                                                        <span>Joined:</span>
                                                        <span class="ml-auto text-xs">{newProfile ? cleanDate : "Joined: 1 Jan 2021 12AM"}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* End of profile card */}
                                        </div>
                                        {/* Right Side */}
                                        <div class="w-full md:w-10/12 mx-2 h-64">
                                            {/* Profile tab */}
                                            {/* About Section */}
                                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                                    <span clas="text-green-500">
                                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </span>
                                                    <span class="tracking-wide">About</span>
                                                </div>
                                                <div class="text-gray-700">
                                                    <div className="grid md:grid-cols-2 text-xs">
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">First Name</div>
                                                            <div class="px-2 py-2">{newProfile ? newProfile.first_name : "-"}</div>
                                                        </div>
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">Last Name</div>
                                                            <div class="px-2 py-2">{newProfile ? newProfile.last_name : "-"}</div>
                                                        </div>
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">Gender</div>
                                                            <div class="px-2 py-2">{newProfile ? newProfile.gender : "-"}</div>
                                                        </div>
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">Contact No.</div>
                                                            <div class="px-2 py-2">{newProfile ? newProfile.phone_number : "-"}</div>
                                                        </div>
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">Email</div>
                                                            <div class="px-2 py-2">
                                                                {/* <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a> */}
                                                                {newProfile ? newProfile.email : "-"}
                                                            </div>
                                                        </div>
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">Birthday</div>
                                                            <div class="px-2 py-2">{newProfile ? newProfile.dob : "-"}</div>
                                                        </div>
                                                        <div class="grid grid-cols-2">
                                                            <div class="px-2 py-2 font-semibold">Sec.Email</div>
                                                            <div class="px-2 py-2">
                                                                {/* <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a> */}
                                                                {newProfile ? newProfile.email2 : "-"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End of about section  */}
                                            <button className="btn btn-primary  my-3 mr-3"><a href="/profile/edit" style={{ "text-decoration" : "none"}}>Edit Profile</a></button>
                                            <button className='btn btn-primary my-3 mr-3'><a href="/profiles/report_adverse_effect_form" style={{ "text-decoration" : "none"}}>Report Adverse Effect</a></button>
                                            <hr class="mt-1 mb-1"></hr>
                                            </div>
                                            {/* End of profile tab */}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <br />
                    <div className={classes.root}>
                        <AppBar position="static" style={{ background: '#007bff', margin: 0}}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                            <Tab label="Clacks" {...a11yProps(0)} />
                            <Tab label="Replies" {...a11yProps(1)} disabled/>
                            <Tab label="Reclacks" {...a11yProps(2)} />
                            <Tab label="Likes" {...a11yProps(3)} disabled/>
                        </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                        <TweetsList newTweets={newTweets} tweetHandle={handleTweetList} {...props} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                        No Replies
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                        No Reclacks
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                        No Liked Clacks
                        </TabPanel>
                    </div>
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