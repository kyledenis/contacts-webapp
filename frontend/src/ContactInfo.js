import React, { useState, useEffect } from "react";
import { getPhones, createPhone, deletePhone } from "./API";

function ContactInfo({ contact, deleteContact }) {
    const [phones, setPhones] = useState([]);
    const [phoneName, setPhoneName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const data = await getPhones(contact.id);
                setPhones(data);
            } catch (error) {
                console.log("Error getting phones:", error);
            }
        };

        fetchPhones();
    }, [contact.id]);

    const handleCreatePhone = async () => {
        if (!phoneName || !phoneNumber) {
            alert("Name and number are required");
            return;
        }
        try {
            const data = await createPhone(contact.id, {
                name: phoneName,
                number: phoneNumber,
                contactId: contact.id,
            });
            setPhones([...phones, data]); // Add the new phone to the existing phones array
            setPhoneName("");
            setPhoneNumber(""); // Clear the input field after creating the phone
        } catch (error) {
            console.log("Error creating phone:", error);
        }
    };

    const handleDeletePhone = async (id) => {
        try {
            await deletePhone(contact.id, id);
            // Filter out the deleted phone from the phones array
            setPhones(phones.filter((phone) => phone.id !== id));
        } catch (error) {
            console.log("Error deleting phone:", error);
        }
    };

    return (
        <div className="contact-card">
            <div className="card-info">
                <h3>{contact.name}</h3>
                <button
                    className="red-button"
                    onClick={() => deleteContact(contact.id)}
                >
                    Delete
                </button>
            </div>
            <hr />
            <div className="card-details">
                <div className="card-table-input">
                    <input
                        className="input-field"
                        id="card-name-input"
                        type="text"
                        placeholder="Name"
                        value={phoneName}
                        onChange={(e) => setPhoneName(e.target.value)}
                    />
                    <input
                        className="input-field"
                        id="card-phone-input"
                        type="number"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button
                        className="green-button"
                        id="add-button"
                        onClick={handleCreatePhone}
                    >
                        Add
                    </button>
                </div>
                <div className="card-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {phones.map((phones) => (
                                <tr key={phones.id}>
                                    <td>{phones.name}</td>
                                    <td>{phones.number}</td>
                                    <td id="delete-button-row">
                                        <button
                                            className="red-button"
                                            onClick={() =>
                                                handleDeletePhone(phones.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
