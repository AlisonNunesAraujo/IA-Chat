import { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/header";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/connectiondatabase";
import { GoogleGenAI } from "@google/genai";
import { useContext } from "react";
import { AppContext } from "../../context";

type DataUsers = {
  messageUser: string;
  messageIA: string;
  uid: string;
  created: Date;
};

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataUsers[]>([]);
  const { user } = useContext(AppContext);

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCveaBX494NX4tYaWkwMjxC0lRpIVr9L6A",
  });

  useEffect(() => {
    async function getMessages() {
      const dataRef = collection(db, "message");
      const queryDataUser = 
      query(dataRef, where("uid", "==", user.uid));

    

      getDocs(queryDataUser).then((snapshot) => {
        let list: DataUsers[] = [];

        snapshot.forEach((doc) =>
          list.push({
            messageUser: doc.data().messageUser,
            messageIA: doc.data().messageIA,
            uid: doc.data().uid,
            created: doc.data().created,
          })
        );
        setData(list);
      });
    }
    getMessages();
  }, [data]);

  async function postMessage() {
    if (message === "") {
      alert("Please enter a message.");
      return;
    }
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
      });

      await addDoc(collection(db, "message"), {
        messageUser: message,
        messageIA: response.text,
        created: serverTimestamp(),
        uid: user.uid,
      });

      setMessage("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Erro ao enviar a mensagem: ");
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <Header />

      <div className="chat">
        {data?.map((item, index) => (
          <div key={index} className="message">
            <p className="messageUser">{item.messageUser}</p>
            <p className="messageIA">{item.messageIA}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {loading ? (
          <button disabled className="loading">
            Enviando...
          </button>
        ) : (
          <button onClick={postMessage}>Enviar</button>
        )}
      </footer>
    </div>
  );
}
