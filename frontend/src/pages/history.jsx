import { useEffect, useState } from "react";
import api from "../api";
import React from "react";
import '../styles/basket.css';
import Structure from "../components/Structure";
import Tail from "../components/Tail";
function History() {
const [products, setProducts] = useState([]); 
const [length, setLength] = useState(""); 
       useEffect(() => {
        ShowHistory(); 
       }, []);

const ShowHistory = async () => {

    try {
        const response = await api.get("api/customers/history/")
        if (response.data && (response.status === 200 || response.status === 201)) {
         //   console.log("History:", response.data);
            setProducts(response.data); 
          //  console.log("info:", response.data);
            setLength(response.data.length);
        } else {
        //    console.log("Failed to get user info", response.status);
            alert("Failed to get user info.");
        }
    }
    catch (err) {
        console.log("Error during fetching user info:", err);
        if (err.response) {
            console.log("Response error data:", err.response);
          //  console.log("Response status:", err.response.status);
         //   console.log("Response headers:", err.response.headers);
        }
        if (err.request) {
            console.log("Request error:", err.request);
        }
        alert("Error occurred during fetching user info.");
    }
}

    

return (
    <div className="basket-page">
        <Structure />
        <h1 className="basket-header" style={{paddingLeft:'13px'}}>Your History</h1>
        {products.length > 0 ? (
            <div>
                {products.map((product, index) => (
                    <div key={index} className="product-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft:'13px'}}>
                        <div>
                        <h3>{product.product_name}</h3>
                        <p>seller: {product.product_seller}</p>
                        <p>Price: {product.product_price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <h1></h1>
                        <h3>Total:  {product.product_price * product.quantity} </h3>
                        </div> 
                        {product.picture && (
                                <img 
                                    src={product.picture} 
                                    alt={product.name} 
                                    className="product-image" 
                                    style={{ width: '130px', height: '130px', marginLeft: '20px', objectFit: 'cover' }} 
                                />                                                   

                            )}
                    </div>
                ))}
            </div>
        ) : (
            <p>No products found in your history.</p>
        )}
                                    <Tail/>
    </div>
);
     
     
     }
     
     export default History