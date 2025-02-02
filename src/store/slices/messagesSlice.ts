import {createSlice} from '@reduxjs/toolkit'
import {ApiData} from "../../common/types";
import {Message} from "../../common/axios";

export interface CounterState {
    messages: Message[],
    otherUserName: string;
    apiData: ApiData ;
}

const initialState: CounterState = {
    messages: [],
    otherUserName: '',
    apiData: {
        idInstance: '',
        apiTokenInstance: '',
        userPhone: ''
    }
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setOtherUserName: (state, action) => {
            state.otherUserName = action.payload;
        },
        setApiData: (state, action) => {
            state.apiData = action.payload;
        }
    }
})

export const { addMessage, setOtherUserName, setApiData } = messagesSlice.actions
export default messagesSlice.reducer