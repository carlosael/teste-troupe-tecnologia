import { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import CloseBtn from "../../../assets/closeBtn.svg";
import ContactsContext from "../../../contexts/ClientsContext";
import useLogin from "../../../hooks/useLogin";
import handleAddClients from "../../../services/handleAddClients";
import handleEditClient from "../../../services/handleEditClient";
import loadCEP from "../../../services/loadCEP";
import loadClients from "../../../services/loadClients";
import InputErrorMessage from "../../InputErrorMessage/inputErrorMessage";
import CustomToastify from "../../Toastify/Toatsfy";
import "./styles.css";

const defaultValuesForm = {
  nome: "",
  cpf: "",
  email: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
};

function ModalAddAndEditClient() {
  const login = useLogin();
  const data = useContext(ContactsContext);
  const [form, setForm] = useState(defaultValuesForm);
  const [noNameError, setNoNameError] = useState(false);
  const [noCPFError, setNoCPFError] = useState(false);
  const [noEmailError, setNoEmailError] = useState(false);
  const [noCEPError, setNoCEPError] = useState(false);
  const [noStreetError, setNoStreetError] = useState(false);
  const [noNumberError, setNoNumberError] = useState(false);
  const [noNeighborhoodError, setNoNeighboorhoodError] = useState(false);
  const [noCityError, setNoCityError] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [invalidCEP, setInvalidCEP] = useState(false);

  useEffect(() => {
    if (data.clientInEdting.length === 0) {
      setForm(defaultValuesForm);
      return;
    }
    const { nome, cpf, email, cep, rua, numero, bairro, cidade, id } =
      data.clientInEdting;
    setForm({
      nome,
      cpf,
      email,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      id,
    });
  }, [data.clientInEdting]);

  function handleChange(target) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSearchCEP(cep) {
    const formatedCEP = cep.replace(/[^\d]/g, "");
    if (formatedCEP.length === 8) {
      const { logradouro, bairro, localidade, erro } = await loadCEP(
        formatedCEP
      );
      if (erro === true) {
        setInvalidCEP(true);
      } else {
        setInvalidCEP(false);
        setForm({
          ...form,
          cep: formatedCEP,
          rua: logradouro,
          bairro: bairro,
          cidade: localidade,
        });
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let error = false;

    if (!form.nome) {
      setNoNameError(true);
      error = true;
    } else {
      setNoNameError(false);
    }

    if (!form.cpf) {
      setNoCPFError(true);
      error = true;
    } else {
      setNoCPFError(false);
    }

    if (!form.email) {
      setNoEmailError(true);
      error = true;
    } else {
      setNoEmailError(false);
    }

    if (!form.cep) {
      setNoCEPError(true);
      error = true;
    } else {
      setNoCEPError(false);
    }

    if (!form.rua) {
      setNoStreetError(true);
      error = true;
    } else {
      setNoStreetError(false);
    }

    if (!form.numero) {
      setNoNumberError(true);
      error = true;
    } else {
      setNoNumberError(false);
    }

    if (!form.bairro) {
      setNoNeighboorhoodError(true);
      error = true;
    } else {
      setNoNeighboorhoodError(false);
    }

    if (!form.cidade) {
      setNoCityError(true);
      error = true;
    } else {
      setNoCityError(false);
    }

    if (error) return;

    const emailValidation =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValidation.test(form.email)) {
      setEmailVerified(false);
    } else {
      setEmailVerified(true);
      return;
    }

    let idCount = 0;

    const body = {
      id: idCount,
      nome: form.nome,
      cpf: form.cpf,
      email: form.email,
      endereco: {
        cep: form.cep,
        rua: form.rua,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
      },
    };

    setForm(body);

    if (data.clientInEdting.length === 0) {
      await handleAddClients(form, login.token);
      loadClients(data.setClientsData, login.token);
      CustomToastify("Cliente cadastrado com sucesso!");
    } else {
      await handleEditClient(form, login.token, data.clientInEdting.id);
      loadClients(data.setClientsData, login.token);
      CustomToastify("Cliente editado com sucesso!");
    }

    idCount++;

    data.setClientInEditing([]);
    data.setOpenModal(false);
  }

  function nextInput(e) {
    const target = e.target;
    const maxLength = 5;
    let myLength = target.value.length;
    if (myLength >= maxLength) {
      let next = target;
      while ((next = next.nextElementSibling)) {
        if (next === null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    }
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="add-register">
          <h1>
            {data.clientInEdting.length === 0
              ? "Novo contato"
              : "Editar contato"}
          </h1>
          <img
            src={CloseBtn}
            alt="Close button"
            onClick={() => {
              data.setOpenModal(false);
              data.setClientInEditing([]);
            }}
            className="close-icon"
          />
        </div>

        <form className="inputs" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="">Nome*</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={(e) => handleChange(e.target)}
              className={noNameError ? "error" : ""}
            />
            {noNameError && <InputErrorMessage />}
          </div>
          <div className="input-container">
            <label htmlFor="">CPF*</label>
            <InputMask
              mask="999.999.999-99"
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={(e) => handleChange(e.target)}
              className={noCPFError ? "error" : ""}
            />
            {noCPFError && <InputErrorMessage />}
          </div>
          <div className="input-container">
            <label htmlFor="">E-mail*</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={(e) => handleChange(e.target)}
              className={noEmailError ? "error" : ""}
            />
            {noEmailError && <InputErrorMessage />}
            {emailVerified && (
              <InputErrorMessage>
                Por favor insira um e-mail válido
              </InputErrorMessage>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="">CEP*</label>
            <InputMask
              mask="99999-999"
              name="cep"
              value={form.cep}
              onChange={(e) => handleChange(e.target)}
              onKeyUp={(e) => {
                nextInput(e);
                handleSearchCEP(e.target.value);
              }}
              className={noCEPError ? "error" : ""}
            />
            {invalidCEP && (
              <InputErrorMessage>CEP Não encontrado</InputErrorMessage>
            )}
            {noCEPError && <InputErrorMessage />}
          </div>
          <div className="double-inputs">
            <div className="input-container">
              <label htmlFor="">Rua*</label>
              <input
                type="text"
                name="rua"
                value={form.rua}
                onChange={(e) => handleChange(e.target)}
                className={noStreetError ? "error" : ""}
              />
              {noStreetError && <InputErrorMessage />}
            </div>
            <div className="input-container">
              <label htmlFor="">Número*</label>
              <input
                type="number"
                name="numero"
                value={form.numero}
                onChange={(e) => handleChange(e.target)}
                className={noNumberError ? "error" : ""}
              />
              {noNumberError && <InputErrorMessage />}
            </div>
          </div>
          <div className="double-inputs">
            <div className="input-container">
              <label htmlFor="">Bairro*</label>
              <input
                type="text"
                name="bairro"
                value={form.bairro}
                onChange={(e) => handleChange(e.target)}
                className={noNeighborhoodError ? "error" : ""}
              />
              {noNeighborhoodError && <InputErrorMessage />}
            </div>
            <div className="input-container">
              <label htmlFor="">Cidade*</label>
              <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={(e) => handleChange(e.target)}
                className={noCityError ? "error" : ""}
              />
              {noCityError && <InputErrorMessage />}
            </div>
          </div>
          <button className="modal-btn" style={{ backgroundColor: "#04C45C" }}>
            {data.clientInEdting.length === 0 ? "ADICIONAR" : "SALVAR"}
          </button>
        </form>
        <button
          style={{ backgroundColor: "rgba(251, 6, 21, 0.65)" }}
          onClick={() => setForm(defaultValuesForm)}
        >
          LIMPAR
        </button>
      </div>
    </div>
  );
}

export default ModalAddAndEditClient;
