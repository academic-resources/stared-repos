import { useHistory } from "react-router-dom";

const Logo = () => {
  const history = useHistory();

  return (
    <div
      id="logo-div"
      className="font-jetbrains text-5xl font-extrabold text-accentOne flex justify-center items-center m-3"
    >
      <div className="flex justify-center items-center flex-col pt-5 pb-2 bg-main rounded-xl">
        <img
          src="https://anvil-file-bucket.s3.amazonaws.com/images/name-ascii.png"
          alt="hidden"
          className="w-5/6"
        />
        <img
          onClick={() => history.push("/")}
          className="cursor-pointer w-20 transform hover:scale-105"
          src="https://anvil-file-bucket.s3.amazonaws.com/images/small-anvil-icon.png"
          alt="Anvil"
        />
      </div>
    </div>
  );
};

export default Logo;
