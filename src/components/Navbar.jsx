import { useState, useEffect, useRef } from "react";
import Logo from "../assets/CompanyLogo.svg";
import profile from "../assets/Ellipse 1872.svg";
import PropTypes from "prop-types";

const Navbar = ({ assistant, onLiylaActivate }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isFocused1, setisFocused1] = useState(false);
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearch = (e) => {
    setSearchPhrase(e.target.value);
  };

  useEffect(() => {
    if (isFocused1 === false) {
      setSearchPhrase("");
    }
  }, [isFocused1]);

  return (
    <div className="NavBar w-full mx-[auto] h-[68px] min-h-[42px] px-8 bg-[#1E1E1E]  backdrop-blur-[220px] flex justify-between items-center hover:cursor-pointer">
      <div className="logo-container ">
        <div className="logo flex justify-center items-center gap-[0.3vw]">
          <img className="Aspireit h-[42px] w-[130px]" src={Logo} />
        </div>
      </div>

      <div className="Frame1000008205 flex justify-start items-center w-fit gap-[1vw] bg-none">
        <div className="Frame1000008204 px-[2vh] py-[2px] bg-[#464646] flex justify-start items-center shadow-[0px_0px_6px_rgba(0,_0,_0,_0.25)] rounded-[40px] backdrop-blur-[4px]">
          <div className="ButtonsNotification w-[5vh] min-w-[24px] h-[5vh] min-h-[24px] mr-[1.5vh] relative ">
            <div className="Ellipse w-[5vh] h-[5vh] min-w-[24px] min-h-[24px] absolute left-0 top-0 bg-white rounded-full" />
            <div className="IconsBell w-[4vh] h-[4vh] min-w-[18px] min-h-[18px] absolute left-[1vh] top-[1vh] bg-none hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="w-[3vh] h-[3vh] min-w-[16px] min-h-[16px]"
              >
                <path
                  d="M21 6.50001C21 8.43001 19.43 10 17.5 10C15.57 10 14 8.43001 14 6.50001C14 4.57001 15.57 3.00001 17.5 3.00001C19.43 3.00001 21 4.57001 21 6.50001ZM19 11.79C18.5 11.92 18 12 17.5 12C16.0421 11.9974 14.6447 11.4171 13.6138 10.3862C12.583 9.3553 12.0026 7.95788 12 6.50001C12 5.03001 12.58 3.70001 13.5 2.71001C13.3185 2.48755 13.0897 2.30838 12.8302 2.18555C12.5707 2.06272 12.2871 1.99934 12 2.00001C10.9 2.00001 10 2.90001 10 4.00001V4.29001C7.03 5.17001 5 7.90001 5 11V17L3 19V20H21V19L19 17V11.79ZM12 23C13.11 23 14 22.11 14 21H10C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23Z"
                  fill="#0072DC"
                />
              </svg>
            </div>
          </div>
          <div className="Profile flex justify-end items-center  hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300">
            <img
              className="AvatarPic w-[5vh] min-w-[24px] bg-none rounded-full"
              src={profile}
            />
          </div>
        </div>
        <div className="Ai w-[4.5vw] min-w-[42px] bg-none">
          <img
            className="Layila h-[7.5vh] bg-none rounded-full hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300"
            src={assistant}
            onClick={onLiylaActivate}
          />
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  assistant: PropTypes.string.isRequired,
  onLiylaActivate: PropTypes.func.isRequired,
};

export default Navbar;
