import axios from "axios";

export const fetchUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/user', { withCredentials: true });
        console.log(response.data);
        return [response.data.username, response.data.id];
    } catch (error) {
        console.error('Error fetching data', error);
    }
};

export const fetchAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/user-list', { withCredentials: true });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
    }
};

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie string starts with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
