import React from 'react'

export function UserLink (props) {
  const {username} = props
  const handleUserLink = (event) => {
    window.location.href= `/profiles/dashboard/${username}`
  }
  return <span className='pointer' onClick={handleUserLink}>
      {props.children}
  </span>
}

export  function UserDisplay(props){
  const {user, includeFullName, hideLink} = props
  const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null
  return <React.Fragment>
    {nameDisplay}
    {hideLink === true ? `@${user.username}` : <UserLink username={user.username}>@{user.username}</UserLink>}
  </React.Fragment>
}

export  function UserWhoToFollowDisplay(props){
  const {user, includeFullName, hideLink} = props
  const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null
  // console.log("gender disp1: ", user.gender )
  return <React.Fragment>
    <div className='badge'>
    <UserLink username={user.username}><UserPicture user={user}></UserPicture></UserLink>
      {/* <span style="font-weight: bold;">&emsp;{nameDisplay}&emsp;</span> */}
      <span>&emsp;{nameDisplay}{hideLink === true ? `@${user.username}` : <UserLink username={user.username}>@{user.username}</UserLink>}</span> 
    </div>
  </React.Fragment>
}

export  function UserPicture (props) {
  
  const {user, hideLink} = props
  const userIdSpan = <img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="35px" height="35px"/>
  // const userIdSpan2 = <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="45px" height="45px"/>
  // console.log("gender disp2: ", user.gender )
  // const userIdSpan = <span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white'>
  // {user.first_name[0]}
  // </span>
  return  hideLink === true ? userIdSpan : <UserLink username={user.username}>{userIdSpan}</UserLink>
  // return  hideLink === true ? (user.gender === 'M' ? userIdSpan1 : userIdSpan2) : <UserLink username={user.username}>{(user.gender === 'M' ? userIdSpan1 : userIdSpan2)}</UserLink>
}
