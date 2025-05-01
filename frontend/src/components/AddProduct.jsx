import React, { useState, useEffect } from 'react';
import api from "../api";
import { Link } from 'react-router-dom';
import LoadingIndicator from "./LoadingIndicator";
import DigitalClock from "./DigitalClock";
import Structure from './Structure';
import Tail from './Tail';

const AddProduct = () => {
    const [name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(false);  
    const [username, setUsername] = useState('');
    const [createdAt, setCreatedAt] = useState(''); 
    const [ProductNameError, setProductNameError] = useState('');
    const [PriceError, setPriceError] = useState('');
    const [DescriptionError, setDescriptionError] = useState('');
    const [PictureError, setPictureError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    useEffect(() => {
        getUsername();
    }, []);

    const getUsername = async () => {
        api.get("api/UserDetails/")
            .then((res) => res.data.username)
            .then((username) => {
                setUsername(username);
              //  console.log(username);
            })
            .catch((err) => alert(err));
    };

    const Add = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setProductNameError("You need to enter a product name");
            return; 
        } else {
            setProductNameError(""); 
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('created_at', createdAt);
    
        if (picture instanceof File) {
            formData.append('picture', picture);
        }
    
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await api.post(
                "/api/products/create/",
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
    
            if (response.status === 201) {
                setSuccessMessage("Product successfully created!");
                setProductName('');
                setPrice('');
                setDescription('');
                setPicture(null); 
                setCreatedAt('');
            } else {
                alert("Failed to make product.");
            }
        } catch (err) {
            console.log("Error during product creation:", err);
            if (err.response) {
         //       console.log("Response error data:", err.response.data);
          //      console.log("Response status:", err.response.status);
          //      console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during product creation.");
        }
    };
    

    const handleTimeChange = (time) => {
        setCreatedAt(time); 
    };

    return (
        <div>
            <div>
                <Structure/>
            </div>
            <form onSubmit={Add} className="form-container" encType="multipart/form-data">
                <h1>Add product</h1>

                <input
                    className="form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product name**"
                    required
                />
                {ProductNameError && <p style={{ color: "red" }}>{ProductNameError}</p>}

                <input
                    className="form-input"
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyPress={(e) => {
                        if (!/[0-9.]/.test(e.key)) {
                            e.preventDefault(); 
                        }
                    }}
                    placeholder="Product price**"
                />
                {PriceError && <p style={{ color: "red" }}>{PriceError}</p>}

                <input
                    className="form-input"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product description"
                />
                {DescriptionError && <p style={{ color: "red" }}>{DescriptionError}</p>}
<br></br>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input
                        className="form-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const validImageTypes = ['image/jpeg', 'image/png'];
                                if (!validImageTypes.includes(file.type)) {
                                    setPictureError("Invalid image type. Please upload a JPEG, PNG.");
                                    setPicture(null); 
                                } else {
                                    setPictureError(""); 
                                    setPicture(file); 
                                }
                            } else {
                                setPictureError("");
                            }
                        }}
                        style={{
                            opacity: 0,
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                        }}
                    />
                    <button
                        type="button"
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                    >
                        Add Product Image
                    </button>
                </div>
                {picture && <p style={{ marginTop: '10px', fontSize: '14px', color: '#333' }}>Selected Picture: {picture.name}</p>}
                {PictureError && <p style={{ color: "red" }}>{PictureError}</p>}

                <h2>Seller: {username}</h2>
                <h2>Created at:<DigitalClock onTimeChange={handleTimeChange} /></h2>

                {loading && <LoadingIndicator />}
                <button 
                    className="form-button" 
                    type="submit" 
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'} 
                >
                    Add
                </button>
                {successMessage && <h5 style={{ color: 'green' }}>{successMessage}</h5>}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
            <Tail/>
        </div>
    );
};

export default AddProduct;


