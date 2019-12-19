import axios from "axios";

export default class IamageService {
    static getListImages() {
        // console.log("IamageService");
        const url = "https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0";
        return axios.get(url);
    }
    static getImage(id) {
        // console.log("IamageService");
        const url = `https://api.unsplash.com/photos/${id}/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0`;
        return axios.get(url);
    }
}