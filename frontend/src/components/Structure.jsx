import React from 'react';
import { useState, useEffect } from "react";
import "../styles/Structure.css";
import api from "../api";
import { useNavigate } from 'react-router-dom'; 

const Structure = () => {
    const [UserType, setUserType] = useState("");
    const [pk, setPk] = useState("");
    const navigate = useNavigate(); 

    const CustomerList = () => [
        { name: "Home", path: "/" },
        { name: 'Cart', path: pk ? `/basket/${pk}` : `/notFound` },
        { name: 'Charge', path: "/charge" },
        { name: 'History', path: "/history" },
        { name: 'Log out', path: "/logout" },
    ];

    const ManagerList = [{ name: 'Home', path: '/' }, { name: 'add product', path: '/addproduct' }, { name: "dashboard", path: "/dashboard" }, { name: 'Profit', path: '/profit' }, { name: 'History', path: '/employeeHistory' }, { name: 'Log out', path: '/logout' }];
    const EmployeeList = [{ name: 'Home', path: '/' }, { name: 'Profit', path: "/profit" }, { name: 'History', path: "/employeeHistory" }, { name: 'add product', path: '/addproduct' }, , { name: 'Log out', path: "/logout" }];

    useEffect(() => {
        getUsername();
    }, []);

    const getUsername = () => {
        api
            .get("api/UserDetails/")
            .then((res) => {
                setUserType(res.data.profile_user.user_type);
                setPk(res.data.id);
            })
            .catch((err) => alert(err));
    };

    const handleNavigation = (path) => {
        navigate(path); 
    };

    const CustomerHeader = () => {
        return (
            <div style={{ marginBottom: '30px' }}>
                <header className="header">
                    <h1>Amazoo</h1>
                    <p className="tagline">We sell products you love!</p>
                    <div className="button-list"> 
                        {CustomerList().map((item, index) => (
                            <button
                                key={index}
                                className="header-button" 
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </header>
            </div>
        );
    };

    const ManagerHeader = () => {
        return (
            <div>
                <header className="header">
                    <h1>Amazoo</h1>
                    <p className="tagline">We sell products you love!</p>
                    <div className="button-list">
                        {ManagerList.map((item, index) => (
                            <button
                                key={index}
                                className="header-button"
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </header>
            </div>
        );
    };

    const EmployeeHeader = () => {
        return (
            <div>
                <header className="header">
                    <h1>Amazoo</h1>
                    <p className="tagline">We sell products you love!</p>
                    <div className="button-list">
                        {EmployeeList.map((item, index) => (
                            <button
                                key={index}
                                className="header-button"
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </header>
            </div>
        );
    };

    const GuestHeader = () => {
        return (
            <div>
                <header className="header">
                    <h1>Amazoo</h1>
                    <p className="tagline">We sell products you love!</p>
                </header>
            </div>
        );
    };

    const HeaderComponent = UserType === 'Customer' ? CustomerHeader :
        UserType === 'Manager' ? ManagerHeader :
        UserType === 'Employee' ? EmployeeHeader :
        UserType === null ? GuestHeader :
        () => null;

    return (
        <div>
            {UserType !== undefined && <HeaderComponent />}
        </div>
    );
};

export default Structure;