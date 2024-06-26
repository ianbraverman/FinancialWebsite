import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import "./authform.css";

/** This form allows users to register or log in. */
export default function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  // Controlled form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Form submission
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

  /** Send the requested authentication action to the API */
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { username, password };

    // We don't want to navigate if there's an error.
    // `unwrap` will throw an error if there is one
    // so we can use a try/catch to handle it.
    try {
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <article className="mainsection">
        <h1 className="logo">Falcon Finance</h1>
        <div className="imagecontainer">
          <img
            className="falconimageauthform "
            src="https://res.cloudinary.com/dzpne110u/image/upload/v1718305040/FalconFinancial/falconloginlogout_xuwohh.webp"
          />
        </div>
        <section className="loginlogoutmain">
          <form className="loginlogoutformarea" onSubmit={attemptAuth}>
            <label className="usernamepasswordindividual">
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="loginformtyping"
              />
            </label>
            <label className="usernamepasswordindividual">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="loginformtyping"
              />
            </label>
            <button className="authformbutton">{authAction}</button>
          </form>
          <a onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>

          {(loginLoading || registerLoading) && <p>Please wait...</p>}
          {loginError && <p role="alert">{loginError}</p>}
          {registerError && <p role="alert">{registerError}</p>}
        </section>
      </article>
    </>
  );
}
