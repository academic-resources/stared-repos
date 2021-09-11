import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <div>
      <div>Home Page</div>
      <Link to={`/profile/${user.id}`}>Go to user {user.id}</Link>
    </div>
  );
};

export default Home;
