import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"

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

    return <dev> 

    <h1>CustomerHomePageContent</h1>


    </dev>

}

const ManagerHomePageContent = () => {

    return <dev> 

    <h1>ManagerHomePageContent</h1>


    </dev>

}

const EmployeeHomePageContent = () => {

    return <dev> 

    <h1>EmployeeHomePageContent</h1>


    </dev>

}

const ContentComponent = UserType === 'customer' ? CustomerHomePageContent :
UserType === 'manager' ? ManagerHomePageContent :
UserType === 'employee' ? EmployeeHomePageContent :
() => <p>Unknown user type.</p>; // Default component

    return (
        <div>
        
       < ContentComponent />
        
        </div>
    );
}

export default Home;
