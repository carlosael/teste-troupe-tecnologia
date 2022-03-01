import { useContext } from "react";
import CloseBtn from "../../../assets/closeBtn.svg";
import ContactsContext from "../../../contexts/ClientsContext";
import useLogin from "../../../hooks/useLogin";
import handleDeleteClient from "../../../services/handleDeleteClient";
import loadContacts from "../../../services/loadClients";
import CustomToastify from "../../Toastify/Toatsfy";
import "./styles.css";

function ModalDeleteContact() {
  const data = useContext(ContactsContext);
  const login = useLogin();

  async function handleDelete() {
    await handleDeleteClient(login.token, data.clientInEdting.id);
    loadContacts(data.setClientsData, login.token);
    data.setOpenDeleteModal(false);
    CustomToastify("Cliente excluído com sucesso!");
  }

  return (
    <div className="modal">
      <div className="modal-container-delete">
        <div className="confirm-delete">
          <h1>Confirma a exclusão?</h1>
          <img
            src={CloseBtn}
            alt="Close button"
            onClick={() => {
              data.setOpenDeleteModal(false);
              data.setClientInEditing([]);
            }}
            className="close-icon"
          />
        </div>
        <p>Deseja excluir o cliente, {data.clientInEdting.nome}?</p>
        <button
          className="modal-btn"
          style={{ backgroundColor: "#04C45C" }}
          onClick={() => {
            handleDelete();
            data.setClientInEditing([]);
          }}
        >
          EXCLUIR
        </button>
        <button
          style={{ backgroundColor: "rgba(251, 6, 21, 0.65)" }}
          onClick={() => {
            data.setOpenDeleteModal(false);
            data.setClientInEditing([]);
          }}
        >
          CANCELAR
        </button>
      </div>
    </div>
  );
}

export default ModalDeleteContact;
