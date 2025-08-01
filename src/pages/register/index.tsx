import { useState, useContext } from "react";
import { AppContext } from "../../context";
import "./style.css";

export default function Register() {
  const { Register, Login } = useContext(AppContext);
  const [controled, setControled] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    await Register(email, password, name);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await Login(email, password);
  }

  return (
    <div className="register">
      <div className="logo">
        <img
          src="https://forbes.com.br/wp-content/uploads/2023/05/tech-ia-generativa-23Mai23-Reproducao.jpg"
          alt="Logo"
        />
      </div>
      {controled ? (
        <form onSubmit={(e) => handleLogin(e)}>
          <div>
            <h1>Crie sua conta!</h1>
          </div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <button type="button" onClick={() => setControled(false)}>
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={(e) => handleRegister(e)}>
          <div>
            <h1>Crie sua conta!</h1>
          </div>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <button type="button" onClick={() => setControled(true)}>
            Voltar
          </button>
        </form>
      )}
    </div>
  );
}
