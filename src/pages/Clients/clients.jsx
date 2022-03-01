import { useHistory } from "react-router-dom";
import logoutIcon from "../../assets/logoutIcon.svg";
import Table from "../../components/Table/table";
import CustomToastify from "../../components/Toastify/Toatsfy";
import ContactsProvider from "../../contexts/ClientsContext/ContactsProvider";
import useLogin from "../../hooks/useLogin";
import "./styles.css";

function Contacts() {
  const login = useLogin();
  const history = useHistory();

  if (login.token === "expired") {
    login.removeToken();
  }

  return (
    <ContactsProvider>
      <div className="main-card">
        <header>
          <div className="title">
            <h1>TROUPE - CLIENTES</h1>
          </div>
          <div className="icon">
            <button
              onClick={() => {
                login.logout(() => history.push("/"));
                CustomToastify("Até logo!");
              }}
              className="btn-logout"
            >
              <img src={logoutIcon} alt="Logout icon" />
            </button>
          </div>
        </header>
        <div className="second-card">
          <Table />
        </div>
      </div>
    </ContactsProvider>
  );
}

export default Contacts;
