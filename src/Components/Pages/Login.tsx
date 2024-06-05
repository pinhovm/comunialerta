import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../../Interface/IUser";

export default function Login() {
  const [users, setUsers] = useState<IUser[]>([]); // [{}

  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://comunialerta.onrender.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.login === cpf && user.password === password
    );
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/familias", { state: user });
    } else {
      setError("CPF ou senha inválidos");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Entre na sua conta
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="cpf"
              className="block font-bold leading-6 text-gray-900"
            >
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 shadow-sm hover:ring-indigo-500 hover:border-indigo-500 block sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-bold leading-6 text-gray-900"
              >
                Senha
              </label>
              <a
                href="./forgotPassword"
                className="font-semibold text-indigo-700 hover:text-indigo-500"
              >
                Esqueceu a sua senha?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm hover:ring-indigo-500 hover:border-indigo-500 block mt-2 sm:text-sm"
            />
          </div>
          <div>
            {error && (
              <div className="text-red-500 text-left mb-4">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 py-2 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
