// NOTE: lista de chats, hace click en uno y le mando un request para obtener todos los mensajes de ese chat

import ValarButton from "@components/general/ValarButton";
import { Chat } from "@utils/interfaces/Chat";
import { Message } from "@utils/interfaces/Message";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import ValarChat from "./ValarChat";
import ValarChatBottomBar from "./ValarChatBottomBar";
import ValarChatPreview from "./ValarChatPreview";

const messages: Message[] = [
  {
    _id: "1",
    usernameFrom: "mrmm",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "2",
    usernameFrom: "mrmm",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "3",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "4",
    usernameFrom: "mrmm",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "5",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "6",
    usernameFrom: "mrmm",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "7",
    usernameFrom: "mrmm",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "8",
    usernameFrom: "mrmm",
    content:
      "mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3 mensaje 3",
    edited: false,
    deleted: false,
  },
  {
    _id: "9",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "10",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "11",
    usernameFrom: "mrmm",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "12",
    usernameFrom: "mrmm",
    content: "mensaje 2",
    edited: false,
    deleted: false,
  },
  {
    _id: "13",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "14",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "15",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "16",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "17",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "18",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "19",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "20",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
  {
    _id: "21",
    usernameFrom: "a",
    content: "mensaje 1",
    edited: false,
    deleted: false,
  },
];

const chats: Chat[] = [
  {
    _id: "1",
    user1: "mrmm",
    user2: "a",
    messages,
  },
  {
    _id: "2",
    user1: "mrmm",
    user2: "b",
    messages,
  },
  {
    _id: "3",
    user1: "mrmm",
    user2: "c",
    messages,
  },
  {
    _id: "4",
    user1: "mrmm",
    user2: "d",
    messages,
  },
  {
    _id: "5",
    user1: "mrmm",
    user2: "e",
    messages,
  },
  {
    _id: "6",
    user1: "mrmm",
    user2: "f",
    messages,
  },
  {
    _id: "7",
    user1: "mrmm",
    user2: "g",
    messages,
  },
  {
    _id: "8",
    user1: "mrmm",
    user2: "h",
    messages,
  },
  {
    _id: "9",
    user1: "mrmm",
    user2: "i",
    messages,
  },
  {
    _id: "10",
    user1: "mrmm",
    user2: "j",
    messages,
  },
  {
    _id: "11",
    user1: "mrmm",
    user2: "k",
    messages,
  },
  {
    _id: "12",
    user1: "mrmm",
    user2: "l",
    messages,
  },
  {
    _id: "13",
    user1: "mrmm",
    user2: "m",
    messages,
  },
  {
    _id: "14",
    user1: "mrmm",
    user2: "n",
    messages,
  },
];

const ValarChats: React.FC<{}> = (props) => {
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);
  const [me, setMe] = useState("mrmm");
  const [friend, setFriend] = useState("");
  const [contactsMode, setContactsMode] = useState(true);

  // TODO: get chats and setMe

  const getDummyChat = (chatId: string): Chat => {
    return chats.find((chat) => chat._id === chatId)!;
  };

  const showChat = (chatId: string, friend: string) => {
    // TODO: chapar el chat actual del server y chapar quien soy
    setFriend(friend);
    setCurrentChat(getDummyChat(chatId));
  };

  return (
    <section className="mt-20 w-full h-full">
      <div className="flex justify-center items-stretch max-h-full">
        <div
          className={`${
            !contactsMode ? "dissapearsWhenChatTight" : ""
          } chatList m-3 max-w-full overflow-y-scroll`}
        >
          {chats.map((chat: Chat) => (
            <ValarChatPreview
              key={chat._id}
              username={chat.user2 as string}
              onClick={() => {
                setContactsMode(false);
                showChat(chat._id, chat.user2 as string);
              }}
            />
          ))}
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
              <ValarChatBottomBar
                onSend={(text) => console.log("send msg: ", text)}
              />
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
