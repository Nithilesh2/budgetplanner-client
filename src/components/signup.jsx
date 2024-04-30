import React, { useRef, useState } from "react";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SignUp() {
  const froundRef = useRef(null);
  const sroundRef = useRef(null);
  const troundRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);
  const notifyGreen = (val) => toast.success(`${val}`);
  const notifyYellow = (val) => toast.warn(`${val}`);
  const notifyRed = (val) => {
    toast.error(`${val}`);
  };
  const navigate = useNavigate();
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{7,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState(0);
  const [confirmPass, setConfirmPass] = useState(0);
  const [go, setGo] = useState(0);

  function autoGeneratePass() {
    let password = "";
    const smallPassReg = "abcdefghijklmnopqrstuvwxyz0123456789";
    const capitalPassReg = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersReg = "0123456789";
    const specialReg = "@#$~!";

    for (let i = 0; i < 2; i++) {
      let smallRandomValueIndex = Math.floor(
        Math.random() * smallPassReg.length
      );
      password += smallPassReg[smallRandomValueIndex];
      let bigRandomValueIndex = Math.floor(
        Math.random() * capitalPassReg.length
      );
      password += capitalPassReg[bigRandomValueIndex];
      let numberRandomValueIndex = Math.floor(
        Math.random() * numbersReg.length
      );
      password += numbersReg[numberRandomValueIndex];
      let specialRandomValueIndex = Math.floor(
        Math.random() * specialReg.length
      );
      password += specialReg[specialRandomValueIndex];
    }

    passRef.current.value = password;
    confirmPassRef.current.value = password;
    notifyGreen("🚀 Password copied to clipboard! Ready to paste it in?");
    navigator.clipboard.writeText(password);
  }

  const emailChanging = (eve) => {
    setEmail(eve.target.value);
    if (eve.target.value === "") {
      froundRef.current.style.color = "grey";
      emailRef.current.style.color = "grey";
    } else if (!emailRegex.test(email)) {
      froundRef.current.style.color = "red";
      emailRef.current.style.color = "red";
    } else {
      froundRef.current.style.color = "green";
      emailRef.current.style.color = "green";
    }
  };
  const passwordChanging = (eve) => {
    setPass(eve.target.value);
    if (eve.target.value === "") {
      sroundRef.current.style.color = "grey";
      passRef.current.style.color = "grey";
    } else if (!passRegex.test(pass)) {
      sroundRef.current.style.color = "red";
      passRef.current.style.color = "red";
    } else {
      sroundRef.current.style.color = "green";
      passRef.current.style.color = "green";
    }
  };
  const rePasswordChanging = (eve) => {
    setConfirmPass(eve.target.value);
    if (eve.target.value === "") {
      troundRef.current.style.color = "grey";
      confirmPassRef.current.style.color = "grey";
    } else if (!passRegex.test(confirmPass)) {
      troundRef.current.style.color = "red";
      confirmPassRef.current.style.color = "red";
    } else {
      if (pass === eve.target.value) {
        troundRef.current.style.color = "green";
        confirmPassRef.current.style.color = "green";
      } else {
        troundRef.current.style.color = "red";
        confirmPassRef.current.style.color = "red";
      }
    }
  };
  const signupbtnClicked = () => {
    if (email === "" && pass === 0 && confirmPass === 0) {
      notifyRed("Credentials are not Entered");
    } else if (email === "") {
      notifyRed("Email is empty");
    } else if (pass === 0) {
      notifyRed("Enter password");
    } else if (confirmPass === 0) {
      notifyRed("Enter confirm password");
    } else if (pass !== confirmPass) {
      notifyYellow("Password and Confirm password not matches");
    } else {
      if (!emailRegex.test(email)) {
        setGo(0);
        notifyYellow("Enter correct email address");
      } else if (!passRegex.test(pass)) {
        setGo(0);
        notifyYellow("Not Strong password");
      } else if (!passRegex.test(confirmPass)) {
        setGo(0);
        notifyYellow("Not Strong Confirm password");
      } else {
        setGo(1);
        notifyGreen("Got your credentials🥳 !");
      }
    }
  };

  const handleSubmit = async (eve) => {
    eve.preventDefault();

    if (go === 1) {
      await axios
        .post("http://localhost:8800/users", { email, pass })
        .then(() =>
          setTimeout(() => {
            navigate("/");
          }, 1000)
        )
        .catch((err) => console.error(err));
    }
  };

  return (
    <main className="main">
      <div className="loginbox">
        <ToastContainer newestOnTop autoClose={2000} />
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="SignUp">SignUp</h2>

          <div className="mai">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter mail"
              required
              onChange={emailChanging}
              ref={emailRef}
            />
            <span className="checkmail">
              <i className="fa-solid fa-circle" ref={froundRef}></i>
            </span>
          </div>

          <div className="pas">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={passwordChanging}
              ref={passRef}
            />
            <button className="autoGeneratePass" onClick={autoGeneratePass}>
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <span className="checkpas">
              <i className="fa-solid fa-circle" ref={sroundRef}></i>
            </span>
          </div>

          <div className="repas">
            <input
              type="password"
              name="RePassword"
              id="rePassword"
              placeholder="Confirm password"
              required
              onChange={rePasswordChanging}
              ref={confirmPassRef}
            />
            <span className="recheckpas">
              <i className="fa-solid fa-circle" ref={troundRef}></i>
            </span>
          </div>
          <button
            name="submit"
            type="submit"
            onClick={signupbtnClicked}
            id="button"
          >
            Sign Up
          </button>
          <div className="or">
            <hr className="hr" />
            <h4>OR</h4>
            <hr className="hr" />
          </div>
          <div className="google">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
              }}
              onError={() => {
                alert("Login Failed");
              }}
            />
          </div>
          <div className="logIn">
            <h5>Already have any account?</h5>
            <div
              className="allogin"
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
