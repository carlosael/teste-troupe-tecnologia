import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginProvider from "../contexts/LoginContext/LoginProvider";
import useLogin from "../hooks/useLogin";
import Clients from "../pages/Clients/clients";
import Home from "../pages/Home/home";

function ProtectedRoutes(props) {
  const login = useLogin();

  return (
    <Route
      render={() => (login.token ? props.children : <Redirect to="/" />)}
    />
  );
}

function Routes() {
  return (
    <LoginProvider>
      <Router>
        <div className="main">
          <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoutes>
              <Route path="/clients" component={Clients} />
            </ProtectedRoutes>
          </Switch>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default Routes;
