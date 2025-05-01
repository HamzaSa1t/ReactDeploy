import React from "react";
import { useState, useEffect } from "react";
import { data, Link } from 'react-router-dom';
import api from "../api.js";
import "../styles/productPage.css"
import "./Structure.jsx"
import Structure from "./Structure.jsx";
import Tail from "./Tail.jsx";

function Products({ pro, onDelete }) {
    const [UserType, setUserType] = useState("");
    const [name, setName] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [description, setDescription] = useState("");
    const [number_of_ratings, setNumber_of_ratings] = useState("");
    const [picture, setPicture] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [seller, setSeller] = useState("");
    const [length, setlength] = useState("");

    useEffect(() => {
        getProducts(0);
        getUsertype();
    }, []);


 
    const getProducts = async (id) => {
        try {
            const response = await api.get("api/products/list/");
            if (response.data && response.data[id]) {
                setName(response.data[id].name);
                setCreated_at(response.data[id].created_at);
                setDescription(response.data[id].description);
                setNumber_of_ratings(response.data[id].number_of_ratings);
                setPicture(response.data[id].picture);
                setPrice(response.data[id].price);
                setRating(response.data[id].rating);
                setSeller(response.data[id].seller);
                setlength(response.data.length);



            } else {
                console.error("Product not found or data is invalid");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    }; 


    

    const getUsertype = () => {
        api
            .get("api/UserDetails/")
            .then((res) => res.data.profile_user.user_type)
            .then((user_type) => {
                setUserType(user_type)
               // console.log(user_type);
            })
            .catch((err) => alert(err));

    }



    
    const CustomerProducts = () => {
        return( 
        <div className="ProductContainer">

            <p className="product-title"> dd</p>
            {pro.picture ? <img>{pro.picture}</img> : null}
            <p> {pro.seller}</p>
            <p> {pro.price}</p>
            {pro.description ? <p>Description: {pro.description}</p> : null}
            <p>rating: {pro.rating}</p>
            <p className="product-date">created_at</p>
            
            <button className="delete-button" onClick={() => onDelete(pro.id)}>
                add to cart
            </button>             
                   </div>
        )
    }

    const EmployeeProducts = () => {
        return( 
        <div className="ProductContainer">

        <p className="product-title"> ddd</p>             
               </div>
        )
    }

    const ManagerProducts = () => {
        return (  
            <div>

            </div>
        );
    }
    


    const Product = UserType === 'Customer' ? CustomerProducts :
    UserType === 'Manager' ? ManagerProducts :
    UserType === 'Employee' ? EmployeeProducts :
    () => <p>Unknown user type.</p>; 


    
 return(
    <div>


<Structure/>

<div className="product-detail-container">
    <h2 className="product-title">Product Name: {name}</h2>
    <p className="product-price">Price: ${price}</p>
    
    {description && <p className="product-description"><strong>Description:</strong> {description}</p>}

    <p className="product-rating">
        <strong>Rating:</strong> {rating} / 5, rated by {number_of_ratings} customers
    </p>

    <p className="product-seller">
        <strong>Seller:</strong> {seller}
    </p>

    {picture && <img className="product-image" src={picture} alt="product" />}

    <p className="product-created-at">
        <strong>Created At:</strong> {created_at}
    </p>

    <div>

        <button></button>



    </div>
</div>




<Tail/>

    </div>

 )


    

};

export default Products
