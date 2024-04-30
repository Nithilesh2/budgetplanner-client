import React, { useEffect, useState, useRef } from "react";
import AppContext from "../context/AppContext";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const notifyRed = (val) => {
    toast.error(`${val}`);
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const [decodedName, setDecodedName] = useState("");
  const [decoded, setDecoded] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const toggleButton = () => {
    setShow(!show);
  };

  const handleSubmit = async (eve) => {
    eve.preventDefault();
    let response = await axios.get("http://localhost:8800/users");
    let resData = response.data;

    for (let i = 0; i < resData.length; i++) {
      if (emailRef.current.value !== resData[i].email) {
        console.log("This is email ref", emailRef.current.value);
        console.log("This is from server", resData[i].email);
        notifyRed("🕵️‍♂️ Uh-oh, we couldn't find your login details.");
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        if (passwordRef.current.value === resData[i].pass) {
          navigate("/dashboard");
        } else {
          notifyRed("🛑 Password mismatch! Let's give it another shot.");
          passwordRef.current.value = "";
        }
      }
    }
  };

  function loginClicked(credentialResponse) {
    let decode = jwtDecode(credentialResponse.credential);
    var userName = decode.name;
    setDecoded(userName);
  }
  useEffect(() => {
    setDecodedName(decoded);
    if (decodedName) {
      setDecoded((decodedName) => decodedName);
      navigate("/dashboard");
    }
  }, [decoded, navigate, decodedName]);

  return (
    <>
      <AppContext.Provider
        value={{ decoded, setDecoded, decodedName, setDecodedName }}
      >
        <main className="main">
          <div className="loginbox">
            <form className="form" onSubmit={handleSubmit}>
              <h2 className="loginName">Login</h2>
              <div className="mai">
                <input
                  type="email"
                  name="Email"
                  className="e_mail"
                  placeholder="Enter mail"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="pas">
                <input
                  type={show ? "text" : "password"}
                  name="Password"
                  className="pass"
                  placeholder="Enter password"
                  required
                  ref={passwordRef}
                />
                <span className="show">
                  <i
                    style={{ color: "black", cursor: "pointer" }}
                    className={
                      show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                    }
                    onClick={toggleButton}
                  ></i>
                </span>
              </div>
              <button type="submit" className="btn">
                SignIn
              </button>
              <ToastContainer newestOnTop autoClose={2000} />
              <div className="forgotPass">Forgot password?</div>
              <div className="or">
                <hr className="hr" />
                <h4>OR</h4>
                <hr className="hr" />
              </div>
              <div className="google">
                <GoogleLogin
                  onSuccess={loginClicked}
                  onError={() => {
                    alert("Login Failed");
                  }}
                />
              </div>
              <div className="signUp">
                <h5>Doesn't have an account?</h5>
                <span
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  SignUp
                </span>
              </div>
            </form>
          </div>
        </main>
      </AppContext.Provider>
    </>
  );
}
