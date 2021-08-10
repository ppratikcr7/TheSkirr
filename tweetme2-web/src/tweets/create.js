import React from 'react'
import { apiTweetCreate } from './lookup'
import { apiTweetEdit } from './lookup'

export function TweetCreate(props) {
  const textAreaRef = React.createRef()
  textAreaRef.current = props.clack && props.clack;
  const tweetid = props.tweetid;
  // let tweetid = "22";
  // textAreaRef.current.value && (textAreaRef.current.value = props.clack && props.clack)
  const { didTweet, clackTextId } = props
  const handleBackendUpdate = (response, status) => {
    if (status === 201 || status === 200) {
      didTweet(response)
    }
    else {
      console.log(response)
      // alert("An error occured please try again")
    }
  }
  const MAX_TWEET_LENGTH = 200;
  const clack_btn_disable = '';
  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    // backend api request
    if (props.editableClack) {
      apiTweetEdit(tweetid, newVal, handleBackendUpdate)
    } else {
      apiTweetCreate(newVal, handleBackendUpdate)
    }

    if (newVal.length <= MAX_TWEET_LENGTH) {
      textAreaRef.current.value = ""
    }
    else {
      // clack_btn_disable = 'disabled'
      var element = document.getElementById("clack_btn");
      // it's a good idea to check whether the element exists
      if (element != null && element != undefined) {
        element.disabled = "disabled";
      }
    }
  }
  return <div className={props.className}>
    <form onSubmit={handleSubmit}>
      <textarea ref={textAreaRef} id={clackTextId} required={true} className='form-control' name='tweet' placeholder='Enter Your Clack of less than 200 characters...'>{props.clack && props.clack}</textarea>
      {clackTextId == 'clackText' ? <div id="info1" className="text-right text-sm"></div> : <div id="info2" className="text-right text-sm"></div>}
      {clackTextId == 'clackText' ? <div id="error1" className="text-center text-sm"></div> : <div id="error2" className="text-center text-sm"></div>}
      {/* <textarea ref={textAreaRef} id="clackText" required={true} className='form-control' name='tweet' placeholder='Enter Your Clack of less than 200 characters...'>{props.clack && props.clack}</textarea>
      <div id="info" className="text-right text-sm"></div>
      <div id="error" className="text-center text-sm"></div> */}
      <button id="clack_btn" type='submit' className='btn btn-primary my-3 mr-3'>{props.editableClack ? "Update" : "Clack"}</button>
      {/* <button className='btn btn-primary my-3 mr-3'><a href="/profiles/report_adverse_effect_form" style={{ "text-decoration" : "none"}}>Report Adverse Effect</a></button> */}
      {/* <button className='btn btn-primary my-3 mr-2' disabled>News</button> */}
    </form>
  </div>
}