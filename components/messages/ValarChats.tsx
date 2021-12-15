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
import Image from "next/image";
import { useForceUpdate } from "@utils/hooks/forceUpdate";
import { EditedMessage } from "@utils/interfaces/EditedMessage";
import { DeletedMessage } from "@utils/interfaces/DeletedMessage";

interface ChatPreview {
  chat: string;
  user: {
    _id: string;
    username: string;
  };
}

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
    // TODO: pasar lógica a un servicio
    // TODO: nombres de los eventos deberian esta en CommonService o en el servico nuevo
    if (socket.current === undefined) {
      socket.current = io(CommonService.wsUrl, {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.current!.on("connect", () => {
        socket.current!.sendBuffer = [];
        console.log("connected to socket id: ", socket.current!.id);
        socket.current!.on("ready", () => {
          console.log("server done initializing");

          socket.current!.on("connect_error", (err) => {
            // TODO: mandarle request al endpoint de logout y router.push('/')
            console.log("error connnecting to ws: ", err.message);
          });

          socket.current!.on("error_sending_msg", (err) => {
            console.log("error sending message: ", err);
          });

          // FIXME: si alguien mas me manda mensaje, se van a renderizar mis mensajes con otra persona cuando no deberia
          // FIXME: estos updates estan mal, solo se deberia rerenderizar el mensaje que cambió, no todos los mensajes. Para ello:
          // TODO: Redux

          socket.current!.on("message", (msg: Message) => {
            console.log("received message from server: ", msg);
            if (currentChat.current) {
              currentChat.current.messages.push(msg);
              forceUpdate();
            } else {
              // TODO: acá se debería subir el chat que acaba el emitir el mensaje
              console.error(
                "se recibió un mensaje pero no hay current chat seleccionado"
              );
            }
          });

          socket.current!.on("peerMessageEdit", (msg: EditedMessage) => {
            if (currentChat.current) {
              currentChat.current.messages[msg.msgIdx].edited = true;
              currentChat.current.messages[msg.msgIdx].content = msg.newContent;
              forceUpdate();
            }
          });
          socket.current!.on("peerMessageDelete", (msg: DeletedMessage) => {
            if (currentChat.current) {
              currentChat.current.messages[msg.msgIdx].deleted = true;
              forceUpdate();
            }
          });
        });
      });
    }
    // cuando el componente se desmonte, hay que cerrar el socket
    return () => {
      if (socket.current !== undefined) {
        socket.current.close();
      }
    };
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

  const sendMessage = (content: string): void => {
    if (socket.current!.connected) {
      const newMsg = {
        usernameFrom: me,
        content: content,
        chatId: currentChat.current?._id,
      };
      // TODO: creo q el destination esta de más, el chatId basta
      socket.current!.emit("message", newMsg, (response: MessageAck) => {
        if (!response.ok) {
          console.log("error when sending message: ", response.error);
        } else {
          console.log("msg sent with _id: ", response._id);
          currentChat.current!.messages.push({
            ...newMsg,
            _id: response._id,
            timestamp: response.timestamp,
          });
          forceUpdate();
        }
      });
    } else {
      setModalIsOpen(true);
    }
  };

  const editMessage = (msg: EditedMessage): void => {
    socket.current!.emit("messageEdit", msg, (ack: any) => {
      if (ack.ok) {
        currentChat.current!.messages[msg.msgIdx].edited = true;
        currentChat.current!.messages[msg.msgIdx].content = msg.newContent;
        forceUpdate();
      } else {
        console.error("error editing message", ack.reason);
      }
    });
  };

  const deleteMessage = (msg: DeletedMessage): void => {
    socket.current!.emit("messageDelete", msg, (ack: any) => {
      if (ack.ok) {
        currentChat.current!.messages[msg.msgIdx].deleted = true;
        forceUpdate();
      } else {
        console.error("error editing message", ack.reason);
      }
    });
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
            <div id="chatContainer" className="mt-3 overflow-y-scroll">
              <ValarChat
                onGoBack={() => setContactsMode(true)}
                me={me}
                friend={friend}
                chat={currentChat.current}
                onEditMessage={editMessage}
                onDeleteMessage={deleteMessage}
              />
            </div>
            {/* TODO: que este anclado abajo */}
            <div className="flex justify-center items-stretch border-2 border-solid border-gray-600">
              <ValarChatBottomBar onSend={(content) => sendMessage(content)} />
            </div>
          </div>
        )}
        {!currentChat.current && (
          <div
            // className={`${
            //   contactsMode ? "dissapearsWhenChatTight" : ""
            // } chatSingle m-3 flex justify-center items-center max-w-full overflow-y-scroll`}
            className={
              "dissapearsWhenChatTight chatSingle m-3 flex justify-center items-center max-w-full"
            }
          >
            <div className="flex flex-col">
              <Image
                src={require("../../public/favicon.png")}
                width={50}
                height={50}
                objectFit="contain"
                alt="Logo de Valar"
              />
              <h2 className="mt-2">Selecciona un chat</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ValarChats;
