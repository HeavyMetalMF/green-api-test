import React, {Dispatch, SetStateAction} from 'react';
import {Button, TextField} from "@mui/material";
import {ApiData} from "../common/types";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setApiData} from "../store/slices/messagesSlice";

interface ApiDataFormProps {
    setApiDataStorage: (data: ApiData) => void;
    setIsShowApiInput: Dispatch<SetStateAction<boolean>>;
}

const ApiDataForm = ({setApiDataStorage, setIsShowApiInput}: ApiDataFormProps) => {
    const handleTextInput = (text: string) => text.trim()
    const dispatch = useAppDispatch()
    const apiData = useAppSelector(state => state.messages.apiData)
    const phoneHandler = () => apiData.userPhone[0] !== '7' || apiData.userPhone.length < 11
    const buttonDisabledHandler = () => !apiData.idInstance || !apiData.apiTokenInstance|| !apiData.userPhone || phoneHandler()
    const isButtonDisabled = buttonDisabledHandler()

    const handleSaveApiData = () => {
        if (apiData) {
            setApiDataStorage({
                idInstance: apiData.idInstance,
                apiTokenInstance: apiData.apiTokenInstance,
                userPhone: apiData.userPhone
            })
        }
        if (!isButtonDisabled) {
            setIsShowApiInput(false)
        }
    }

    const idInstanceValueHandler = (value: string) => {
        dispatch(setApiData({...apiData, idInstance: handleTextInput(value)}))
    }

    const apiTokenInstanceValueHandler = (value: string) => {
        dispatch(setApiData({...apiData, apiTokenInstance: handleTextInput(value)}))
    }

    const userPhoneValueHandler = (value: string) => {
        dispatch(setApiData({...apiData, userPhone: handleTextInput(value)}))
    }

    return (
        <div className="main__input-data__text">
            <TextField value={apiData.idInstance} onChange={(e) => idInstanceValueHandler(e.target.value)}
                       label="idInstance" variant="outlined" placeholder='Введите idInstance'/>
            <TextField value={apiData.apiTokenInstance}
                       onChange={(e) => apiTokenInstanceValueHandler(e.target.value)} label="apiTokenInstance"
                       variant="outlined" placeholder='Введите apiTokenInstance'/>
            <TextField value={apiData.userPhone} onChange={(e) => userPhoneValueHandler(e.target.value)}
                       label="Телефон собеседника" variant="outlined" placeholder='Введите номер телефона'/>
            <Button disabled={isButtonDisabled} onClick={handleSaveApiData} variant="outlined">Сохранить
                данные</Button>
        </div>
    );
};

export default ApiDataForm;