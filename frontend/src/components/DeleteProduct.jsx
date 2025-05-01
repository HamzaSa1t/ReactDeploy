import { useState, useEffect, useRef } from "react";
import api from "../api";

function ToDelete({ pk, UserId }) {
    const [name, setName] = useState("");
    const [seller, setSeller] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [products, setProducts] = useState([]); //
    const [UserType, setUserType] = useState("");
    

    useEffect(() => {
        getType();
        getProducts(pk);
        fetchProducts();
    }, []);

    const getType = () => {
        api
            .get("api/UserDetails/")
            .then((res) => res.data.profile_user.user_type)
            .then((user_type) => {
                setUserType(user_type);
            })
            .catch((err) => alert(err));
    };

    const getProducts = async (pk) => {
        try {
            const response = await api.get(`api/products/${pk}/`);

            if (response.data) {
                setName(response.data.name);
                setSeller(response.data.seller);
            } else {
                console.error("Products not found or data is invalid");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await api.get("api/products/list/");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const DeleteProducts = async (pk) => {
        try {
     //       console.log(`Attempting to delete product with id: ${pk}`);
            const response = await api.delete(`api/products/delete/${pk}/`);
            if (response.status === 200 || response.status === 204) {
                console.log("Product deleted:", name);
                window.location.reload()
            } else {
                setErrorMessage("Failed to delete product");
                alert("Failed to delete product.");
            }
        } catch (err) {
            console.log("Error during product delete:", err);
            alert("Error occurred during product delete.");

            if (err.response) {
        //        console.log("Response error data:", err.response.data);
          //      console.log("Response status:", err.response.status);
          //      console.log("Response headers:", err.response.headers);
            }

            if (err.request) {
                console.log("Request error:", err.request);
            }

            alert("Error occurred during product delete.");
        }
    };

    return (
        <div>
            {(UserId === seller || UserType === "Manager") && (<button onClick={() => DeleteProducts(pk)}  style={{backgroundColor: '#4CAF50'}}>Delete</button>)}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default ToDelete;


/**
   const getProducts = async (pk) => {
        try {
            const response = await api.get(`api/products/${pk}/`);

            if (response.data) {
                setName(response.data.name);
                setSeller(response.data.seller);
            } else {
                console.error("Products not found or data is invalid");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
 */