import { useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearAuth } from '../../features/authSlice';

function Nav() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.nav-bar');
      if (window.scrollY > 0) {
        nav.classList.add('shadow-md');
      } else {
        nav.classList.remove('shadow-md');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get('http://localhost:4000/api/auth/logout', { withCredentials: true });
      dispatch(clearAuth());
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      if (error.response?.status === 401) {
        alert("You are already logged out or unauthorized.");
        dispatch(clearAuth());
      } else {
        alert(error.response?.data?.message || "Logout failed! Please try again.");
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase();
  };

  return (
    <nav className="nav-bar w-full h-18 bg-gray-900 text-white font-bold px-6 py-4 flex justify-between items-center transition-shadow duration-300">
      
      <div className="flex items-center gap-4">
        <img src="logo1.png" alt="Logo" className="h-[4vw] w-[4vw]" />
        <h1 className="text-gray-400 text-[2vw]">v1</h1>
      </div>

      <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 w-1/3">
        <input
          type="text"
          placeholder="Search your books..."
          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
        />
        <IoSearch className="text-gray-400 text-xl" />
      </div>

      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[1.6vw] transition ${isActive ? 'text-green-400' : 'text-gray-300'}`
              }
            >
              Home
            </NavLink>
          </li>

          {user?.role === 'seller' || user?.role === 'admin' ? (
            <li>
              <NavLink
                to="/uploadBook"
                className={({ isActive }) =>
                  `text-[1.6vw] transition ${isActive ? 'text-green-400' : 'text-gray-300'}`
                }
              >
                Upload Book
              </NavLink>
            </li>
          ) : null}

          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 text-[1.6vw] hover:text-red-600 transition"
              >
                Log out
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-[1.6vw] transition hover:text-blue-600 ${
                    isActive ? 'text-green-400' : 'text-gray-300'
                  }`
                }
              >
                Log in
              </NavLink>
            )}
          </li>
        </ul>

        {user && (
          <NavLink to="/profile" className="flex items-center gap-2 group">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-400 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-semibold border-2 border-green-400">
                {getInitials(user.name)}
              </div>
            )}
            <span className="hidden md:block text-[1vw] text-gray-300 group-hover:text-white transition">
              {user.name}
            </span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Nav;
