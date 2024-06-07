import React, {useState} from "react";
import {  signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebaseconfig';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              navigate("/")
              setEmail("")
              setPassword("")
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === "auth/email-already-in-use") {
                alert("Email already in use...");
              }
              else if(errorCode === "auth/invalid-email") {
                alert("Invalid Email...");
              }else if(errorCode === "auth/invalid-credential") {
                alert("Invalid Credentials...");
              }

          });
    
     
      }

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </div>
          <div className="mt-8">
            <button  onClick={onSubmit} type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
              Login
            </button>
          </div>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <Link to="/signup">
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
