import React from "react";
import { useLocation } from "react-router-dom";
import { ImEnlarge2 } from "react-icons/im";
import { BsThreeDots } from "react-icons/bs";

interface BreadCrumbProps {
  pageName: string;
  buttonText?: string;
  onButtonClick?: () => void;
  ButtonIcon?: any;
  isBackLog?: boolean;
  buttonBg?: string;
  disabled?: boolean;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  pageName,
  buttonText,
  onButtonClick,
  ButtonIcon,
  isBackLog,
  disabled,
  buttonBg = "gray-600",
}) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex justify-between items-center">
      {/* Left Side - Breadcrumb */}
      <div>
        <h2 className="text-xl font-semibold text-gray-200">{pageName}</h2>
        <nav className="text-sm text-gray-400">
          {paths.map((path, index) => (
            <span key={index}>
              {index > 0 && " / "}
              <span>
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right Side - Button */}
      {/* {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="flex items-center bg-gray-600 text-white px-2.5 py-1.5 rounded-sm shadow hover:bg-gray-500 transition text-sm"
        >
          {buttonText}
          {ButtonIcon && <ButtonIcon size={20} className="ml-2" />}
        </button>
      )} */}
      {buttonText && onButtonClick && (
  <button
    onClick={onButtonClick}
    className={`flex items-center text-white px-2.5 py-1.5 rounded-sm shadow transition text-sm ${
      disabled
        ? "bg-gray-700 cursor-not-allowed"
        : `bg-${buttonBg} hover:bg-gray-500`
    }`}
    disabled={disabled}
  >
    {buttonText}
    {ButtonIcon && <ButtonIcon size={20} className="ml-2" />}
  </button>
)}
      {isBackLog && <div className="flex gap-3">
        <button className="text-gray-200">
          <ImEnlarge2 size={15}/>
        </button>
        <button className={`text-gray-200 bg-[#323232c7] p-1.5 rounded-xs`}>
          <BsThreeDots size={18}/>
        </button>
      </div>}
    </div>
  );
};

export default BreadCrumb;
