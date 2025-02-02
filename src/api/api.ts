import axios, {Message} from "../common/axios";
import {MessagesType} from "../common/enums";


export const getMessage = async (idInstance: string, apiTokenInstance: string, callback?: (value: Message) => void) => {
    const url = `/waInstance${idInstance}`
    try {
        const response = await axios.get(`${url}/receiveNotification/${apiTokenInstance}`, {params: {receiveTimeout: 5}})
        if (!response.data) {
            await getMessage(idInstance, apiTokenInstance, callback);
            return null
        }
        if (response.status === 502) {
            await getMessage(idInstance, apiTokenInstance, callback)
        } else if (response.status !== 200) {
            // Подключимся снова через секунду.
            await new Promise(resolve => setTimeout(resolve, 1000));
            await getMessage(idInstance, apiTokenInstance, callback);
        } else {
            const data = response.data
            let webhookBody = data.body;
            if (webhookBody.typeWebhook === 'incomingMessageReceived') {
                const message = webhookBody.messageData.textMessageData.textMessage
                await axios.delete(`${url}/deleteNotification/${apiTokenInstance}/` + data.receiptId)
                callback?.({textMessage: message, idMessage: webhookBody.idMessage, type: MessagesType.Incoming});
                await getMessage(idInstance, apiTokenInstance, callback);
            }
            await axios.delete(`${url}/deleteNotification/${apiTokenInstance}/` + data.receiptId)
            await getMessage(idInstance, apiTokenInstance, callback);
        }
        return null
    } catch (ex) {
        console.error(ex)
        return null
    }
}

export const sendMessage = async (message: string, number: string, idInstance: string, apiTokenInstance: string) => {
    const url = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`
    const response = await axios.post(
        url,
        {
            "chatId": number + "@c.us",
            "message": message
        }
    )
    if (response.status === 200) {
        return {textMessage: message, idMessage: response.data.idMessage, type: MessagesType.Outgoing}
    }
    return null
}

export const getUserName = async (number: string, idInstance: string, apiTokenInstance: string) => {
    const URL = `/waInstance${idInstance}/GetContactInfo/${apiTokenInstance}`
    const response = await axios.post(URL, {"chatId": number + "@c.us"})
    if (response.status === 200) {
        return response.data.name
    }
    return null
}