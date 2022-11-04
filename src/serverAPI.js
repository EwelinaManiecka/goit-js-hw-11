import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";

export class searchQuery {

    static key = "21857778-e2d5225ad92fd3d3303cce086";
    static q = "";
    static image_type = "photo";
    static orientation = "horizontal";
    static safesearch = "true";
    static per_page = 40;
    static page = 1;

    static async searchPhoto(query = "") {
        if (query.trim()) 
        searchQuery.query = query;

    const config = {
        params: {
            key: searchQuery.key,
            q: searchQuery.query,
            image_type: searchQuery.image_type,
            orientation: searchQuery.orientation,
            safesearch: searchQuery.safesearch,
            per_page: searchQuery.per_page,
            page: searchQuery.page,
        }
    }
    const response = await axios.get(`${BASE_URL}`, config);
    return response.data;
    }
};
