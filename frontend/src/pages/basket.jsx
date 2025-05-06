import { useEffect, useState } from "react";
import api from "../api";
import React from "react";
import '../styles/basket.css'; 
import Structure from "../components/Structure";
import axios from 'axios';
import { getCookie } from '../utils/getCookie'; 
import EmailForm from "../components/EmailForm";
import { useParams } from 'react-router-dom';
import Tail from "../components/Tail.jsx";

function Basket() {
    const { pk } = useParams(); 
    const [productsList, setProductsList] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [charge, setCharge] = useState(0);
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(""); 
    
    useEffect(() => {
        getProducts();
        CalculateCharge();
        ShowBalance();
    }, []);

    const ShowBalance = async () => {
        try {
            const response = await api.get("api/balance/")
            if (response.data && (response.status === 200 || response.status === 201)) {
        //        console.log("Charge:", response.data.balance);
                setAmount(response.data.balance);

            } else {
         //       console.log("Failed to get user info", response.status);
                alert("Failed to get user info.");
            }
        }catch (err) {
            console.log("Error during fetching user info:", err);
            if (err.response) {
      //          console.log("Response error data:", err.response.data);
        //        console.log("Response status:", err.response.status);
          //      console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during fetching user info.");
        }
    };

    const getProducts = async () => {
        try {
            const response = await api.get("api/chart/show/");
            if (response.data && (response.status === 200 || response.status === 201)) {
                setProductsList(response.data);

                const quantityArray = response.data.map(product => ({
                    id: product.id,
                    quantity: product.quantity,
                }));
                setQuantity(quantityArray);
          //      console.log("Quantity array:", quantityArray);
            } else {
        //        console.log("Failed to get user info", response.status);
                alert("Failed to get user info.");
            }
        } catch (err) {
            console.log("Error during fetching user info:", err);
            if (err.response) {
            //    console.log("Response error data:", err.response.data);
            //    console.log("Response status:", err.response.status);
            //    console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during fetching user info.");
        }
    };

    const clearBasket = async () => {
        try { 
            const response = await api.delete("api/chart/clear/");
            if (response.status === 204 || response.status === 200 || response.status === 202) {
                console.log("Basket cleared.");
                setProductsList([]);
                setQuantity([]);
                CalculateCharge();
            } else {
          //      console.log("Failed to clear basket:", response.status);
                alert("Failed to clear basket.");
            }
        } catch (err) {
            console.log("Error during clearing basket:", err);
            if (err.response) {
         //       console.log("Response error data:", err.response.data);
         //       console.log("Response status:", err.response.status);
          //      console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during clearing basket.");
        }
    }

    const deleteProduct = async (pk) => {
        try {
   //         console.log("Attempting to delete product with ID:", pk); 
            const response = await api.delete(`api/chart/delete/${pk}/`);

            if (response.status === 204 || response.status === 200 || response.status === 202) {
                console.log("Product deleted successfully");
                setProductsList(productsList.filter(product => product.id !== pk));
                setQuantity(quantity.filter(product => product.id !== pk));
                CalculateCharge();
            } else {
       //         console.log("Failed to delete product:", response.status);
                alert("Failed to delete product.");
            }

        } catch (err) {
            console.log("Error during deleting product:", err);
            if (err.response) {
        //        console.log("Full error response:", err.response); 
        //        console.log("Response error data:", err.response.data);
            }
            alert(err.response?.data?.detail || "Error occurred during deleting product.");
        }
    }

    const increase = async (pk) => {
        try {
             const product = productsList.find(p => p.id === pk);
            if (!product) return;

            const newQuantity = product.quantity + 1;
            const response = await api.patch(`api/chart/update/${pk}/`, {
                "quantity": newQuantity
            });

            if (response.status === 204 || response.status === 200) {
                 setProductsList(productsList.map(p => 
                    p.id === pk ? {...p, quantity: newQuantity} : p
                ));
                
                setQuantity(quantity.map(q =>
                    q.id === pk ? {...q, quantity: newQuantity} : q
                ));
                getProducts();
                CalculateCharge();
            } else {
        //        console.log("Failed to update product:", response.status);
                alert("Failed to update product.");
            }
        } catch (err) {
            console.log("Error during updating quantity:", err);
            if (err.response) {
          //      console.log("Response error data:", err.response.data);
            }
            alert("Error occurred during updating quantity.");
        }
    }

    const decrease = async (pk) => {
        try {
            const product = productsList.find(p => p.id === pk);
            if (!product || product.quantity <= 1) return; 

            const newQuantity = product.quantity - 1;
            const response = await api.patch(`api/chart/update/${pk}/`, {
                "quantity": newQuantity
            });

            if (response.status === 204 || response.status === 200) {
                setProductsList(productsList.map(p => 
                    p.id === pk ? {...p, quantity: newQuantity} : p
                ));
                
                setQuantity(quantity.map(q =>
                    q.id === pk ? {...q, quantity: newQuantity} : q
                ));
                getProducts();
                CalculateCharge();
            } else {
           //     console.log("Failed to update product:", response.status);
                alert("Failed to update product.");
            }
        } catch (err) {
            console.log("Error during updating quantity:", err);
            if (err.response) {
             //   console.log("Response error data:", err.response.data);
            }
            alert("Error occurred during updating quantity.");
        }
    }

    const CalculateCharge = async () => {
        try {
            const response = await api.get("api/customers/calculate-charge/")
            if (response.data && (response.status === 200 || response.status === 201)) {
                setCharge(response.data.charge);
     //           console.log("Charge:", response.data.charge);
            } else {
     //           console.log("Failed to get user info", response.status);
                alert("Failed to get user info.");
            }
        }catch (err) {
            console.log("Error during fetching user info:", err);
            if (err.response) {
        //        console.log("Response error data:", err.response.data);
        //        console.log("Response status:", err.response.status);
        //        console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during fetching user info.");
        }
    };

    const buy = async () => {
try{
    const response = await api.post(`api/customers/buy/${pk}/`,) 
    if (response.status === 200 || response.status === 201) {
        console.log("Product bought successfully");
        setProductsList([]);
        setQuantity([]);
        CalculateCharge();
        ShowBalance();
    }
}
catch (err) {
    console.log("Error during buying product:", err);
    if (err.response) {
  //      console.log("Response error data:", err.response.data);
    //    console.log("Response status:", err.response.status);
      //  console.log("Response headers:", err.response.headers);
    }
    if (err.request) {
        console.log("Request error:", err.request);
    }
    alert("you have no enough balance in your account.");
}
    }
    return (
        <div style={{maeginbottom:'0px'}}>
        <div className="basket-page" style={{maeginbottom:'0px'}}>
            <Structure />
            <h1 className="basket-header" style={{paddingLeft:'20px', paddingRight:'20px', marginBottom:'20px'}}>Your Basket</h1>
            {productsList.length > 0 ?  (
                <div>
                    {productsList.map((product, index) => (
                        <div key={index} className="product-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft:'20px' }}>
                            <div style={{ textAlign: 'left', paddingLeft:'20px', paddingRight:'20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h3>{product.product_name}</h3>
                                </div>
                                <p>
                                <strong> Quantity: </strong>
                                    <button
                                        onClick={() => increase(product.id)}
                                        style={{
                                            backgroundColor: 'white',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '25px',
                                            height: '25px',
                                            cursor: 'pointer',
                                            margin: '0 8px',
                                            fontSize: '16px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    >+</button>
                                    {product.quantity}
                                    <button
                                        onClick={() => decrease(product.id)}
                                        style={{
                                            backgroundColor: 'white',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '25px',
                                            height: '25px',
                                            cursor: 'pointer',
                                            margin: '0 8px',
                                            fontSize: '16px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    >-</button>
                                </p>

                                <p><strong>Price: {product.product_price}</strong></p>
                                <button onClick={() => deleteProduct(product.id)}>delete</button>
                            </div>
                            {product.picture && (
                                <img
                                    src={product.picture}
                                    alt={product.product_name}
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                        marginLeft: '0px',
                                    }}
                                />
                            )}
                        </div>
                    ))}   
                    <div style={{ display: 'inline-block', gap: '10px', backgroundColor: 'white', padding: "10px", marginLeft: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', paddingRight: '20px', paddingLeft: '20px', borderRadius: '10px', marginTop: '20px', marginBottom: '20px', width: '485px'}}>
                        
                        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', }}>
                        <button 
                            onClick={() => clearBasket()}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                margin: '20px 0',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            CLEAR
                        </button>

                        <button 
                            onClick= {buy}
                            style={{
                                backgroundColor: ' #4CAF50',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                margin: '20px 0',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            Buy
                        </button>
</div>
                        <h1 style={{padding:'4px', border: '7px solid #ddd'}}> Final Charge: {charge}</h1>
                        <h1 style={{padding:'4px', border: '7px solid #ddd'}}> Your Amount: {amount}</h1>
                    </div>
                </div>
                
            ) : (
                        null
)}

        </div>
        <div style={{marginTop:'600px'}}>

        <Tail/>


        </div>

</div>

    );

}

export default Basket;