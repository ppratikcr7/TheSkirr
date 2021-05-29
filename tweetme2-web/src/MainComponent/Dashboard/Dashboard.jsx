import React, { useEffect, useState } from 'react'
import { Layout, Button, Row, Col, Card, Avatar, Typography, Space } from 'antd';
import 'antd/dist/antd.css';
import { TweetCreate } from '../../tweets/create';
// import { Tweet } from './detail'
// import { apiTweetDetail } from './lookup'
// import { FeedList } from './feed'
import { TweetsList } from '../../tweets/list';
import Footer from '../../Common/footer';
import './Dashboard.css';

export default function Dashboard(props) {
    const [newTweets, setNewTweets] = useState([
        {
            id: 1,
            content: "My first tweet",
            user: {
                first_name: "Gagan",
                last_name: "Parmar",
                username: "shanu123"
            }
        }
    ])
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
    return (
        <>
            <div className="bg-white shadow">
                {/* style={{ marginTop: 104 }} */}
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="w-full lg:w-1/4">
                    </div>
                    <div className="w-full lg:w-1/2">
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
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Companion</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">0</div>
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
                                    <div className="text-sm font-bold tracking-tight mb-1">Moments</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                        <div className="mr-6">
                            <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">Following</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                    <h1><a href="#" className="text-black font-bold no-underline hover:underline">First name</a></h1>
                    <div className="mb-4"><a href="#" className="text-grey-darker no-underline hover:underline">@username</a></div>

                    <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">email@gmail.com</a></div>
                    <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i><a href="#" className="text-teal no-underline hover:underline">Joined 25 May 2021</a></div>

                    <div className="mb-4">
                        <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Tweet to Tailwind CSS</button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-white mb-4">
                    <div className="flex justify-between mb-1">
                        <div>
                            <span className="text-lg font-bold">&emsp;&emsp;Home</span>
                        </div>
                    </div>
                    <div className="p-3 text-lg font-bold border-b border-solid border-grey-light">
                        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
                    </div>
                    <TweetsList newTweets={newTweets} {...props} />
                </div>

                <div className="w-full lg:w-1/4 pl-4">
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
                                        <a href="#" className="font-bold text-black">Pratik</a> <a href="#" className="text-grey-dark">@ppratikcr7</a>
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
            <Footer />
        </>
    )
}