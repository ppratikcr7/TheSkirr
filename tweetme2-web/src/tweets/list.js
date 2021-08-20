import React, { useEffect, useState } from 'react'
import { apiTweetList } from './lookup'
import { apiReclackList } from './lookup'
import { apiLikedClacksList } from './lookup'
import { apiSearchedClacksList } from './lookup'
import { apiSearchedTrendAllClacksList } from './lookup'
import { Tweet } from './detail'

// ######### TweetList ###########

export function TweetsList(props) {
  const req_user = props.req_user
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [tweetsDidSet, setTweetsDidSet] = useState(false)
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }
  }, [props.newTweets, tweets, tweetsInit])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          setTweetsInit(response.results)
          setTweetsDidSet(true)
        } else {
          alert("There was an error")
        }
      }
      apiTweetList(props.username, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)
  }
  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        } else {
          alert("There was an error")
        }
      }
      apiTweetList(props.username, handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{ tweets.length ? tweets.map((item, index) => {
    return <Tweet
      tweetHandle={props.tweetHandle}
      tweet={item}
      didRetweet={handleDidRetweet}
      className='my-5 py-5 border bg-white text-dark'
      req_user={props.req_user}
      key={`${index}-{item.id}`} />
  }) : <div class="flex justify-center p-1 mb-2">"No clacks by the user found!!"</div>}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>More</button>}
  </React.Fragment>
}

// ######### ReclacksList ###########

export function ReclacksList(props) {

  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [tweetsDidSet, setTweetsDidSet] = useState(false)
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }
  }, [props.newTweets, tweets, tweetsInit])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          setTweetsInit(response.results)
          setTweetsDidSet(true)
        } else {
          alert("There was an error")
        }
      }
      apiReclackList(props.username, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)
  }
  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        } else {
          alert("There was an error")
        }
      }
      apiReclackList(props.username, handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{ tweets.length ? tweets.map((item, index) => {
    return <Tweet
      tweetHandle={props.tweetHandle}
      tweet={item}
      didRetweet={handleDidRetweet}
      className='my-5 py-5 border bg-white text-dark'
      key={`${index}-{item.id}`} />
  }) : <div class="flex justify-center p-1 mb-2">"No reclacks by the user found!!"</div>}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>More</button>}
  </React.Fragment>
}

// ######### LikedClacksList ###########

export function LikedClacksList(props) {
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [tweetsDidSet, setTweetsDidSet] = useState(false)
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }
  }, [props.newTweets, tweets, tweetsInit])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          setTweetsInit(response.results)
          setTweetsDidSet(true)
        } else {
          alert("There was an error")
        }
      }
      apiLikedClacksList(props.username, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)
  }
  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        } else {
          alert("There was an error")
        }
      }
      apiLikedClacksList(props.username, handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{ tweets.length ? tweets.map((item, index) => {
    return <Tweet
      tweetHandle={props.tweetHandle}
      tweet={item}
      didRetweet={handleDidRetweet}
      className='my-5 py-5 border bg-white text-dark'
      key={`${index}-{item.id}`} />
  }) : <div class="flex justify-center p-1 mb-2">"No liked clacks by the user found!!"</div>}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>More</button>}
  </React.Fragment>
}

// ######### SearchedclacksList ###########

export function SearchedclacksList(props) {
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [tweetsDidSet, setTweetsDidSet] = useState(false)
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }
  }, [props.newTweets, tweets, tweetsInit])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          setTweetsInit(response.results)
          setTweetsDidSet(true)
        } else {
          alert("There was an error")
        }
      }
      apiSearchedClacksList(props.value, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username, props.value])

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)
  }
  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        } else {
          alert("There was an error")
        }
      }
      apiSearchedClacksList(props.value, handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{ tweets.length ? tweets.map((item, index) => {
    return <Tweet
      tweetHandle={props.tweetHandle}
      tweet={item}
      didRetweet={handleDidRetweet}
      className='my-5 py-5 border bg-white text-dark'
      key={`${index}-{item.id}`} />
  }) : <div class="flex justify-center p-1 mb-2">"No searched clacks found!!"</div>}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>More</button>}
  </React.Fragment>
}

// ######### SearchedTrendAllClacksList ###########

export function SearchedTrendAllClacksList(props) {
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [tweetsDidSet, setTweetsDidSet] = useState(false)
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }
  }, [props.newTweets, tweets, tweetsInit])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          setTweetsInit(response.results)
          setTweetsDidSet(true)
        } else {
          alert("There was an error")
        }
      }
      apiSearchedTrendAllClacksList(props.value, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username, props.value])

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(tweets)
    setTweets(updateFinalTweets)
  }
  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        } else {
          alert("There was an error")
        }
      }
      apiSearchedTrendAllClacksList(props.value, handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{ tweets.length ? tweets.map((item, index) => {
    return <Tweet
      tweetHandle={props.tweetHandle}
      tweet={item}
      didRetweet={handleDidRetweet}
      className='my-5 py-5 border bg-white text-dark'
      key={`${index}-{item.id}`} />
  }) : <div class="flex justify-center p-1 mb-2">"No searched trending clacks found!!"</div>}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>More</button>}
  </React.Fragment>
}