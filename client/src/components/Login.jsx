import React, { useState, useEffect } from "react";
import axios from "axios";
import loadingSvg from "../assets/loading.svg";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGoogleLogin } from "@react-oauth/google";

import Google from "../assets/google.svg";
import { signInWithGooglePopup } from "../utils/firebase.utils";

const Login = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:5000/users";

  const handleinputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = JSON.stringify(inputs);
      const response = await axios.post(`${baseUrl}/sign-in`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === true) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        setError(response.data.message);
        // setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
  const responseMessage = async (response) => {
    console.log(response.credential);
    let token = response.credential;
    console.log(response);
    // let user = response.cred
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const data = res.data;
    console.log(data);
  };

  const findEmail = async (email) => {
    const apiUrl = "http://localhost:5000/users/auth";

    try {
      const response = await axios.post(
        apiUrl,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the server responds with JSON data
      if (response.data.status === true) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        console.log(email, "backend issue");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await signInWithGooglePopup();
      const { email } = res.user;
      console.log(res.user);
      await findEmail(email);
    } catch (err) {
      setError(err.message);
    }
  };
  // useEffect(() => {
  //   if (user.length > 0) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         const { email } = res.data;
  //         findEmail(email);
  //       })
  //       .catch((err) => console.log("err is", err.message));
  //   }
  // }, [user]);

  return (
    <div className="h-screen w-full flex justify-center ">
      <div
        className="my-10 w-full max-w-xs py-10 flex flex-col
       gap-6  shadow-md rounded-md border px-2"
      >
        <div>
          <h4 className="text-2xl font-extrabold text-center">
            Instant
            <span className="text-sky-500 text-sm font-bold ">Chat</span>
          </h4>
          <p className="text-center font-semibold">with</p>
          <h4 className="text-2xl font-extrabold text-center first-letter:text-blue-500">
            Professionals
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="h-8 w-full border outline-none 
          focus:outline-none rounded-sm px-1"
            placeholder="username"
            name="username"
            onChange={handleinputChange}
          />
          <input
            type="password"
            className="h-8 w-full border outline-none 
          focus:outline-none rounded-sm px-1"
            placeholder="password"
            name="password"
            onChange={handleinputChange}
          />
          {error && (
            <div className="h-6 rounded-sm w-full bg-gray-300 flex gap-2 items-center px-2">
              <ExclamationTriangleIcon className="h-6 w-5 text-red-500" />
              <h4 className="text-red-500 text-xs font-semibold">{error}</h4>
            </div>
          )}
          <button
            className={`px-4 py-2 rounded-md border-none bg-sky-500 text-white font-bold hover:ring-1
           ring-sky-600   flex justify-center disabled:ring-0 ${
             loading && "bg-gray-400"
           }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <img src={loadingSvg} className="h-6 w-6 object-cover" />
            ) : (
              "Login"
            )}
          </button>
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-0.5 bg-gray-300"></div>
            <div className="">or</div>
            <div className="flex-1 h-0.5 bg-gray-300"></div>
          </div>
          <div className="w-full flex justify-center ">
            <button
              className="px-1 py-2  border flex w-full justify-center items-center gap-2 rounded-md hover:ring-1"
              onClick={handleLogin}
            >
              <img src={Google} className="h-6 w-6" />
              <h4 className="font-semibold text-sm">Continue with Google</h4>
            </button>
          </div>
          <a className="text-center mt-3 text-sm text-blue-600 hover:text-sky-500 cursor-pointer">
            forgotten password ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
