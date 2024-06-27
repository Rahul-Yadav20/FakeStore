import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// importing custom hook
import { useCart } from '../hooks/useCart';

// react-icons library for icons
import { FaShoppingCart } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";
import { IoIosSunny } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from 'framer-motion';

const Navbar = () => {

    // destructuring cart from useCart hook
    const { cart } = useCart();

    // darkMode variable to set dark and light mode
    const [darkMode, setDarkMode] = useState(false);

    const [toggle, setToggle] = useState(false);

    const [categories, setCategories] = useState([])


    // Toggle dark mode and update the state
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };


    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Apply or remove the dark class from the document element
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

    }, [darkMode]);


    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories", {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, [])


    return (
        <nav className="bg-gray-500 p-4 flex justify-between items-center">

            <div className='flex space-x-4 '>
                <Link to="/" className="text-2xl font-bold text-white">FakeStore</Link>
                <button
                    type="button"
                    className=''
                    onClick={() => setToggle(!toggle)}
                >
                    <div className="text-white flex items-center">
                        <div>Categories</div>
                        <div className='text-xl'>{toggle ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
                    </div>
                    <ul
                        className={`${toggle ? "" : "hidden"} absolute top-14 bg-gray-200 flex flex-col gap-2 p-2 z-50  text-lg left-28`}

                    >
                        {categories.map((category) => {
                            return (
                                <Link to={`/category/${category}`} key={category}>
                                    <li className='hover:text-white hover:bg-black'>
                                        {category.charAt().toUpperCase() + category.slice(1)}
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </button>

            </div>

            {/* Dark Mode Button */}
            <div className="flex items-center space-x-4">
                {/* On click, execute the toggleDarkMode function*/}
                <button
                    onClick={toggleDarkMode}
                    className="text-white text-2xl  rounded-md"
                >
                    {/*Setting the Light icon and Night icon based on darkMode value*/}
                    {/* Icons are coming from the react-icons library */}
                    {darkMode ? <MdNightlight className='text-black' /> : <IoIosSunny className='text-yellow-400' />}
                </button>

                {/* Redirect to /cart route after click on the Cart Icon */}
                <Link to="/cart" className="relative">
                    <FaShoppingCart className='text-white text-2xl' />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 inline-block w-4 h-4 bg-red-600 text-white text-center rounded-full text-xs">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
