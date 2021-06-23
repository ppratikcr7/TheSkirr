import React from 'react'

export function UserLink (props) {
  const {username} = props
  const handleUserLink = (event) => {
    window.location.href= `/profiles/user_wall/${username}`
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
      <UserPicture user={user}></UserPicture>
      {/* <span style="font-weight: bold;">&emsp;{nameDisplay}&emsp;</span> */}
      <p>&emsp;</p>{nameDisplay}
      {hideLink === true ? `@${user.username}` : <UserLink username={user.username}>@{user.username}</UserLink>}
    </div>
  </React.Fragment>
}

export  function UserPicture (props) {
  
  const {user, hideLink} = props
  const userIdSpan1 = <img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="45px" height="45px"/>
  const userIdSpan2 = <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' width="45px" height="45px"/>
  // console.log("gender disp2: ", user.gender )
  return  hideLink === true ? (user.gender === 'M' ? userIdSpan1 : userIdSpan2) : <UserLink username={user.username}>{(user.gender === 'M' ? userIdSpan1 : userIdSpan2)}</UserLink>
}
