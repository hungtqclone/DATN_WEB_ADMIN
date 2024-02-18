import React, { useState } from 'react';
import { FaTh, FaUserAlt, FaRegChartBar, FaShoppingBag, FaThList, FaCommentAlt, FaBars, FaUsers,FaChartBar } from "react-icons/fa";
import './css/Sidebar.css'
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/user",
            name: "List Users",
            icon: <FaUsers />
        },
        // {
        //     path: "/analytics",
        //     name: "Analytics",
        //     icon: <FaRegChartBar />
        // },
        {
            path: "/chart",
            name: "Chart",
            icon: <FaChartBar />
        },
        {
            path: "/product",
            name: "Product",
            icon: <FaShoppingBag />
        },
        {
            path: "/productList",
            name: "Product List",
            icon: <FaThList />
        },
        {
            path: "/about",
            name: "About",
            icon: <FaUserAlt />
        },
    ]
    return (
        <div className='a'>
            <div style={{ width: isOpen ? "250px" : "50px" }} className='sidebar fixed-top'>
                <div className='top_section'>
                    <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Logo</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;