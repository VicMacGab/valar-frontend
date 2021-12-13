import ClientService from "@services/ClientService";
import CommonService from "@services/CommonService";
import { Message } from "@utils/interfaces/Message";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import ValarChat from "./ValarChat";
import ValarChatBottomBar from "./ValarChatBottomBar";
import ValarChatPreview from "./ValarChatPreview";
import { io, Socket } from "socket.io-client";
import { MessageAck } from "@utils/interfaces/MessageAck";
import { Chat } from "@utils/interfaces/Chat";
import ValarModal from "@components/general/ValarModal";

interface ChatPreview {
  chat: string;
  user: {
    _id: string;
    username: string;
  };
}

// TODO: mover a utils/hooks
const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const ValarChats: React.FC<{}> = (props) => {
  // TODO: lo de manejar a quién le pertenece cada mensaje
  const currentChat = useRef<Chat>();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [chatsError, setChatsError] = useState("");
  const [me, setMe] = useState("");
  const [friend, setFriend] = useState("");
  const [contactsMode, setContactsMode] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const socket = useRef<Socket>();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (socket.current === undefined) {
      socket.current = io(CommonService.wsUrl, {
        transports: ["websocket"],
        withCredentials: true,
      }); // connecting to valar backend

      socket.current!.on("connect", () => {
        socket.current!.sendBuffer = [];
        console.log("connected to socket id: ", socket.current!.id);
        socket.current!.on("ready", () => {
          console.log("server done initializing");

          socket.current!.on("connect_error", (err) => {
            console.log("error connnecting to ws: ", err.message);
          });

          socket.current!.on("error_sending_msg", (err) => {
            console.log("error sending message: ", err);
          });

          socket.current!.on("message", (msg: Message) => {
            console.log("received message from server: ", msg);
            if (currentChat.current) {
              currentChat.current = {
                _id: currentChat.current?._id,
                messages: [...currentChat.current?.messages, msg],
              };
              forceUpdate();
            }
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    ClientService.getAllChats()
      .then((res: AxiosResponse) => {
        console.group("Get All Chats");
        console.log(res);
        console.groupEnd();
        setChats(res.data.chats);
      })
      .catch((err: AxiosError) => {
        console.group("Get All Chats Err");
        console.log(err);
        console.groupEnd();
        setChatsError(err.response?.data.msg);
      });
  }, []);

  const showChat = (chatId: string, friend: string): void => {
    ClientService.getChatById(chatId)
      .then((res: AxiosResponse) => {
        console.group("Get Chat By Id Res");
        console.log(res);
        console.groupEnd();
        currentChat.current = res.data.chat;
        setFriend(friend);
        setMe(res.data.me);
        console.log("current chat: ", currentChat);
      })
      .catch((err: AxiosError) => {
        console.group("Get Chat By Id Err");
        console.log(err);
        console.groupEnd();
      });
  };

  const sendMessage = (destination: string, content: string): void => {
    if (socket.current!.connected) {
      const newMsg = { usernameFrom: me, content: content };
      socket.current!.emit(
        "message",
        newMsg,
        { destination: destination },
        (response: MessageAck) => {
          if (!response.ok) {
            console.log("error when sending message: ", response.error);
          } else {
            console.warn("msg sent with _id: ", response._id);
            currentChat.current = {
              _id: currentChat.current!._id,
              messages: [
                ...currentChat.current!.messages,
                { ...newMsg, _id: response._id },
              ],
            };
            forceUpdate();
          }
        }
      );
    } else {
      setModalIsOpen(true);
    }
  };

  return (
    <section className="mt-20 w-full h-full">
      <ValarModal
        isOpen={modalIsOpen}
        title="¡No estás conectado!"
        body={
          "Esto es porque probablemente ha habido un cambio de red o no tienes internet por el momento. Inténtalo luego."
        }
      />
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
                  setContactsMode(false);
                  showChat(chat.chat, chat.user.username);
                }}
              />
            ))
          )}
        </div>
        {currentChat.current && (
          <div
            className={`${
              contactsMode ? "dissapearsWhenChatTight" : ""
            } chatSingle max-w-full max-h-full flex flex-col justify-center items-stretch relative`}
          >
            <div id="chatContainer" className="m-3 overflow-y-scroll">
              <ValarChat
                onGoBack={() => setContactsMode(true)}
                me={me}
                friend={friend}
                chat={currentChat.current}
              />
            </div>
            {/* TODO: que este anclado abajo */}
            <div className="flex justify-center items-stretch border-2 border-solid border-gray-600">
              <ValarChatBottomBar
                onSend={(content) =>
                  sendMessage(currentChat.current!._id, content)
                }
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
