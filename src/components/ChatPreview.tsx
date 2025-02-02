import React, {useState} from 'react';
import {Button, CircularProgress, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {sendMessage} from "../api/api";
import {addMessage} from "../store/slices/messagesSlice";
import MessageItem from "./MessageItem";
import {ApiData} from "../common/types";

interface ChatPreviewProps {
    otherUserName: string;
    userPhone: string;
    apiDataStorage: ApiData;
}

const ChatPreview = ({otherUserName, userPhone, apiDataStorage}: ChatPreviewProps) => {
    const [myMessage, setMyMessage] = useState('')
    const messages = useAppSelector(state => state.messages.messages)
    const dispatch = useAppDispatch()

    const sendMessageHandler = async () => {
        const messageForPreview = await sendMessage(myMessage, userPhone, apiDataStorage.idInstance, apiDataStorage.apiTokenInstance)
        if (messageForPreview) {
            dispatch(addMessage(messageForPreview))
            setMyMessage('')
        }
    }

    return (
        <div className="main__chat__preview">
            <div className="main__chat__preview__header">
                {
                    otherUserName
                        ? <>{otherUserName} {`+${userPhone}`}</>
                        : <CircularProgress size={30}/>
                }
            </div>

            <div className='main__chat__preview__message-list'>
                {
                    messages.length
                        ? messages.map(m => (
                            <MessageItem textMessage={m.textMessage} type={m.type} key={m.idMessage}/>))
                        : null
                }
            </div>
            <div className="main__chat__input-message__wrapper">
                <div className="main__chat__input-message">
                    <TextField
                        value={myMessage}
                        onChange={(e) => {
                            setMyMessage(e.target.value)
                        }}
                        fullWidth/>
                </div>
                <Button onClickCapture={sendMessageHandler} variant="contained"
                        className="main__chat__send">Отправить</Button>
            </div>
        </div>
    );
};

export default ChatPreview;