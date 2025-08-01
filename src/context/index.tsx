import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/connectiondatabase";
import { auth } from "../services/connectiondatabase";
type PropsChildren = {
  children: ReactNode;
};

type StatesProps = {
  user: User;
  Register: (email: string, password: string, nome: string) => Promise<void>;
  Login: (email: string, password: string) => Promise<void>;
  logad: boolean |null |string;
};


type User = {
  email: string| null;
  uid: string;
};

export const AppContext = createContext({} as StatesProps);

export function Context({ children }: PropsChildren) {
  const [user, setUser] = useState<User>({
    email: "",
    uid: "",
  });

  const logad = user?.email && user?.uid

  async function Register(email: string, password: string, nome: string) {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, "users"), {
        id: data.user.uid,
        name: nome,
        email: data.user.email,
        createdAt: new Date(),
      });

      setUser({
        email: data.user.email,
        uid: data.user.uid,
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar usuário, tente novamente mais tarde.");
    }
  }

  async function Login(email: string, password: string) {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        email: data.user.email,
        uid: data.user.uid,
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login, verifique suas credenciais.");
    }
  }

  return (
    <AppContext.Provider value={{ user, Register,logad,Login }}>
      {children}
    </AppContext.Provider>
  );
}
