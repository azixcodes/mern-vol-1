import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
const App = () => {
  const baseUrl = "http://localhost:5000/users";

  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(baseUrl);
      setData(res.data);
      setFilteredData(res.data);
    };

    fetchData();
  }, []);
  const handleToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.username.slice(1).toLowerCase().includes(input.toLowerCase(0))
    );
    setFilteredData(filtered);
  };
  console.log(data);
  return (
    <main className="flex w-full h-screen justify-center px-2 py-4 bg-white dark:bg-slate-900">
      <div className="w-full max-w-sm rounded-md border border-gray-300 dark:border-gray-500 shadow-md px-2 py-2 flex flex-col gap-4 h-fit bg-white text-black dark:bg-slate-900 dark:text-white">
        <button className="px-3 py-1 border" onClick={handleToggleTheme}>
          Toggle theme
        </button>
        <div className="flex border relative h-8 rounded-md items-center">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            className="h-full w-full rounded-md outline-none focus:outline-none px-1"
            placeholder="Search accounts"
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
        {filteredData.map((user, index) => (
          <div
            className="flex gap-2 items-center w-full flex-row max-wxs shadow-lg border dark:border-gray-500 border-gray-300 rounded-md p-2 "
            key={index}
          >
            <img
              src={user.avatar}
              className="h-12 w-12 rounded-full p-0.5 border object-cover user-avatar"
              alt={user.username}
            />
            <div className="flex flex-col">
              <h4 className=" font-semibold text-sm">{user.username}</h4>
              <a
                href={`mailto:${user.email}`}
                className="text-gray-400 dark:text-gray-300 text-xs dark:hover:text-sky-500 hover:text-sky-500 transition-colors duration-75 ease-out"
              >
                {user.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
