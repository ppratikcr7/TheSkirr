import React from 'react'
import { apiTweetAction } from './lookup'

export function ActionBtn(props) {
  const { tweet, action, didPerformAction } = props
  console.log("tweet details: ", tweet);
  const likes = tweet.likes ? tweet.likes : 0
  const unlikes = tweet.unlikes ? tweet.unlikes : 0
  const reclacks = tweet.reclacks ? tweet.reclacks : 0
  // console.log("reclacks: ", reclacks);
  // debugger
  const className = props.className ? props.className : 'btn btn-primary btn-sm'
  const actionDisplay = action.display ? action.display : 'Action'

  const handleActionBackendEvent = (response, status) => {
    // console.log(response, status)
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status, action.type)
    }
  }
  const handleClick = (event) => {
    event.preventDefault()
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent)

  }
  let display = actionDisplay;
  if (action.type == 'like') {
    display = `${likes} ${actionDisplay}`
  }
  else if(action.type == 'retweet') {
    display = `${reclacks} ${actionDisplay}`
    // console.log("display: ", display);
  }
  if (action.type == 'unlike') {
    display = `${unlikes} ${actionDisplay}`
  }

  // const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
  return <span className="mr-4 text-xs"><a href="#" className="text-grey-dark hover:no-underline hover:text-red" onClick={handleClick}><i className={className}></i> {display}</a></span>
}