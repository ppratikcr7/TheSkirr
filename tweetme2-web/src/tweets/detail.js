
import React, { useState } from 'react'
import formatDate from './date'
import { ActionBtn } from './buttons'
import BlankImage from '../Assets/blank.png';
import DeleteBtn from '../Assets/delete.png';
import {
  UserDisplay,
  UserPicture
} from '../profiles'

export function ParentTweet(props) {
  const { tweet } = props
  return tweet.parent ? <Tweet isRetweet retweeter={props.retweeter} hideActions className={' '} tweet={tweet.parent} /> : null
}
export function Tweet(props) {
  const { tweet, didRetweet, hideActions, isRetweet, retweeter } = props
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
  let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  className = isRetweet === true ? `${className} p-2 border rounded` : className
  const path = window.location.pathname
  const match = path.match(/(?<tweetid>\d+)/)
  const urlTweetId = match ? match.groups.tweetid : -1
  const isDetail = `${tweet.id}` === `${urlTweetId}`

  const tweetTimestampRaw = `${tweet.timestamp}`;
  const tweetTimestampClean = formatDate(tweetTimestampRaw);

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/${tweet.id}`
  }
  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet)
      props.tweetHandle("working");
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet)
      }
    }

  }

  return <div class="flex border-b border-solid border-grey-light">
    {isRetweet === true && <div className='mb-2'>
      <span className='small text-muted'>ReClack via <UserDisplay user={retweeter} /></span>
    </div>}
    <div class="w-1/8 text-right pl-3 pt-3">
      <div><a href="#"><img src={BlankImage} /></a></div>
    </div>
    <div class="w-7/8 p-3 pl-0">
      <div class="flex justify-between">
        <div>
          <UserDisplay includeFullName user={tweet.user} />
          {/* use the below for color encoding */}
          {/* <span class="text-grey-dark">&middot;</span> */}
        </div>
        <div>
          {/* use this to populate delete clack option */}
          <a href="#" class="text-grey-dark hover:text-teal"><i class="fa fa-chevron-down"></i></a>
        </div>
      </div>

      <div>
        <div class="mb-4">
          <p class="mt-6">{tweet.content}</p>
          <ParentTweet tweet={tweet} retweeter={tweet.user} />
        </div>
      </div>
      <div class="pb-2">
        {(actionTweet && hideActions !== true) && <React.Fragment>
          <ActionBtn className={"fa fa-thumbs-up"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "like", display: "Likes" }} />
          <ActionBtn className={"fa fa-thumbs-down"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "unlike", display: "Unlike" }} />
          <ActionBtn className={"fa fa-retweet fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "retweet", display: "Reclack" }} />
          <ActionBtn className={"fa fa-delete fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "delete", display: "Delete" }} />

        </React.Fragment>
        }
        {(isDetail !== true && hideActions === true) ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View Clack Thread</button>}
        {(hideActions !== true) ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View Clack</button>}
        <time>&emsp;{tweetTimestampClean}</time>
      </div>
    </div>
  </div>
}
