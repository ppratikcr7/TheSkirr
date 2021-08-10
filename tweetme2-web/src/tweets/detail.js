
import React, { useRef, useEffect, useState } from 'react'
import { MoreOutlined, EditOutlined, DeleteOutlined, WechatOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, message, Comment, Avatar, Form, List, Input } from 'antd';
import formatDate from './date'
import { ActionBtn } from './buttons'
import BlankImage from '../Assets/blank.png';
import { TweetCreate } from './create';
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
  let [isEditable, setIsEditable] = useState(false),
    [isCommentable, setIsCommentable] = useState(false),
    [submitting, setSubmitting] = useState(false),
    [replyValue, setReplyValue] = useState('');

  let commentRef = useRef(null);


  const { TextArea } = Input;
  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  }, [commentRef]);
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} ref={commentRef} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Reply
        </Button>
      </Form.Item>
    </>
  );
  function handleSubmit() {
    if (!replyValue) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setReplyValue('')
      // comments: [
      //   ...this.state.comments,
      //   {
      //     author: 'Han Solo',
      //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //     content: <p>{this.state.value}</p>,
      //     datetime: moment().fromNow(),
      //   },
      // ],
    }, 1000);
  };

  function handleChange(e) {
    console.log("e.target.value:", e, e.target.value);
    setReplyValue(e.target.value);
    commentRef.current.focus();
  };
  const menu = (
    <Menu onClick={handleMenuItemClick}>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      {/* <Menu.Item key="2" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item> */}
    </Menu>
  );
  function handleMenuItemClick(e) {
    setIsEditable(true);
  }
  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
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
  const handleNewTweet = (action) => {
    console.log("newTweet1:", action);
    setIsEditable(false);
    props.tweetHandle(action);
    // let tempNewTweets = [...newTweets]
    // tempNewTweets.unshift(newTweet)
    // console.log("tempNewTweets2:", tempNewTweets);
    // setNewTweets(tempNewTweets)
  }

  return <div className="flex border-b border-solid border-grey-light">

    {isRetweet === true && <div className='mb-2'>
      <span className='small text-muted'>ReClack via <UserDisplay user={retweeter} /></span>
    </div>}
    <div className="w-1/16 text-left pl-0 pt-3 ml-2">
      <UserLink username={tweet.user.username}><UserPicture user={tweet.user}></UserPicture></UserLink>
      {/* <div><a href="#"><img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="45px" height="45px" /></a></div> */}
    </div>
    <div className="w-15/16 p-3 pl-0">
      <div className="flex justify-between">
        <div>
          <UserDisplay includeFullName user={tweet.user} />
        </div>
        <div>
          {/* <MoreOutlined /> */}
          <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
          </Dropdown.Button>
        </div>
      </div>

      <div>
        {!isEditable ?
          <div className="mb-4">

            <p className="mt-6" id="clack_content" dangerouslySetInnerHTML={{ __html: convertLinks(tweet.content) }}></p>

            <ParentTweet tweet={tweet} retweeter={tweet.user} />
          </div>
          :
          <div>
            <div className="p-1 text-lg font-bold border-b border-solid border-grey-light">
              {
                <TweetCreate didTweet={handleNewTweet} className='col-9 mb-3' clack={tweet.content} tweetid={tweet.id} editableClack={isEditable} />}
            </div>
          </div>}
      </div>
      <div className="pb-2">
        {(actionTweet && hideActions !== true) && <React.Fragment>
          {/* <ActionBtn className={"fa fa-reply fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "reply", display: "Reply" }} /> */}
          <WechatOutlined className={"mr-2"} onClick={() => setIsCommentable(true)} /> {"Reply"}
          <ActionBtn className={"fa fa-retweet fa-lg ml-2 mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "retweet", display: "Reclack" }} />
          <ActionBtn className={"fa fa-thumbs-up"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "like", display: "Likes" }} />
          <ActionBtn className={"fa fa-thumbs-down"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "unlike", display: "Unlike" }} />
          <ActionBtn className={"fa fa-trash fa-lg mr-2"} tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: "delete", display: "Delete" }} />
        </React.Fragment>
        }
        <time className='mr-3'>{tweetTimestampClean}</time>
        {(isDetail !== true && hideActions === true) ? null : <button className='btn btn-outline-primary btn-sm mt-1' onClick={handleLink}>View Clack Thread</button>}
        {(hideActions !== true) ? null : <button className='btn btn-outline-primary btn-sm mt-1' onClick={handleLink}>View Clack</button>}

      </div>
      {isCommentable &&
        <div>
          {/* {comments.length > 0 && <CommentList comments={comments} />} */}
          <Comment
            avatar={
              <UserPicture user={tweet.user}></UserPicture>
            }
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={replyValue}
              />
            }
          />
        </div>
      }
    </div>
  </div>
}
