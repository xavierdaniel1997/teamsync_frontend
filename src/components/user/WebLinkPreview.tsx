import React from "react";
import { IoMdClose } from "react-icons/io";
import { RiLinkM } from "react-icons/ri";

interface WebLinkPreviewProps {
  webLinks: {
    url: string;
    linkText: string;
  }[];
  webLinkList?: boolean;
}

const WebLinkPreview: React.FC<WebLinkPreviewProps> = ({
  webLinks,
  webLinkList,
}) => {
  // if (!webLinks) return null;

  console.log("weblinks form the weblink preview", webLinks)

  return (
    <div className="">
      <div className="m-0 p-0 flex items-center justify-between text-gray-400 ">
        {webLinkList && <p className="text-sm font-semibold mb-1">Web Link</p>}
      </div>
      {webLinks?.map((webLink, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-2 text-gray-400 my-0.5 w-full border border-[#3a3a3a] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#6f6f6f45]/30"
        >
          <a
            href={webLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 pl-2 cursor-pointer"
          >
            <RiLinkM />
            <p className="">{webLink.url}</p>
          </a>
          <button className="p-2">
            <IoMdClose size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default WebLinkPreview;
