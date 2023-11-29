import React, { useState } from "react";

import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { IoLogoGithub } from "@react-icons/all-files/io/IoLogoGithub";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";

const Home = () => {
  const baseUrl = "http://localhost:5000/users";

  // const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  let currentUser = "";
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (loggedInUser) {
    currentUser = loggedInUser.user.email;
  }
  const fetchData = async () => {
    const res = await axios.get(baseUrl);
    let newData = res.data.filter((user) => user.email !== currentUser);
    setFilteredData(newData);
    return res.data;
  };
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.username.slice(1).toLowerCase().includes(input.toLowerCase(0))
    );
    setFilteredData(filtered);
  };
  const handleItemClick = (item) => {
    setSelectedUser(item);
  };

  return (
    <>
      <Navbar />
      <section className="w-full flex gap-4 justify-evenly">
        <main className="flex flex-1 w-full max-w-md h-full justify-center px-2 py-4 bg-white dark:bg-slate-900">
          <div className="w-full max-w-sm rounded-md border border-gray-300 dark:border-gray-500 shadow-md px-2 py-2 flex flex-col gap-4 h-fit bg-white text-black dark:bg-slate-900 dark:text-white">
            {darkMode ? (
              <SunIcon
                className="h-4 w-4 cursor-pointer hover:scale-125 transition-transform duration-150 ease-in-out ml-auto"
                onClick={handleToggleTheme}
              />
            ) : (
              <MoonIcon
                className="h-4 w-4 cursor-pointer hover:scale-125 transition-transform duration-150 ease-in-out ml-auto"
                onClick={handleToggleTheme}
              />
            )}
            <div className="flex border relative h-8 rounded-md items-center px-1">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              <input
                className="h-full w-full rounded-md outline-none focus:outline-none px-1 dark:bg-transparent"
                placeholder="Search accounts"
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleSearch}
              />
            </div>
            {isLoading && "Loading...."}
            {isError
              ? "Something went wrong"
              : filteredData.map((user, index) => (
                  <div
                    className="flex gap-2 items-center w-full flex-row   drop-shadow-xl  rounded-md p-2 hover:ring-1 hover:cursor-pointer"
                    key={index}
                    onClick={() => handleItemClick(user)}
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        className="h-12 w-12 rounded-full p-0.5 border object-cover user-avatar"
                        alt={user.username}
                      />
                      <div
                        className={`absolute h-2 w-2 rounded-full bottom-1 right-1 ${
                          user.loggedin ? "bg-green-600" : "bg-transparent"
                        }`}
                      ></div>
                    </div>
                    <div className="flex flex-col">
                      <h4 className=" font-semibold text-sm">
                        {user.username.slice(1)}
                      </h4>
                      <a
                        href={`#`}
                        className="text-gray-400 dark:text-gray-300 text-xs dark:hover:text-sky-500 hover:text-sky-500 transition-colors duration-75 ease-out"
                      >
                        {user.email}
                      </a>
                    </div>
                  </div>
                ))}
          </div>
        </main>
        {selectedUser && (
          <div className="flex-1   max-w-md  pt-4 border mt-4 rounded-md flex flex-col">
            <div className="msg-header w-full h-12 flex items-center px-1 border-b justify-between">
              <div className="flex items-center gap-1">
                <img
                  src={selectedUser.avatar}
                  className="h-9 w-9 rounded-full p-0.5 border mx-auto object-cover user-avatar"
                />
                <h4 className=" text-sm font-semibold">
                  {selectedUser.username.slice(1)}
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <IoLogoGithub className="h-5 w-5 cursor-pointer" />
                <FaLinkedin className="h-5 w-5 cursor-pointer hover:text-sky-500" />
                <FaTwitter className="h-5 w-5 cursor-pointer hover:text-sky-500" />
              </div>
            </div>
            {/* end of header */}
            <div className="flex flex-1 justify-between flex-col  w-full  relative">
              <div className="flex-1 bg-green-500 max-h-full overflow-y-scroll px-1">
                msg area
              </div>
              <div className="flex gap-1  border w-full h-20 px-1 items-center">
                <textarea
                  type="text"
                  className=" outline-none focus:outline-none w-full max-w-md whitespace-pre"
                  placeholder="type your message & hit send"
                ></textarea>
                <PaperAirplaneIcon className="h-6 w-6 text-sky-500 cursor-pointer hover:scale-110 transition-transform duration-100 ease-in-out" />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;

// {selectedUser && (
//   <div className="fixed z-50 right-20 bg-white h-48 w-48 p-2 flex flex-col justify-center border shadow-lg top-[50%] translate-y-[-50%] rounded-md  dark:text-white">
//     <img
//       src={selectedUser.avatar}
//       className="h-16 w-16 rounded-full p-0.5 border mx-auto object-cover user-avatar"
//     />
//     <div className="flex justify-center items-center gap-1">
//       <div
//         className={`h-0.5 w-1.5 rounded-full  ${
//           selectedUser.loggedin ? "bg-green-600" : "bg-transparent"
//         }`}
//       ></div>
//       <h4 className=" text-sm font-semibold">{selectedUser.name}</h4>
//     </div>
//     <p className="text-xs text-center">{selectedUser.tagline}</p>
//     <div className="h-0.5 w-[60%] dark:bg-gray-400 bg-gray-300 rounded-md mx-auto my-3"></div>
//     <div className="flex justify-center gap-3">
//       <a href={`mailto:${selectedUser.email}`}>
//         <EnvelopeIcon className="h-5 w-5 cursor-pointer" />
//       </a>
//       <IoLogoGithub className="h-5 w-5 cursor-pointer" />
//       <FaLinkedin className="h-5 w-5 cursor-pointer hover:text-sky-500" />
//       <FaTwitter className="h-5 w-5 cursor-pointer hover:text-sky-500" />
//     </div>
//   </div>
// )}
