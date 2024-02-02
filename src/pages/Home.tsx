import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/pass")}>PASS 인증으로 이동</button>
    </div>
  );
}

export default Home;
