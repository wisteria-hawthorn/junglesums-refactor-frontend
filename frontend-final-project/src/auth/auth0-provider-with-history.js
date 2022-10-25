import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

// 7, 8, 9 -- Auth0 credentials that change depending on which account is used for authentication
const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-z4rofpvosozxnlqw.eu.auth0.com";
  const clientId = "PHJyq1ZQr3br3yCPfPpBrPErmVwJBmbg";
  const audience = "https://dev-z4rofpvosozxnlqw.eu.auth0.com/api/v2/";

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
      scope="read:current_user update:current_user_metadata create:posts read:posts"
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory;