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
    const [newTweets, setNewTweets] = useState([{
        id: 1,
        content: "My first tweet",
        user: {
            first_name: "Gagan",
            last_name: "Parmar",
            username: "shanu123"
        }
    }])
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
            <div class="bg-white shadow">
                {/* style={{ marginTop: 104 }} */}
                <div class="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div class="w-full lg:w-1/4">
                    </div>
                    <div class="w-full lg:w-1/2">
                        <ul class="list-reset flex">
                            <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                    <div class="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                    <div class="text-lg tracking-tight font-bold text-teal">1</div>
                                </a>
                            </li>
                            <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                    <div class="text-sm font-bold tracking-tight mb-1">Following</div>
                                    <div class="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                            <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                    <div class="text-sm font-bold tracking-tight mb-1">Followers</div>
                                    <div class="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                            <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                    <div class="text-sm font-bold tracking-tight mb-1">Likes</div>
                                    <div class="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                            <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                    <div class="text-sm font-bold tracking-tight mb-1">Moments</div>
                                    <div class="text-lg tracking-tight font-bold hover:text-teal">0</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                        <div class="mr-6">
                            <button class="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">Following</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                <div class="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                    <h1><a href="#" class="text-black font-bold no-underline hover:underline">Gagan Parmar</a></h1>
                    <div class="mb-4"><a href="#" class="text-grey-darker no-underline hover:underline">@gagan123</a></div>

                    <div class="mb-2"><i class="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#" class="text-teal no-underline hover:underline">my-blog.com</a></div>
                    <div class="mb-4"><i class="fa fa-calendar fa-lg text-grey-darker mr-1"></i><a href="#" class="text-teal no-underline hover:underline">Joined May 2021</a></div>

                    <div class="mb-4">
                        <button class="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Tweet to Tailwind CSS</button>
                    </div>
                </div>

                <div class="w-full lg:w-1/2 bg-white mb-4">

                    <div class="p-3 text-lg font-bold border-b border-solid border-grey-light">
                        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
                    </div>
                    <TweetsList newTweets={newTweets} {...props} />
                </div>

                <div class="w-full lg:w-1/4 pl-4">
                    <div class="bg-white p-3 mb-3">
                        <div>
                            <span class="text-lg font-bold">Who to follow</span>
                        </div>

                        <div class="flex border-b border-solid border-grey-light">
                            <div class="py-2">
                                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow1.jpg" alt="follow1" class="rounded-full h-12 w-12" /></a>
                            </div>
                            <div class="pl-2 py-2 w-full">
                                <div class="flex justify-between mb-1">
                                    <div>
                                        <a href="#" class="font-bold text-black">Nuxt.js</a> <a href="#" class="text-grey-dark">@nuxt_js</a>
                                    </div>
                                </div>
                                <div>
                                    <button class="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                        Follow
                        </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex border-b border-solid border-grey-light">
                            <div class="py-2">
                                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow2.jpg" alt="follow1" class="rounded-full h-12 w-12" /></a>
                            </div>
                            <div class="pl-2 py-2 w-full">
                                <div class="flex justify-between mb-1">
                                    <div>
                                        <a href="#" class="font-bold text-black">Laracon EU</a> <a href="#" class="text-grey-dark">@LaraconEU</a>
                                    </div>
                                </div>
                                <div>
                                    <button class="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                        Follow
                            </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex border-b border-solid border-grey-light">
                            <div class="py-2">
                                <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow3.jpg" alt="follow1" class="rounded-full h-12 w-12" /></a>
                            </div>
                            <div class="pl-2 py-2 w-full">
                                <div class="flex justify-between mb-1">
                                    <div>
                                        <a href="#" class="font-bold text-black">Laracon US</a> <a href="#" class="text-grey-dark">@LaraconUS</a>
                                    </div>
                                </div>
                                <div>
                                    <button class="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                        Follow
                            </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {/* <Footer style={{ textAlign: 'center' }}>
                <Space size={3}>
                    <Button type="link">About</Button>
                    <Button type="link">Help Center</Button>
                    <Button type="link">Terms Of Service</Button>
                    <Button type="link">Privacy Policy</Button>
                    <Button type="link">Cookie Policy</Button>
                    <Button type="link">Ads info</Button>
                    <Button type="link">Blog</Button>
                    <Button type="link">Status</Button>
                    <Button type="link">Careers</Button>
                    <Button type="link">Brand Resources</Button>
                    <Button type="link">Advertising</Button>
                    <Button type="link">Marketing</Button>
                </Space>
                <Typography>Covid Blog ©2021 Created by NSAII</Typography>
            </Footer> */}

        </>
    )
}