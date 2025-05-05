import { useState, useEffect } from "react";
import api from "../api";
import "../styles/home.css"
import "../components/Structure.jsx"
import Structure from "../components/Structure.jsx";
import { useParams, useLocation } from 'react-router-dom';
import DigitalClock from "../components/DigitalClock.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import "../components/Structure.jsx"
import Tail from "../components/Tail.jsx";

function EditProduct() {

    const { pk } = useParams(); 
    const location = useLocation();
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [number_of_ratings, setNumber_of_ratings] = useState("");
        const [picture, setPicture] = useState("");
        const [price, setPrice] = useState("");
        const [rating, setRating] = useState("");
        const [seller, setSeller] = useState("");
        const [createdAt, setCreatedAt] = useState(''); 
        const [username, setUsername] = useState('');
        const [loading, setLoading] = useState(false);
        
        
           const [ProductNameError, setProductNameError] = useState('');
            const [PriceError, setPriceError] = useState('');
            const [DescriptionError, setDescriptionError] = useState('');
            const [PictureError, setPictureError] = useState('');
            const [errorMessage, setErrorMessage] = useState('');
            const [successMessage, setSuccessMessage] = useState(''); 
            

    useEffect(() => {
        getProducts(pk);
    }, []);
//?

    const removePicture = () => {
        setPicture(null);
    };


    const Edit = async (productData, file) => {
        try {
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("price", productData.price);
            formData.append("description", productData.description);
            formData.append("rating", productData.rating);
            formData.append("picture", file); 

            const response = await api.patch(`api/products/update/${productData.id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Product updated successfully");
                setSuccessMessage("Product updated successfully!");
            } else {
            //    console.log("Failed to update product:", response.status);
                alert("Failed to update product.");
            }
        } catch (err) {
            console.log("Error during product update:", err);
            if (err.response) {
          //      console.log("Response error data:", err.response.data);
           //     console.log("Response status:", err.response.status);
           //     console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during product update.");
        }
    };


    const getProducts = async (pk) => {
        try {
            const response = await api.get(`api/products/${pk}/`);

            if (response.data) {
                setName(response.data.name);
                setCreatedAt(response.data.created_at);
                setDescription(response.data.description); 
                setPicture(response.data.picture);
                setPrice(response.data.price);
                setSeller(response.data.seller);

            } else {
                console.error("Products not found or data is invalid");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
   
    return(
    <div>

    <Structure />
    
    <div>

    <form onSubmit={(e) => {
        e.preventDefault();
        Edit({ name, price, description, rating, id: pk }, picture);
    }} className="form-container" encType="multipart/form-data">
                <h1>Edit product</h1>
                <hr style={{ border: '1px solid #ccc', width: '100%' }} />

                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                    placeholder="Product price"
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

                {picture && (
                        <div>
                            {typeof picture === 'string' ? (
                                <a href={picture} target="_blank" rel="noopener noreferrer" style={{color: 'black'}}>
                                    View Picture
                                </a>
                            ) : (
                                <p>{picture.name}</p>
                            )}
                            <button type="button" onClick={removePicture} style={{marginLeft:'5px'}}> X</button>
                        </div>
                    )}

                <input
                    className="form-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPicture(e.target.files[0])}
                    placeholder="Product Picture"
                />
                {PictureError && <p style={{ color: "red" }}>{PictureError}</p>}

                <h2>Seller: {seller}</h2>
                <h2>Created at: {createdAt.split('T')[0]}</h2>

                <button className="form-button" type="submit">Update</button>
                {successMessage && <h5 style={{ color: 'green' }}>{successMessage}</h5>} 
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            </form>
    </div>
    <Tail/>
    </div>

    )
     
     
     }
     
     export default EditProduct