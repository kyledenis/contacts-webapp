import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [contacts, setContacts] = useState([]);

    const getData = async (url, options = {}) => {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    };

    const getContacts = async () => {
        try {
            const data = await getData("http://localhost:5000/api/contacts");
            setContacts(data);
        } catch (error) {
            console.log("Error getting contacts:", error);
        }
    };

    // Gets contacts data from an API endpoint using useEffect hook.
    useEffect(() => {
        getContacts();
    }, []);

    const createContact = async () => {
        try {
            const data = await getData("http://localhost:5000/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });
            setContacts([...contacts, data]); // Add the new contact to the existing contacts array
            setName(""); // Clear the input field after creating the contact
        } catch (error) {
            console.log("Error creating contact:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await getData(`http://localhost:5000/api/contacts/${id}`, {
                method: "DELETE",
            });
            // Filter out the deleted contact from the contacts array
            setContacts(contacts.filter((contact) => contact.id !== id));
        } catch (error) {
            console.log("Error deleting contact:", error);
        }
    };

    // TODO: Implement showStats function
    const showStats = () => {
        console.log("Showing stats");
        alert("This feature is not implemented yet");
    };

    return (
        <div className="contactor-app">
            <h1>Contactor</h1>
            <div className="contacts-container">
                <div className="contacts-creation">
                    <h2>Contacts</h2>
                    <input
                        className="input-field"
                        id="contacts-name-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="green-button"
                        id="create-button"
                        onClick={() => {
                            if (!name.trim()) {
                                alert("Name cannot be empty");
                                return; // If name is empty, exit the function
                            }
                            createContact();
                        }}
                    >
                        Create Contact
                    </button>
                </div>
                <div className="contacts-list">
                    {contacts.map((setContacts) => (
                        <ContactInfo
                            key={setContacts.id}
                            contact={setContacts}
                            deleteContact={deleteContact}
                        />
                    ))}
                </div>
            </div>
            <div className="subtext">
                <p>Click a contact to view associated phone numbers</p>
                <p className="contacts-statistics" onClick={showStats}>
                    Show Stats
                </p>
            </div>
        </div>
    );
}

export default App;
