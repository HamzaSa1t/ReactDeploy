import { useEffect, useState } from "react";
import api from "../api";
import React from "react";
import '../styles/basket.css';
import Structure from "../components/Structure";
import Tail from "../components/Tail";

function EmployeeHistory() {
    const [products, setProducts] = useState([]); 
    const [length, setLength] = useState("");
    const [UserType, setUserType] = useState("");

    useEffect(() => {
        ManagerShowHistory();
    }, []);

    const ManagerShowHistory = async () => {
        try {
            const ManagerResponse = await api.get("api/managers/history/")
            if (ManagerResponse.data && (ManagerResponse.status === 200 || ManagerResponse.status === 201)) {
                setProducts(ManagerResponse.data); 
         //       console.log("info:", ManagerResponse.data);
            //    setLength(ManagerResponse.data.length); 
            } else {
                console.log("Failed to get user info", ManagerResponse.status);
            }
        }
        catch (err) {
            console.log("Error during fetching user info:", err);
            if (err.ManagerResponse) {
            //    console.log("Response error data:", err.ManagerResponse.data);
             //   console.log("Response status:", err.ManagerResponse.status);
             //   console.log("Response headers:", err.ManagerResponse.headers);
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
            <h1 className="basket-header" style={{ marginLeft:'13px', marginRight:'13px'}}>Your History</h1>
            {products.length > 0 ? (
                <div>
                    {products.map((product, index) => (
                        <div key={index} className="product-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft:'13px', marginRight:'13px' }}>
                            <div>
                                <h3>{product.product_name}</h3>
                                <p><strong>Price: {product.product_price}</strong></p>
                                <p><strong>Quantity: {product.quantity}</strong></p>
                                <br></br>
                                <h3>Total: {product.product_price * product.quantity}</h3>
                            </div>
                            {product.picture && (
                                <img 
                                    src={product.picture} 
                                    alt={product.name} 
                                    className="product-image" 
                                    style={{ width: '120px', height: '120px', marginLeft: '20px', objectFit: 'cover' }}
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

export default EmployeeHistory;