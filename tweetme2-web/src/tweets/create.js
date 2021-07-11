import React from 'react'
import {apiTweetCreate} from './lookup'

export function TweetCreate(props){
  const textAreaRef = React.createRef()
  const {didTweet} = props
    const handleBackendUpdate = (response, status) =>{
      if (status === 201){
        didTweet(response)
      } 
      else {
        console.log(response)
        // alert("An error occured please try again")
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const newVal = textAreaRef.current.value
      // backend api request
      apiTweetCreate(newVal, handleBackendUpdate)
      textAreaRef.current.value = ''
    }
    return <div className={props.className}>
          <form onSubmit={handleSubmit}>
            <textarea ref={textAreaRef} id="clackText" required={true} className='form-control' name='tweet' placeholder='Enter Your Clack of less than 200 characters...'></textarea>
            <div id="info" className="text-right text-sm"></div>
            <div id="error" className="text-center text-sm"></div>
            <button type='submit' className='btn btn-primary my-3 mr-3'>Clack</button>
            <button type='submit' className='btn btn-primary my-3 mr-3'><a href="/profiles/report_adverse_effect_form" style={{ "text-decoration" : "none"}}>Report Adverse Effect</a></button>
            <button className='btn btn-primary my-3 mr-2' disabled>News</button>
        </form>
  </div>
}