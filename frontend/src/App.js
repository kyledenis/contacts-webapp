import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
    const [name, setName] = useState("");

    return (
        <div className="contactor-app">
            <h1>Contactor</h1>
            <div className="contacts-container">
                <div className="contacts-creation">
                    <h2>Contacts</h2>
                    <input
                        className="contacts-name-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                    />
                    <button className="green-button">Create Contact</button>
                </div>
                <div className="contacts-list"></div>
            </div>
            <div className="subtext">
                <p>Click a contact to view associated phone numbers</p>
                <p className="contacts-statistics">Show Stats</p>
            </div>
        </div>
    );
}

export default App;
