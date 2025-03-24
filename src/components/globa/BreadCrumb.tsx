import React from "react";
import { useLocation } from "react-router-dom";

interface BreadCrumbProps {
  pageName: string;
  buttonText: string;
  onButtonClick: () => void;
  ButtonIcon?: any;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  pageName,
  buttonText,
  onButtonClick,
  ButtonIcon
}) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex justify-between items-center p-4">
      {/* Left Side - Breadcrumb */}
      <div>
        <h2 className="text-xl font-semibold text-gray-400">{pageName}</h2>
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
      <button
        onClick={onButtonClick}
        className="flex items-center bg-gray-600 opacity-60 text-white px-2.5 py-1.5 rounded-sm shadow hover:bg-gray-500 hover:text-white transition text-sm"
      >
        {buttonText}
        <ButtonIcon size={20} className="ml-2" />
      </button>
    </div>
  );
};

export default BreadCrumb;
