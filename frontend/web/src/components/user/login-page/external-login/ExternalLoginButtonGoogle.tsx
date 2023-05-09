import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ExternalLoginButton } from "./ExternalLoginButton";
import { FormattedMessage } from "react-intl";
import { useRecoilValue } from "recoil";

import { ICustomExternalLoginButton } from "./types";
import { environmentSettingsSelector } from "@navtrack/shared/state/environment";

export function ExternalLoginButtonGoogle(props: ICustomExternalLoginButton) {
  const settings = useRecoilValue(environmentSettingsSelector);

  const handleGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const googleLoginResponse = response as GoogleLoginResponse;

    if (googleLoginResponse.tokenObj !== undefined) {
      props.login(googleLoginResponse.tokenObj.id_token, "google");
    }
  };

  return (
    <>
      {settings["GoogleAuthentication.ClientId"] && (
        <GoogleLogin
          clientId={settings["GoogleAuthentication.ClientId"]}
          onSuccess={handleGoogleSuccess}
          onFailure={(error) => console.log(error)}
          render={(renderProps) => (
            <ExternalLoginButton icon={faGoogle} onClick={renderProps.onClick}>
              <FormattedMessage id="generic.google" />
            </ExternalLoginButton>
          )}
        />
      )}
    </>
  );
}
