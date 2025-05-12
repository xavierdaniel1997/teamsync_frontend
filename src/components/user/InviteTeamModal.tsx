import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'sonner';


interface InviteTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite: (emails: string[]) => void;
    isLoading?: boolean;
}

const InviteTeamModal = ({ isOpen, onClose, onInvite, isLoading = false }: InviteTeamModalProps) => {
    const [emails, setEmails] = useState<string[]>(['']);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleAddMore = () => {
        setEmails([...emails, '']);
    };

    const handleRemoveEmail = (index: number) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
    };

    const handleEmailChange = (index: number, email: string) => {
        const newEmails = [...emails];
        newEmails[index] = email;
        setEmails(newEmails);
    };

    const handleInvite = () => {
        const validEmails = emails.filter((email) => email.trim() !== '');
        if (validEmails.length === 0) {
            toast.error('Please add at least one valid email');
            return;
        }
        onInvite(validEmails);
        setEmails(['']); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-[#191919] rounded-md w-full max-w-xl p-6">
                <h2 className="text-xl text-gray-300 font-bold mb-2">Invite members</h2>
                <p className="text-gray-400 mb-6">Invite members to work on your project.</p>

                <div className="space-y-3">
                    {emails.map((email, index) => (
                        <div key={index} className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Enter email"
                                className="w-full border border-[#2E2E2E] bg-[#191919] text-gray-300 py-1.5 px-3 pr-10 rounded-sm"
                                value={email}
                                onChange={(e) => handleEmailChange(index, e.target.value)}
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleRemoveEmail(index)}
                                className="w-8 h-8 flex items-center justify-center rounded-md"
                                disabled={isLoading}
                            >
                                <IoClose className="text-gray-400 text-xl" />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleAddMore}
                    className="flex items-center text-blue-500 mt-4 mb-6"
                    disabled={isLoading}
                >
                    <AiOutlinePlus className="mr-1" />
                    <span>Add more</span>
                </button>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded-sm bg-[#202020] text-white"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleInvite}
                        className={`px-3 py-1 rounded-sm text-white ${
                            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Inviting...' : 'Add members'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteTeamModal;