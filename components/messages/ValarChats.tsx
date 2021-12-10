// NOTE: lista de chats, hace click en uno y le mando un request para obtener todos los mensajes de ese chat

import ValarButton from "@components/general/ValarButton";
import ClientService from "@services/ClientService";
import { Chat } from "@utils/interfaces/Chat";
import { Message } from "@utils/interfaces/Message";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ValarChat from "./ValarChat";
import ValarChatBottomBar from "./ValarChatBottomBar";
import ValarChatPreview from "./ValarChatPreview";

interface ChatPreview {
  chat: string;
  user: {
    _id: string;
    username: string;
  };
}

const ValarChats: React.FC<{}> = (props) => {
  // TODO: lo de manejar a quién le pertenece cada mensaje
  const [currentChat, setCurrentChat] = useState<
    { _id: string; messages: Message[] } | undefined
  >(undefined);
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [chatsError, setChatsError] = useState("");
  const [me, setMe] = useState("");
  const [friend, setFriend] = useState("");
  const [contactsMode, setContactsMode] = useState(true);

  useEffect(() => {
    ClientService.getAllChats()
      .then((res: AxiosResponse) => {
        console.group("Get All Chats");
        console.log(res);
        console.groupEnd();
        setChats(res.data.chats.chats);
      })
      .catch((err: AxiosError) => {
        console.group("Get All Chats Err");
        console.log(err);
        console.groupEnd();
        setChatsError(err.response?.data.msg);
      });
  }, []);

  const showChat = (chatId: string, friend: string) => {
    // TODO: chapar el chat actual del server y chapar quien soy
    // TODO: get chats and setMe

    ClientService.getChatById(chatId)
      .then((res: AxiosResponse) => {
        console.group("Get Chat By Id Res");
        console.log(res);
        console.groupEnd();
        setFriend(friend);
        setMe(res.data.me);
        setCurrentChat({
          _id: res.data.chat._id,
          messages: res.data.chat.messages,
        });
      })
      .catch((err: AxiosError) => {
        console.group("Get Chat By Id Err");
        console.log(err);
        console.groupEnd();
      });
  };

  const sendMessage = (content: string) => {
    ClientService.sendMessage(currentChat!._id, {
      usernameFrom: me,
      content: content,
    })
      .then((res: AxiosResponse) => console.log("msg saved successfully"))
      .catch((err: AxiosError) => {
        console.group("Error Sending Msg");
        console.log(err);
        console.groupEnd();
      });
  };

  return (
    <section className="mt-20 w-full h-full">
      <div className="flex justify-center items-stretch max-h-full">
        <div
          className={`${
            !contactsMode ? "dissapearsWhenChatTight" : ""
          } chatList m-3 max-w-full overflow-y-scroll`}
        >
          {chatsError ? (
            <div className="flex justify-center items-center bg-valar-secondary text-white">
              {chatsError}
            </div>
          ) : (
            chats.map((chat: ChatPreview) => (
              <ValarChatPreview
                key={chat.user._id}
                username={chat.user.username}
                onClick={() => {
                  // setContactsMode(false);
                  showChat(chat.chat, chat.user.username);
                }}
              />
            ))
          )}
        </div>
        {currentChat && (
          <div
            className={`${
              contactsMode ? "dissapearsWhenChatTight" : ""
            } chatSingle max-w-full flex flex-col justify-center items-stretch`}
          >
            <div className="m-3 overflow-y-scroll">
              <ValarChat
                onGoBack={() => setContactsMode(true)}
                me={me}
                friend={friend}
                chat={currentChat}
              />
            </div>
            <div className="flex justify-center items-stretch border-2 border-solid border-gray-600">
              <ValarChatBottomBar onSend={sendMessage} />
            </div>
          </div>
        )}
        {!currentChat && (
          <div
            className={`${
              contactsMode ? "dissapearsWhenChatTight" : ""
            } chatSingle m-3 flex justify-center items-center max-w-full overflow-y-scroll`}
          >
            <h2>Selecciona un chat</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default ValarChats;
