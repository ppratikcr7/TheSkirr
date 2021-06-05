import React, {useEffect, useState} from 'react'

import {UserDisplay, UserPicture} from './components'
import {apiProfileDetail, apiProfileFollowToggle} from './lookup'

import {DisplayCount} from './utils'

function ProfileBadge(props) {
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div style={{ paddingTop: 40, paddingBottom: 40, paddingRight: 20, paddingLeft: 100,  margin: 5 }}>
        <UserPicture user={user} hideLink style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 20, paddingLeft: 20,  margin: 5 }}/>
        <p style={{ paddingTop: 20, paddingBottom: 0, paddingRight: 10, paddingLeft: 0,  margin: 5 }}><UserDisplay user={user} includeFullName hideLink /></p>
        <p style={{ paddingTop: 20, paddingBottom: 0, paddingRight: 10, paddingLeft: 0,  margin: 5 }}><DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count === 1 ? "follower" : "followers"} </p>
        <p style={{ paddingTop: 20, paddingBottom: 0, paddingRight: 10, paddingLeft: 0,  margin: 5 }}><DisplayCount>{user.following_count}</DisplayCount> following</p>
        {/* <p style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 20, paddingLeft: 20,  margin: 5 }}>{user.location}</p>
        <p style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 20, paddingLeft: 20,  margin: 5 }}>{user.bio}</p> */}
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
    </div> : null
}

export function ProfileBadgeComponent (props) {
    const {username} = props
    // lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response, status) => {
      if (status === 200) {
        setProfile(response)
      }
    }
    useEffect(()=>{
      if (didLookup === false){
        apiProfileDetail(username, handleBackendLookup)
        setDidLookup(true)
      }
    }, [username, didLookup, setDidLookup])

    const handleNewFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status)=>{
            // console.log(response, status)
            if (status===200) {
                setProfile(response)
                // apiProfileDetail(username, handleBackendLookup)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
        
    }
    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : null
}