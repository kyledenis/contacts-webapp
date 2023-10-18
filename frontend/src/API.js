const API_ENDPOINT = "http://localhost:5000/api/contacts";

export const getData = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch. Error: ${response.status} ${response.statusText}`,
        );
    }
    return await response.json();
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
