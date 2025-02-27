import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"
import "../components/Structure.jsx"
import Structure from "../components/Structure.jsx";

function Home() {
    const [UserType, setUserType] = useState();

/*  
    useEffect(() => {
        getNotes();
    }, []);
*/
    useEffect(() => {
        getType();
    }, []);

    const getType = () => {
        api
            .get("api/UserDetails/")
            .then((res) => res.data.profile_user.user_type)
            .then((user_type) => {
                setUserType(user_type)
                console.log(user_type);
            })
            .catch((err) => alert(err));

    }
/*
    const getNotes = () => {
        api 
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
*/

/*
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };
*/

/*
    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
*/

const CustomerHomePageContent = () => {

    return <div> 

    <h1>Customer Home Page Content</h1>


    </div>

}

const ManagerHomePageContent = () => {

    return <div> 

    <h1>Manager Home Page Content</h1>


    </div>

}

const EmployeeHomePageContent = () => {

    return <div> 

    <h1>Employee Home Page Content</h1>


    </div>

}

const ContentComponent = UserType === 'Customer' ? CustomerHomePageContent :
UserType === 'Manager' ? ManagerHomePageContent :
UserType === 'Employee' ? EmployeeHomePageContent :
() => <p>Unknown user type.</p>; // Default component

    return (
        <div>
        <Structure/>
       < ContentComponent />
        
        </div>
    );
}

export default Home;
