import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sticky top-0 h-14 border-b w-full flex   items-center flex-col bg-white">
      <nav className="h-14 w-full flex justify-end px-2 items-center relative z-50">
        {user ? (
          <img
            src={user && user.user.avatar}
            className="h-8 w-8 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <button
            className="px-3 py-1 rounded-md border-none bg-sky-500 font-semibold hover:ring-1 text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </nav>
      {/* <img src={image} className="h-full w-full absolute object-cover" /> */}
    </div>
  );
};

export default Navbar;
