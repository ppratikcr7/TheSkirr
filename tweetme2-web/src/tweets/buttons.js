import React from 'react'

import { apiTweetAction } from './lookup'

export function ActionBtn(props) {
  const { tweet, action, didPerformAction } = props
  const likes = tweet.likes ? tweet.likes : 0
  const className = props.className ? props.className : 'btn btn-primary btn-sm'
  const actionDisplay = action.display ? action.display : 'Action'

  const handleActionBackendEvent = (response, status) => {
    console.log(response, status)
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status)
    }
  }
  const handleClick = (event) => {
    event.preventDefault()
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent)

  }
  const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
  return <span class="mr-8"><a href="#" class="text-grey-dark hover:no-underline hover:text-red" onClick={handleClick}><i class={className}></i> {display}</a></span>
}