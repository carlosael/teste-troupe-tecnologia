import { useContext, useEffect, useState } from "react";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import orderIcon from "../../assets/orderIcon.svg";
import notFound from "../../assets/notFound.svg";
import searchIcon from "../../assets/searchIcon.svg";
import ContactsContext from "../../contexts/ClientsContext/index";
import useLogin from "../../hooks/useLogin";
import handleSearchClient from "../../services/handleSearchClient";
import loadContacts from "../../services/loadClients";
import loadClientsAscOrder from "../../services/loadClientsAscOrder";
import loadClientsDescOrder from "../../services/loadClientsDescOrder";
import ModalAddAndEditContact from "../Modals/ModalAddAndEditClient/modalAddAndEditContact";
import ModalDeleteContact from "../Modals/ModalConfirmDelete/modalConfirmDelete";
import "./styles.css";

function Table() {
  const login = useLogin();
  const data = useContext(ContactsContext);
  const [search, setSearch] = useState("");
  const [noClientFound, setNoClientFound] = useState(false);
  const [clientsNameInOrder, setClientsNameInOrder] = useState(false);

  useEffect(() => {
    loadContacts(data.setClientsData, login.token);
  }, [data.setClientsData, login.token]);

  async function handleSearch(event) {
    if (event === "Enter") {
      if (search === "") {
        setNoClientFound(false);
        loadContacts(data.setClientsData, login.token);
      } else {
        const clientSearch = await handleSearchClient(login.token, search);
        if (clientSearch.length === 0) {
          setNoClientFound(true);
        } else {
          setNoClientFound(false);
          data.setClientsData(clientSearch);
        }
      }
    }
  }

  async function handleOrderByClientsName() {
    if (!clientsNameInOrder) {
      setClientsNameInOrder(true);

      const clientsInDecrescentOrder = await loadClientsDescOrder(login.token);

      data.setClientsData(clientsInDecrescentOrder);
    } else {
      setClientsNameInOrder(false);

      const clientsInCrescentOrder = await loadClientsAscOrder(login.token);

      data.setClientsData(clientsInCrescentOrder);
    }
  }

  return (
    <div className="table">
      <div className="btns">
        <button
          style={{
            backgroundColor: "#04C45C",
            width: "235px",
          }}
          onClick={() => data.setOpenModal(true)}
        >
          Adicionar
        </button>
        <div className="input-container">
          <input
            type="text"
            placeholder="Pesquisa"
            className="input-container"
            onKeyDown={(event) => handleSearch(event.key)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img className="search-icon" src={searchIcon} alt="search icon" />
        </div>
      </div>
      <div className="table-head">
        <div className="order-icon" onClick={handleOrderByClientsName}>
          <img src={orderIcon} alt="order icon" />

          <span>Nome</span>
        </div>

        <span>CPF</span>
        <span>E-mail</span>
        <span>Cidade</span>
        <span></span>
      </div>
      <div className="table-body">
        {noClientFound && <img src={notFound} alt="Nada encontrado" />}
        {!noClientFound &&
          data.clientsData.map((contact) => (
            <div className="table-line" key={contact.id}>
              <span>{contact.nome}</span>
              <span>{contact.cpf}</span>
              <span>{contact.email}</span>
              <span>{contact.cidade}</span>
              <div className="edit-delete-icons">
                <div
                  className="icons"
                  onClick={() => {
                    data.setOpenModal(true);
                    data.setClientInEditing({ ...contact });
                  }}
                >
                  <img
                    id={contact.id}
                    src={editIcon}
                    alt="Pen"
                    className="edit-icon"
                  />
                  <small>Editar</small>
                </div>
                <div
                  className="icons"
                  onClick={() => {
                    data.setOpenDeleteModal(true);
                    data.setClientInEditing({ ...contact });
                  }}
                >
                  <img
                    src={deleteIcon}
                    alt="Trash Can"
                    className="delete-icon"
                    id={contact.id}
                  />
                  <small>Excluir</small>
                </div>
              </div>
            </div>
          ))}
      </div>
      {data.openDeleteModal && <ModalDeleteContact />}
      {data.openModal && <ModalAddAndEditContact />}
    </div>
  );
}

export default Table;
