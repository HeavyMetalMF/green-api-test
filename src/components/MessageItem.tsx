import React from 'react';
import classNames from "classnames";
import {MessagesType} from "../common/enums";

interface MessageItemProps {
    type: MessagesType;
    textMessage: string;
}

const MessageItem = ({textMessage, type}: MessageItemProps) => {
    return (
        <div
            className={classNames('main__chat__preview__message-list__item-wrapper', {'outgoing-message': type === MessagesType.Outgoing})}>
            <div
                className="main__chat__preview__message-list__item">{textMessage}</div>
        </div>
    );
};

export default MessageItem;