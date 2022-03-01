import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import handleLogin from "../../../services/handleLogin";
import InputErrorMessage from "../../InputErrorMessage/inputErrorMessage";
import "./styles.css";

const defaultValuesForm = {
  email: "",
  senha: "",
};

function LoginCard() {
  const [form, setForm] = useState(defaultValuesForm);
  const login = useLogin();
  const history = useHistory();
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [noPasswordError, setNoPasswordError] = useState(false);

  if (login.token) {
    history.push("/clients");
  }

  function handleChange(target) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmitUser(event) {
    event.preventDefault();
    let error = false;

    if (!form.senha) {
      setNoPasswordError(true);
      error = true;
    } else {
      setNoPasswordError(false);
    }

    const emailValidation =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValidation.test(form.email)) {
      setEmailVerified(false);
    } else {
      setEmailVerified(true);
      error = true;
      return;
    }

    if (form.senha.length < 4) {
      setPasswordVerified(true);
      error = true;
      return;
    } else {
      setPasswordVerified(false);
    }

    if (error) return;

    const body = {
      email: form.email,
      senha: form.senha,
    };

    setForm(body);
    const temp = await handleLogin(form);

    if (temp) {
      login.setToken(temp);
      history.push("/clients");
    }
  }

  return (
    <div className="card-login">
      <p>Bem vindo</p>
      <h1>Faça o login com sua conta</h1>
      <form className="inputs" onSubmit={handleSubmitUser}>
        <div className="input-container">
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={(e) => handleChange(e.target)}
          />
          {emailVerified && (
            <InputErrorMessage>
              Por favor insira um e-mail válido
            </InputErrorMessage>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Senha"
            name="senha"
            value={form.senha}
            onChange={(e) => handleChange(e.target)}
          />
          {noPasswordError && <InputErrorMessage />}
          {passwordVerified && (
            <InputErrorMessage>
              A senha deve conter pelo menos 4 caracteres
            </InputErrorMessage>
          )}
        </div>
        <button className="login-btn" style={{ backgroundColor: "#04C45C" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginCard;
