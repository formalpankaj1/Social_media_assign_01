import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { followUserInstore, getSpecificUserInstore, unfollowUserInstore } from '../../store/specificUserSlice';

const Profile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // const [userInfo, setUserInfo] = useState({});
  // const [followers, setFollowers] = useState([]);
  // const [followings, setFollowings] = useState([]);

  const userInfo = useSelector((state) => state.specificUser)

  useEffect(() => {
    const name = props.match.params.user;

    dispatch(getSpecificUserInstore(name));

    // window.location.reload();
    // setUserInfo(JSON.parse(localStorage.getItem('specificUser')));

  }, [location])


  const Follow = (name) => {
    dispatch(followUserInstore(name));
  }

  const unfollow = (name) => {
    dispatch(unfollowUserInstore(name));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightpink' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10rem' }}>
          <div><h1>USER-INFO</h1></div>
          <div>
            <h1>USER_NAME : "{userInfo?.userinfo?.name}"</h1>
            <h1>EMAIL : "{userInfo?.userinfo?.email}"</h1>
          </div>
        </div>
        <div>
          <p style={{ color: 'red', width: '20rem' }}><b>NOTE: you cannot follow any person without login</b></p>
          {
            userInfo?.userinfo?.followers?.find(x => x == user?.result?.name) ?
              <button id="follow-button" onClick={() => unfollow(userInfo?.userinfo?.name)} style={{ color: 'white', fontFamily: "Helvetica", fontSize: '1rem', backgroundColor: 'green', border: '1px solid', borderColor: '#3399FF', borderRadius: ' 3px', width: '95px', height: '30px', cursor: 'pointer' }}>- UnFollow</button>
              :
              <button id="follow-button" onClick={() => Follow(userInfo?.userinfo?.name)} style={{ color: '#3399FF', fontFamily: "Helvetica", fontSize: '1rem', backgroundColor: '#ffffff', border: '1px solid', borderColor: '#3399FF', borderRadius: ' 3px', width: '85px', height: '30px', cursor: 'pointer' }}>+ Follow</button>
          }

        </div>
      </div>
      <div>
        <div style={{ backgroundColor: 'ButtonFace' }}>
          <div style={{ marginLeft: '1rem' }}>
            <h1 style={{ color: 'grey', fontFamily: 'fantasy' }}>FOLLOWERS: {userInfo?.userinfo?.followers?.length} <div style={{ marginLeft: '14rem', color: 'green' }}>"{userInfo?.userinfo?.followers?.join(', "')}"</div>    </h1>
            <h1 style={{ color: 'grey', fontFamily: 'fantasy' }}>FOLLOWINGS: {userInfo?.userinfo?.followings?.length} <div style={{ marginLeft: '14rem', color: 'green' }}>"{userInfo?.userinfo?.followings?.join(', ')}"</div>  </h1>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Profile