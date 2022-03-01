import LoginCard from "../../components/Cards/LoginCard/loginCard";
import "./styles.css";

function Home() {
  return (
    <div className="home">
      <div className="left"></div>
      <div className="right">
        <div className="card">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
