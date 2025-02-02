import React, {useEffect, useState} from 'react';
import './App.scss';
import useLocalStorage from "./hooks/useLocalStorage";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {addMessage, setOtherUserName} from "./store/slices/messagesSlice";
import {getMessage, getUserName, sendMessage} from "./api/api";
import ApiDataForm from "./components/ApiDataForm";
import {ApiData} from "./common/types";
import ChatPreview from "./components/ChatPreview";
import {Message} from "./common/axios";

const initialApiData = {
    idInstance: '',
    apiTokenInstance: '',
    userPhone: '',
}

const App = () => {
    const [isShowApiInput, setIsShowApiInput] = useState(false)
    const [apiDataStorage, setApiDataStorage] = useLocalStorage<ApiData>('apiDataStorage', initialApiData)
    const otherUserName = useAppSelector(state => state.messages.otherUserName)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const addMessageCallback = (message: Message) => {
            if (message) {
                dispatch(addMessage(message))
            }
        }
        if (!apiDataStorage.idInstance || !apiDataStorage.apiTokenInstance || !apiDataStorage.userPhone) {
            setIsShowApiInput(true)
        } else {
            getMessage(apiDataStorage.idInstance, apiDataStorage.apiTokenInstance, addMessageCallback)
            getUserName(apiDataStorage.userPhone, apiDataStorage.idInstance, apiDataStorage.apiTokenInstance).then(name => {
                if (name) {
                    dispatch(setOtherUserName(name))
                }
            })
        }
    }, [isShowApiInput]);

  return (
    <div className="main">
        {isShowApiInput
            ? <ApiDataForm setApiDataStorage={setApiDataStorage} setIsShowApiInput={setIsShowApiInput} />
            : <ChatPreview userPhone={apiDataStorage.userPhone} otherUserName={otherUserName} apiDataStorage={apiDataStorage} />
        }
    </div>
  );
}

export default App;
