const API_ENDPOINT = "http://localhost:5000/api/contacts";

export const getData = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        return await response.json();
    }
    catch (error) {
        console.log("Error getting data:", error);
        throw error;
    }
};

export const getContacts = async () => {
    try {
        return await getData(API_ENDPOINT);
    } catch (error) {
        console.log("Error getting contacts:", error);
        throw error;
    }
};

export const createContact = async (name) => {
    try {
        return await getData(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
    } catch (error) {
        console.log("Error creating contact:", error);
        throw error;
    }
};

export const deleteContact = async (id) => {
    try {
        return await getData(`${API_ENDPOINT}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.log("Error deleting contact:", error);
        throw error;
    }
};

export const getPhones = async (contactId) => {
    try {
        return await getData(`${API_ENDPOINT}/${contactId}/phones`);
    } catch (error) {
        console.log("Error getting phones:", error);
        throw error;
    }
};

export const createPhone = async (contactId, phone) => {
    if (!phone.name || !phone.number) {
        throw new Error("Name and number are required");
    }
    try {
        return await getData(`${API_ENDPOINT}/${contactId}/phones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...phone, contactId }),
        });
    } catch (error) {
        console.log("Error creating phone:", error);
        throw error;
    }
};

export const deletePhone = async (contactId, phoneId) => {
    try {
        return await getData(`${API_ENDPOINT}/${contactId}/phones/${phoneId}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.log("Error deleting phone:", error);
        throw error;
    }
};
