import React from 'react';
import { useState, useEffect } from "react";
import "../styles/Structure.css"; // Assuming you have a CSS file for styling
import api from "../api";
import { Link } from 'react-router-dom';
import LoadingIndicator from "./LoadingIndicator";
import DigitalClock from "./DigitalClock";

const AddProduct = () => {

    const [name, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, serUsername] = useState("");

    const [ProductNameError, setProductNameError] = useState("");
    const [PriceError, setPriceError] = useState("");
    const [DescriptionError, setDescriptionError] = useState("");
    const [PictureError, setPictureError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

     useEffect(() => {
        getUsername();
    }, []);


    
    const getUsername = async () => {
        api
            .get("api/UserDetails/")
            .then((res) => res.data.username)
            .then((username) => {
                serUsername(username);
                console.log(username);
            })
            .catch((err) => alert(err));

    }
    const AddProd = async (e) => {

        e.preventDefault();
        api
            .post("/api/products/create/", { name, price, description, picture, created_at })
            .then((res) => {
                if (res.status === 201) alert("product created!");
                else alert("Failed to make product.",  res.status);
            })
            .catch((err) => alert(err));
// "name", "seller", "created_at", "price", "description", "picture"
    };


        
  return (
    <div>
        <form onSubmit={AddProd} className="form-container"> 
            <h1>Add product</h1>

            <input

                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="product name"
                required 
            />
            {ProductNameError && <p style={{ color:"red"}}>{ProductNameError}</p>}

            <input 
             className="form-input"
             required
             type="number"
             min="0"
             step="0,01"             value={price}
             onChange={(e) => setPrice(e.target.value)}
             placeholder="product price"
         />
         {PriceError && <p style={{ color:"red"}}>{PriceError}</p>}

         <input 
             className="form-input"
             type="text"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             placeholder="product description"
         />
         {DescriptionError && <p style={{ color:"red"}}>{DescriptionError}</p>}

         <input 
             className="form-input"
             type="file"
             accept="image/*" 
             value={picture}
             onChange={(e) => setPicture(e.target.value)}
             placeholder="product Picture"
         />
         {PictureError && <p style={{ color:"red"}}>{PictureError}</p>}
         <h5>seller:  {username} </h5>
         <h5> created at: <DigitalClock /></h5> 

        
       
         {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Add
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>




    </div>
  );
};

export default AddProduct;


/*

*: name, seller, created_at, price.

-: description, picture.





*/