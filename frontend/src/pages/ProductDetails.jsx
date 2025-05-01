import React from "react";
import { useState, useEffect } from "react";
import { data, Link } from 'react-router-dom';
import api from "../api.js";
import "../styles/productPage.css"
import Structure from "../components/Structure.jsx";
import { useParams } from 'react-router-dom';
/**
        id 
        name 
        seller 
        created_at 
        price 
        description 
        picture ****
        rating 
        number_of_ratings 
        new_rating 
        quantity_sold
        Comment 
 */

function ProductDetails({ pro, onDelete }) {
    const { pk } = useParams(); 
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
    const [quantity_sold, setQuantity_sold] = useState("");
    const [id, setId] = useState("");
    const [new_rating, setNew_rating] = useState("");
    const [Comments, setComments] = useState([]);


    useEffect(() => {
        getProducts(pk);
      //  getUsertype();
      getComments(pk);
      
    }, []);

    const getProducts = async (pk) => {
        try {
            const response = await api.get(`api/products/${pk}/`);
            if (response.data) {
                setName(response.data.name);
                setCreated_at(response.data.created_at);
                setDescription(response.data.description);
                setNumber_of_ratings(response.data.number_of_ratings);
                setPicture(response.data.picture);
                setPrice(response.data.price);
                setRating(response.data.rating);
                setSeller(response.data.seller);
                setlength(response.data.length);
            //    console.log("info::", response.data);
            } else {
                console.error("Product not found or data is invalid");
            }
        } catch (error) {
            console.error('Error fetching data:', error);    
        }
    };

    const getComments = async (pk) => {
        try {
            const response = await api.get(`api/products/${pk}/comments/`);
            if (response.data) {
                setComments(response.data);
       //         console.log("info::", response.data);

            } else {
                console.error("Product not found or data is invalid");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    }

    const getUsertype = () => {
        api
            .get("api/UserDetails/")
            .then((res) => res.data.profile_user.user_type)
            .then((user_type) => {
                setUserType(user_type)
          //      console.log(user_type);
            })
            .catch((err) => alert(err));

    }
 
 return(
<h1> d</h1>
 );

};

export default ProductDetails


