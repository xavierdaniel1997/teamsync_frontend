import React, { useEffect, useState } from 'react'
import { FaArrowLeft} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useUserDetailsMutation } from '../../../hooks/useUserDetails';
import { useSubscriptionMutation } from '../../../hooks/useSubscription';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { setSelectWorkspace, setSelectWorkspaceId } from '../../../redux/workspaceSlice';
import { setSelectProject, setSelectProjectId } from '../../../redux/projectSlice';
import SelectWorkSpace from './SelectWorkSpace';
import MyWorkSpace from './MyWorkSpace';
import { formatDate } from "../../../utils/formatDate";
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from 'react-icons/md';
import WorkspaceShimmer from './WorkspaceShimmer';

const ManageWorkSpace: React.FC = () => {

    const { getUserDetials } = useUserDetailsMutation();
    const { useGetMySubscription } = useSubscriptionMutation();
    const { data: userDetails } = getUserDetials;
    const { data: subscriptionPlan } = useGetMySubscription;
    const dispatch = useDispatch<AppDispatch>();
    const currendWorkspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);
    const currendWorkspace = useSelector((state: RootState) => state.workspace.selectWorkspace);

    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");
    const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
    const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false)

    // console.log("currentWorkspace", currendWorkspace)

    const ownedWorkspace = userDetails?.data?.workspaceOwn;
    const invitedWorkspaces = (userDetails?.data?.invitedWorkspace || []).filter(
        (workspace: any) => workspace._id !== ownedWorkspace?._id
    );

    useEffect(() => {
        if (currendWorkspaceId && currendWorkspace) {
            setSelectedWorkspaceId(currendWorkspaceId);
            setSelectedWorkspace(currendWorkspace);
        } else if (ownedWorkspace) {
            setSelectedWorkspaceId(ownedWorkspace._id);
            setSelectedWorkspace(ownedWorkspace);
            dispatch(setSelectWorkspaceId(ownedWorkspace._id));
            dispatch(setSelectWorkspace(ownedWorkspace));
        } else if (invitedWorkspaces.length > 0) {
            setSelectedWorkspaceId(invitedWorkspaces[0]._id);
            setSelectedWorkspace(invitedWorkspaces[0]);
            dispatch(setSelectWorkspaceId(invitedWorkspaces[0]._id));
            dispatch(setSelectWorkspace(invitedWorkspaces[0]));
        }
    }, [
        currendWorkspaceId,
        currendWorkspace,
        ownedWorkspace,
        invitedWorkspaces,
        dispatch,
    ]);

    if (!userDetails || !subscriptionPlan) {
        return <div className="text-gray-400">
            <WorkspaceShimmer/>
        </div>;
    }

    const handleWorkspaceChange = (workspaceId: string) => {
        setSelectedWorkspaceId(workspaceId);

        const selected =
            workspaceId === ownedWorkspace?._id
                ? ownedWorkspace
                : invitedWorkspaces.find((ws: any) => ws._id === workspaceId);

        setSelectedWorkspace(selected);
        dispatch(setSelectWorkspaceId(workspaceId));
        dispatch(setSelectWorkspace(selected));
        dispatch(setSelectProject(null));
        dispatch(setSelectProjectId(null));
    };


    const getSubscriptionDetails = () => {
        const plan = subscriptionPlan?.data?.plan || {};
        return {
            name: plan.name || "Free",
            price: plan.price || 0,
            status: subscriptionPlan?.data?.status || "INACTIVE",
            expiresAt: subscriptionPlan?.data?.expiresAt
                ? formatDate(subscriptionPlan.data.expiresAt)
                : "N/A",
            createdAt: subscriptionPlan?.data?.createdAt
                ? formatDate(subscriptionPlan.data.createdAt)
                : "N/A",
            projectLimit: plan.projectLimit,
            memberLimit: plan.memberLimit,
        };
    };

    const subscription = getSubscriptionDetails();

    const myProjectCount = ownedWorkspace?.projects?.length || 0;
    const myMemberCount = ownedWorkspace?.members?.length || 0;


    console.log("subscription details", subscriptionPlan?.data);

    return (
        <div className='min-h-screen bg-[#191919] text-gray-400 p-6'>
            <div className="mb-8">
                <Link
                    to="/project"
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    <span>Back to Project</span>
                </Link>
            </div>


            <div className="flex justify-center mt-16">
                <div className="w-full max-w-screen-lg p-6">
                    <div className="space-y-4">
                        {/* workspace profile section */}
                        <div className="pb-7 border-b border-[#333]">
                            <div className='flex items-center gap-5'>
                                <div className='w-16 h-16 bg-gray-600 rounded-sm flex items-center justify-center font-semibold text-lg'>{selectedWorkspace?.name?.slice(0, 2).toUpperCase()}</div>
                                <div className=''>
                                    <p className='font-semibold text-lg'>{currendWorkspace?.name}</p>
                                    <p className='text-sm'>teamsync.buzz/{currendWorkspace?.name}</p>
                                    <p className='text-xs text-blue-600'>{ownedWorkspace ? "owned" : "shared"}</p>
                                </div>
                            </div>
                        </div>
                        {/* update workspace section */}

                        <div className='pt-1 pb-7 border-b border-[#333]'>
                            <h1 className='font-semibold text-lg text-gray-300 pb-3'>Selected Workspace</h1>
                            <SelectWorkSpace
                                selectedWorkspaceId={selectedWorkspaceId}
                                selectedWorkspace={selectedWorkspace}
                                ownedWorkspace={ownedWorkspace}
                                invitedWorkspaces={invitedWorkspaces}
                                handleWorkspaceChange={handleWorkspaceChange}
                            />
                        </div>

                        <div className='pt-1 pb-7 border-b border-[#333]'>
                            <h1 className='font-semibold text-lg text-gray-300 pb-3'>Your Workspace details</h1>
                            {ownedWorkspace ?
                                <MyWorkSpace
                                    ownedWorkspace={ownedWorkspace?.name}
                                    subscriptionName={subscription.name}
                                    projectCount={myProjectCount}
                                    memberCount={myMemberCount}
                                    subscriptionStatus={subscription.status}
                                    subscriptionPrice={subscription.price}
                                    subscriptionCreatedAt={subscription.createdAt}
                                    subscriptionExpiresAt={subscription.expiresAt}
                                    projectLimit={subscription.projectLimit}
                                    memberLimit={subscription.memberLimit}
                                /> :
                                <div className='space-y-4'>
                                    <p>You dont have an owned workspace. If you want to create your own project you should have to create a new workspace and start creating project and build.</p>
                                    <Link to="/create-work-space"><button className="text-gray-400 bg-blue-600/50 hover:bg-blue-700 hover:text-white  px-3 py-1 rounded">Create New Workspace</button></Link>
                                </div>}
                        </div>
                        {ownedWorkspace && <div className='pt-1 pb-7 space-y-4'>
                            <div className='flex items-center justify-between'
                            onClick={() => setShowDeleteBtn(!showDeleteBtn)}>
                                <h1 className='font-semibold text-lg text-gray-300'>Delete your Workspace</h1>
                                <button className="text-gray-400">
                                    {showDeleteBtn ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowRight size={22} />}
                                </button>
                            </div>
                            {showDeleteBtn && <div className='space-y-3'>
                                <p>Tread carefully here. You delete your workspace, you lose all your data, your members can’t access projects and pages, and we can’t retrieve any of it for you. Proceed only if you are sure you want your workspace deleted.</p>
                                <button className='text-gray-400 tw-fit bg-red-500/50 px-3 py-1 rounded-sm'>Delete your workspace</button>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageWorkSpace