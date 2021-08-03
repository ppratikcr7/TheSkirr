
import React, { useEffect, useState } from 'react'
import formatDate from './date'
import { ActionBtn } from './buttons'
import BlankImage from '../Assets/blank.png';
import DeleteBtn from '../Assets/delete.png';
import {
  UserDisplay,
  UserPicture,
  UserLink
} from '../profiles'


export function ParentTweet(props) {
  const { tweet } = props
  return tweet.parent ? <Tweet isRetweet retweeter={props.retweeter} hideActions className={' '} tweet={tweet.parent} /> : null
}
export function Tweet(props) {
  const clackContent = React.createRef()
  const { tweet, didRetweet, hideActions, isRetweet, retweeter } = props
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
  // console.log("props.tweet:", props.tweet);
  const [newTweetContent, setNewTweetContent] = useState();
  let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  className = isRetweet === true ? `${className} p-2 border rounded` : className
  const path = window.location.pathname
  const match = path.match(/(?<tweetid>\d+)/)
  const urlTweetId = match ? match.groups.tweetid : -1
  const isDetail = `${tweet.id}` === `${urlTweetId}`

  const tweetTimestampRaw = `${tweet.timestamp}`;
  const tweetTimestampClean = formatDate(tweetTimestampRaw);

  useEffect(() => {
    setActionTweet(props.tweet ? props.tweet : null)
  }, [props.tweet]);

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/${tweet.id}`
  }
  const handlePerformAction = (newActionTweet, status, action) => {
    // console.log("action:", action);
    if (status === 200) {
      setActionTweet(newActionTweet)
      // if (action === "delete") {
      props.tweetHandle(action);
      // }
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet)
      }
    }
  }

  const convertLinks = (input) => {
    let text = input;
    const linksFound = text && text.match(/(?:www|https?)[^\s]+/g);
    const aLink = [];

    if (linksFound != null) {

      for (let i = 0; i < linksFound.length; i++) {
        let replace = linksFound[i];
        if (!(linksFound[i].match(/(http(s?)):\/\//))) { replace = 'http://' + linksFound[i] }
        let linkText = replace.split('/')[2];
        if (linkText.substring(0, 3) == 'www') { linkText = linkText.replace('www.', '') }
        if (linkText.match(/youtu/)) {

          let youtubeID = replace.split('/').slice(-1)[0];
          console.log("youtube link: ", youtubeID)
          aLink.push('<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
        }
        else if (linkText.match(/vimeo/)) {
          let vimeoID = replace.split('/').slice(-1)[0];
          aLink.push('<div class="video-wrapper"><iframe src="https://player.vimeo.com/video/' + vimeoID + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')
        }
        else {
          aLink.push('<a href="' + replace + '" target="_blank" style="text-decoration: underline; color: blue" >' + linkText + '</a>');
        }
        text = text.split(linksFound[i]).map(item => { return aLink[i].includes('iframe') ? item.trim() : item }).join(aLink[i]);
      }
      return text;

    }
    else {
      return input;
    }
  }

  return <div className="flex border-b border-solid border-grey-light">

    {isRetweet === true && <div className='mb-2'>
      <span className='small text-muted'>ReClack via <UserDisplay user={retweeter} /></span>
    </div>}
    <div className="w-1/16 text-left pl-0 pt-3">
      <UserLink username={tweet.user.username}><UserPicture user={tweet.user}></UserPicture></UserLink>
      {/* <div><a href="#"><img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="45px" height="45px" /></a></div> */}
    </div>
    <div className="w-15/16 p-3 pl-0">
      <div className="flex justify-between">
        <div>
          <UserDisplay includeFullName user={tweet.user} />
          {/* use the below for color encoding */}
          {/* <span class="text-grey-dark">&middot;</span> */}
        </div>
        <div>
          {/* use this to populate delete clack option */}
          {/* <a href="#" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down"></i></a> */}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <p className="mt-6" id="clack_content" dangerouslySetInnerHTML={{ __html: convertLinks(tweet.content) }}></p>
          <ParentTweet tweet={tweet} retweeter={tweet.user} />
        </div>
      </div>
      <div className="pb-2">
        {(actionTweet && hideActions !== true) && <React.Fragment>
          <ActionBtn className={"fa fa-reply fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "reply", display: "Reply" }} />
          <ActionBtn className={"fa fa-retweet fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "retweet", display: "Reclack" }} />
          <ActionBtn className={"fa fa-thumbs-up"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "like", display: "Likes" }} />
          <ActionBtn className={"fa fa-thumbs-down"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "unlike", display: "Unlike" }} />
          <ActionBtn className={"fa fa-trash fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "delete", display: "Delete" }} />

        </React.Fragment>
        }
        <time className='mr-3'>{tweetTimestampClean}</time>
        {(isDetail !== true && hideActions === true) ? null : <button className='btn btn-outline-primary btn-sm mt-1' onClick={handleLink}>View Clack Thread</button>}
        {(hideActions !== true) ? null : <button className='btn btn-outline-primary btn-sm mt-1' onClick={handleLink}>View Clack</button>}

      </div>
    </div>
  </div>
}
