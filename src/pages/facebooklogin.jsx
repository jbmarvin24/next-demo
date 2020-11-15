import { Typography } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import { useState } from 'react';

const FacebookLoginDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const componentClicked = () => {};

  const responseFacebook = (response) => {
    if (response.userID) {
      const { userID, email, name, picture } = response;
      setUserProfile({
        userID,
        email,
        name,
        pictureUrl: picture.data.url,
      });
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Facebook Login Demo
      </Typography>
      {isLoggedIn ? (
        <div>
          <img src={userProfile.pictureUrl} alt="User Image" />
          <Typography variant="h5">Welcome {userProfile.name}</Typography>
          <Typography variant="subtitle2">{userProfile.email}</Typography>
          <pre>{JSON.stringify(userProfile, null, 4)}</pre>
        </div>
      ) : (
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
      )}
    </div>
  );
};

export default FacebookLoginDemo;
