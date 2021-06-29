import React, { useEffect, useState } from 'react'
import { Button,Col, Input } from 'antd';
import 'antd/dist/antd.css';
import { TweetCreate } from '../../tweets/create';
import { backendLookup } from '../../lookup/index';
import { TweetsList } from '../../tweets/list';
import './MyWall.css';
import NSAII_logo from '../../Assets/nsaii_logo.png';
import formatDate from './date';
import { apiTweetList } from '../../tweets/lookup';
import $ from 'jquery';

const { Search } = Input;

export default function MyWall(props) {
    const onSearch = value => console.log(value);

    const [newTweets, setNewTweets] = useState([]);
    let [newProfile, setNewProfile] = useState();
    let [newUserName, setUserName] = useState();
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
        // function call for getting current user profile
        getMainProfile(newUserName.username, handleNewProfile);
        // function call for getting total likes for current user
        getCurrentUserTotalLikes();
        // function call for getting total clacks for current user
        getCurrentUserTotalClacks();
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

    // $('#clackText').trigger(function () {
    //     var maxLength = $(this).val().length;
    //     if (maxLength < MAX_TWEET_LENGTH) {
    //         $("#error").text((''));
    //         return false;
    //     }
    // });

        return (
            <>  const 
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
                        <div className="w-full lg:w-1/5 flex lg:my-0 lg:justify-end items-center">
                            {/* search box */}
                            <Search
                                placeholder="input search text"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch} style={{ width: 400, color: "#3b82f6"}}
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
                    </div>

                    <div className="w-full lg:w-1/5 pl-0">
                        {/* profile new */}
                        <div class="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-yellow-500">
                            <img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
                            <div class="flex justify-center -mt-4">
                                {/* {% if gender == 'Male' %} */}
                                <img class="h-full" src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="80px" height= "80px"/>
                                {/* {% endif %}
                                {% if gender == 'Female' %}
                                <img class="h-full" src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="80px" height="80px"/>
                                {% endif %}
                                {% if gender == 'Decline to answer' %}
                                <img class="h-full" src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray01&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="80px" height="80px"/>
                                {% endif %} */}
                            </div>
                            <div class="text-center px-3 pb-2 pt-2">
                                {/* <h3 class="text-white text-sm bold font-sans">Username: {{username}}</h3>
                                {fn_pa}
                                <p class="mt-2 font-sans font-light text-white">First Name: {{fn_show}}</p> */}
                                {/* {ln_pa}
                                <p class="mt-2 font-sans font-light text-white">Last Name: {{ln_show}}</p> */}
                                {/* {gen_pa}
                                <p class="mt-2 font-sans font-light text-white">Gender: {{gen_show}}</p>
                                {dob_pa}
                                <p class="mt-2 font-sans font-light text-white">DOB: {{dob_show}}</p>
                                {pn_pa}
                                <p class="mt-2 font-sans font-light text-white">Contact: {{pn_show}}</p>
                                {em_pa}
                                <p class="mt-2 font-sans font-light text-white">Email: {{em_show}}</p> */}
                                {/* {em2_pa}
                                <p class="mt-2 font-sans font-light text-white">Secondary Email: {{em2_show}}</p> */}
                            </div>
                            <hr class="mt-2 mb-2"></hr>
                            {/* <div class="flex justify-center pb-1 text-white">
                                <div class="text-center mr-4 border-r pr-3">
                                    <h2>{{fans}}</h2>
                                    <span>Fans</span>
                                </div>
                                <div class="text-center">
                                    <h2>{{companions}}</h2>
                                    <span>Companions</span>
                                </div>
                            </div> */}
                            {/* <div class="tweetme-2-profile-badge" data-username={{username}} style="margin:2 auto;padding:2px 2px 2px 2px;"><br/></div>
                                <div id='tweetme-2' style="margin:20 auto;padding:2px 2px 2px 2px;" 
                                data-username={{username}} data-can-tweet="false"></div>
                            </div> */}
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>   
            </>
        )
    }