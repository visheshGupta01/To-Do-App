import React, { useState } from "react";
// import {Redirect} from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FormRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function apiNewUser() {
    const url = "https://6662cf3862966e20ef0a1975.mockapi.io/api/vi/users";

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify({
        emailID: email,
        tasks: {},
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        apiNewUser();
        navigate("/");
        setEmail("");
        setPassword("");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use...");
        } else if(errorCode === "auth/invalid-email") {
          alert("Invalid Email...");
        }else if(errorCode === "auth/weak-password"){
          alert("Password should be at least 6 characters...");
        }


      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
      <div className="first-letter:xl:max-w-3xl bg-white w-[150vh] p-5 sm:p-10 rounded-md">
        <h1 className="text-center text-xl sm:text-3xl font-semibold text-black">
          Register
        </h1>
        <div className="w-full mt-8">
          <form className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <input
              className="w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline bg-gray-100 text-black focus:border-black"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              placeholder="Enter your email"
            />
            <input
              className="w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline bg-gray-100 text-black focus:border-black"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              placeholder="Password"
            />
            <button
              onClick={onSubmit}
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Register</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-700 font-semibold">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormRegistration;
