import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import { getContacts, createContact, deleteContact } from "./API";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [contacts, setContacts] = useState([]);

    // Gets contacts data from an API endpoint using useEffect hook.
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getContacts();
                setContacts(data);
            } catch (error) {
                console.log("Error getting contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    const handleCreateContact = async () => {
        try {
            const data = await createContact(name);
            setContacts([...contacts, data]); // Add the new contact to the existing contacts array
            setName(""); // Clear the input field after creating the contact
        } catch (error) {
            console.log("Error creating contact:", error);
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            await deleteContact(id);
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
                            handleCreateContact();
                        }}
                    >
                        Create Contact
                    </button>
                </div>
                <div className="contacts-list">
                    {contacts.map((contact) => (
                        <ContactInfo
                            key={contact.id}
                            contact={contact}
                            deleteContact={handleDeleteContact}
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
