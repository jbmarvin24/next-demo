require('dotenv').config();

module.exports = {
  env: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};
