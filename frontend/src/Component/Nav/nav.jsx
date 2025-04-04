import React, { useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Nav() {
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

    return (
        <nav className="nav-bar fixed w-full z-50 font-semibold bg-gray-900 text-white font-bold px-6 py-4 flex justify-between items-center transition-shadow duration-300">
            
            <div className="flex items-center gap-4">
                <img src="logo1.png" alt="Logo" className="h-[4vw] w-[4vw] " />
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

            <ul className="flex items-center gap-6">
                <li>
                    <Link to="/" className="text-gray-300 text-[1.6vw] hover:text-green-400 transition">Home</Link>
                </li>
                <li>
                    <Link to="/Contact" className="text-gray-300 text-[1.6vw] hover:text-green-400 transition">Contact</Link>
                </li>
                <li>
                    <Link to="/About" className="text-gray-300 text-[1.6vw] hover:text-green-400 transition">About us</Link>
                </li>
                <li>
                    <Link to="/login" className="text-gray-300 text-[1.6vw] hover:text-green-400 transition ">Log in</Link>
                </li>
                <li>
                    <Link to="/uploadBook" className="text-gray-300 text-[1.6vw] hover:text-green-400 transition">Upload Book</Link>
                </li>
            </ul>

        </nav>
    );
}

export default Nav;
