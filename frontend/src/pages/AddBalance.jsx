import React, { useState, useEffect } from 'react';
import api from "../api";
import Structure from '../components/Structure';
import '../styles/AddBalance.css'; 
import Tail from '../components/Tail';

function AddBalance() {
    const [balance, setBalance] = useState(0);
    const [addedamount, setAddedAmount] = useState(0);
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const response = await api.get("api/UserDetails/");
            if (response.data && response.status === 200) {
                setType(response.data.profile_user.user_type);
                setId(response.data.id);
                setName(response.data.username);
                setType(response.data.profile_user.user_type);
                const userType = response.data.profile_user.user_type;

                const response2 = await api.get(`api/balance/`);
                if (response2.data && response2.status === 200) {
      //              console.log("customer balance", response2.data.balance);
                    setBalance(response2.data.balance);
                } else {
                    console.error("Balance not found or data is invalid");
                }
            } else {
        //        console.log("Failed to get user info", response.status);
                alert("Failed to get user info.");
            }
        } catch (err) {
            console.log("Error during fetching user info:", err);
            if (err.response) {
          //      console.log("Response error data:", err.response.data);
          //      console.log("Response status:", err.response.status);
          //      console.log("Response headers:", err.response.headers);
            }
            if (err.request) {
                console.log("Request error:", err.request);
            }
            alert("Error occurred during fetching user info.");
        }
    };

    const addBalance = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`api/customers/charge/`, {"increament": addedamount });
            if (response.status === 201 || response.status === 200) {
                console.log("Balance successfully added!");
                setAddedAmount('');
                setBalance(+balance + +addedamount);
            } else {
        //        console.log("Failed to add balance", response.status);
                alert("Failed to add balance.");
            }
        } catch (err) {
            console.log("Error during adding balance:", err);
        }
    };

    return (
        <div className="add-balance-page">
            <Structure />
            <div className="balance-info">
                <h1>Balance of {name} is: {balance}</h1>
                {type === "Customer" && (
                    <div className="add-balance-form">
                        <h1>Add Balance</h1>
                        <form onSubmit={addBalance}>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={addedamount}
                                onChange={(e) => setAddedAmount(e.target.value)}
                                className="form-input"
                                min="0"
                            />
                            <button type="submit" className="form-button">Add Balance</button>
                        </form>
                    </div>
                )}
            </div>
            <Tail/>
        </div>
    );
}

export default AddBalance;