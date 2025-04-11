import React, { useEffect, useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuthMutations } from "../../hooks/useAuth";

interface UserDropdownProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const UserDropdownList: React.FC<UserDropdownProps> = ({ isOpen, setIsOpen }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {logoutUser} = useAuthMutations()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsOpen]);

    if (!isOpen) return null;

    const handleLogout = () => {
        logoutUser.mutate()
    }

    return (
        <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-4 w-52 bg-[#1E1E1E] border border-[#5A6060] rounded-sm shadow-lg"
        >
            <div className="p-4 flex gap-2 border-b border-[#5A6060]">
                <div className="">
                    <div className="bg-amber-300 p-4 rounded-full w-8 h-8 items-center"></div>
                </div>
                <div>
                    <p className="text-sm text-white">John Doe</p>
                    <p className="text-xs text-gray-400">johndoe@example.com</p>
                </div>
            </div>
            <button className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#2E2E2E]">
                Profile
            </button>
            <button className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#2E2E2E]">
                Notification
            </button>
            <button className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#2E2E2E]">
                Settings
            </button>
            <button className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#2E2E2E] border-t border-[#5A6060]"
            onClick={handleLogout}>
                <FiLogOut className="inline mr-2" /> Logout
            </button>
        </div>
    );
};

export default UserDropdownList;
