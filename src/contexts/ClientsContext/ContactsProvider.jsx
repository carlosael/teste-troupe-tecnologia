import ClientsContext from "./index";
import { useState } from "react";

export default function ClientsProvider(props) {
  const [clientsData, setClientsData] = useState([]);
  const [clientInEdting, setClientInEditing] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const clientsContextValues = {
    clientsData,
    setClientsData,
    clientInEdting,
    setClientInEditing,
    openModal,
    setOpenModal,
    openDeleteModal,
    setOpenDeleteModal,
  };

  return (
    <ClientsContext.Provider value={clientsContextValues}>
      {props.children}
    </ClientsContext.Provider>
  );
}
