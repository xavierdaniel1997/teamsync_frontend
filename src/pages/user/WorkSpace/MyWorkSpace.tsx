
interface MyWorkSpaceProps {
    ownedWorkspace: string;
    subscriptionName: string;
    memberCount: number;
    subscriptionStatus: string;
    subscriptionPrice: string;
    subscriptionCreatedAt: string;
    subscriptionExpiresAt: string;
    projectCount: number;
    projectLimit: number;
    memberLimit: number;
}
const MyWorkSpace: React.FC<MyWorkSpaceProps> = ({ ownedWorkspace, subscriptionName, subscriptionExpiresAt, projectCount, memberCount, subscriptionStatus, projectLimit, memberLimit, subscriptionPrice }) => {

    console.log("ownedWorkspace", ownedWorkspace);
    return (


        <div className="grid grid-cols-3 md:grid-cols-3 gap-x-5 gap-y-4">
            <div>
                <span className="mb-1 text-sm">Workspace Name</span>
                <input
                    type="text"
                    className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={ownedWorkspace}
                />
            </div>

            <div>
                <span className="mb-1 text-sm">Plan</span>
                <div className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <div className="flex items-center gap-1">
                        <p className="text-green-500 bg-green-500/30 px-2 w-fit rounded font-mono">{subscriptionName}</p>
                        <p className="text-green-500 bg-green-500/30 px-2 w-fit rounded font-mono">${subscriptionPrice}/month</p>
                    </div>
                </div>
            </div>

            <div>
                <span className="mb-1 text-sm">Expires At</span>
                <div className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <p className="text-red-500 bg-red-500/30 px-2 w-fit rounded font-mono">{subscriptionExpiresAt}</p>
                </div>
            </div>

            <div>
                <span className="mb-1 text-sm">Projects</span>
                <div className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <p className="text-gray-400">{projectCount} / {projectLimit}</p>
                </div>
            </div>

            <div>
                <span className="mb-1 text-sm">Members</span>
                <div className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <p className="text-gray-400">{memberCount} / {memberLimit}</p>
                </div>
            </div>

            <div>
                <span className="mb-1 text-sm">Status</span>
                <div className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <p className="text-green-500 bg-green-500/30 px-2 w-fit rounded font-mono">{subscriptionStatus}</p>
                </div>
            </div>

            <button className="text-gray-400 bg-blue-600/50 hover:bg-blue-700 px-4 py-1 rounded w-fit mt-2">Update</button>

        </div>


    )
}

export default MyWorkSpace