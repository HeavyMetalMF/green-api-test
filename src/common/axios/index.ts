import axios from "axios";
import {MessagesType} from "../enums";

export default axios.create({
    baseURL: `https://1103.api.green-api.com`,
    headers: {
        "Content-type": "application/json"
    }
});

export interface Message {
    idMessage: string;
    textMessage: string;
    type: MessagesType
}