import React from "react";
import {createButton} from "react-social-login-buttons";

const config = {
  text: "Log in with Google",
  icon: "Google",
};
/** My Google login button. */
const MyGoogleLoginButton = createButton(config);

export default MyGoogleLoginButton;