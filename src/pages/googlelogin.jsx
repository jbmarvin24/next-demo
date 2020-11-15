import { Typography } from '@material-ui/core';
import { useState } from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const responseGoogle = (response) => {
    if (response.googleId) {
      const { email, name, imageUrl, googleId } = response.profileObj;
      setUserProfile({
        email,
        name,
        imageUrl,
        googleId,
      });
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Google Login Demo
      </Typography>
      {isLoggedIn ? (
        <div>
          <img src={userProfile.imageUrl} alt="User Image" />
          <Typography variant="h5">Welcome {userProfile.name}</Typography>
          <Typography variant="subtitle2">{userProfile.email}</Typography>
          <pre>{JSON.stringify(userProfile, null, 4)}</pre>
        </div>
      ) : (
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default GoogleLoginDemo;
