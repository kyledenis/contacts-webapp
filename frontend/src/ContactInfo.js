import React from "react";

function ContactInfo({ contact, deleteContact }) {
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
                    />
                    <input
                        className="input-field"
                        id="card-phone-input"
                        type="integer"
                        placeholder="Phone Number"
                    />
                    <button className="green-button" id="add-button">
                        Add
                    </button>
                </div>
                <div className="card-table">{/* <table></table> */}</div>
            </div>
        </div>
    );
}

export default ContactInfo;
