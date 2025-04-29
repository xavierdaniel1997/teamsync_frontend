const WebLinkFields: React.FC<{
    onCancel: () => void;
  }> = ({ onCancel }) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-200">Web Link</div>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full h-9 text-sm px-2 bg-[#222] text-[#DDD] border border-[#444] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-[#888] rounded outline-none transition-colors duration-150"
            placeholder="https://example.com"
          />
          <input
            type="text"
            className="w-full h-9 text-sm px-2 bg-[#222] text-[#DDD] border border-[#444] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-[#888] rounded outline-none transition-colors duration-150"
            placeholder="Add description"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button className="bg-blue-400 px-2 py-0.5 rounded-sm cursor-pointer text-sm text-white">
            Create
          </button>
          <button
            className="bg-[#43414197] px-2 py-0.5 rounded-sm cursor-pointer text-sm text-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  export default WebLinkFields;