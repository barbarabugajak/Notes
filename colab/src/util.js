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