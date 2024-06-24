import React, { useEffect, useContext } from "react"
import AppContext from "../context/AppContext"
import "../css/login.css"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { ToastContainer } from "react-toastify"
// import axios from "axios"

export default function Login() {
  const {
    loginClicked,
    emailRef,
    passwordRef,
    notifyRed,
    decoded,
    show,
    toggleButton,
  } = useContext(AppContext)

  const navigate = useNavigate()

  const submitBtnClicked = () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if (email === "test@gmail.com") {
      if (password === "123") {
        navigate("/dashboard")
      } else {
        notifyRed("Password mismatch! use '123'.")
        passwordRef.current.value = ""
      }
    } else {
      notifyRed("Uh-oh, use mail as 'test@gmail.com'")
      emailRef.current.value = ""
      passwordRef.current.value = ""
    }
  }

  // const handleSubmit = async (eve) => {
  //   eve.preventDefault()
  //   const email = emailRef.current.value
  //   const password = passwordRef.current.value

  // let response = await axios.get("http://localhost:8800/users")
  // let resData = response.data

  // let emailFound = false
  // for (let i = 0; i < resData.length; i++) {
  //   if (email === resData[i].email) {
  //     emailFound = true
  //     if (password === resData[i].pass) {
  //       navigate("/dashboard")
  //       return
  //     } else {
  //       notifyRed("🛑 Password mismatch! Let's give it another shot.")
  //       passwordRef.current.value = ""
  //       return
  //     }
  //   }
  // }
  // if (!emailFound) {
  //   notifyRed("🕵️‍♂️ Uh-oh, we couldn't find your login details.")
  //   emailRef.current.value = ""
  //   passwordRef.current.value = ""
  // }
  // }

  useEffect(() => {
    if (decoded) {
      navigate("/dashboard")
    }
  }, [decoded, navigate])

  return (
    <>
      <main className="main">
        <div className="loginbox">
          <form
            className="form"
            //  onSubmit={handleSubmit}
          >
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
                  className={show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                  onClick={toggleButton}
                ></i>
              </span>
            </div>
            <button type="submit" className="btn" onClick={submitBtnClicked}>
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
                  alert("Login Failed")
                }}
              />
            </div>
            <div className="signUp">
              <h5>Doesn't have an account?</h5>
              <span
                onClick={() => {
                  navigate("/signup")
                }}
              >
                SignUp
              </span>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
