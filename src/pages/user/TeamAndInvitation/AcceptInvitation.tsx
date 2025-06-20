import React, { useEffect } from 'react';
import logImage from "../../../assets/teamsync-log.png";
import leftVector from "../../../assets/leftVector.png";
import rightVector from "../../../assets/rightVector.png";
import { useLocation, useNavigate} from 'react-router-dom';
import { useInvitationTeamMutation } from '../../../hooks/useInvitationAndTeam';

const AcceptInvitation: React.FC = () => {
  const {useAcceptInvitation} = useInvitationTeamMutation()
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  console.log("token:", token);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("inviteToken", token);
      console.log("Token stored in sessionStorage:", token);
    }
  }, [token]);

  const handleAcceptInvitation = () => {
    const inviteToken = sessionStorage.getItem("inviteToken")
    if(!inviteToken){
      console.error("No token found!");
      return;
    }
    useAcceptInvitation.mutate({token: inviteToken}, {
      onSuccess: (response) => {
        console.log("invitation accept successfully", response)
        sessionStorage.removeItem("inviteToken")
        navigate("/project")
      },
      onError: (error: any) => {
        console.log("error ", error)
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-2 py-8 sm:px-4 lg:px-6 relative">
      <img
        src={leftVector}
        alt="Left Vector"
        className="absolute bottom-0 left-0 w-90 h-auto z-0"
      />

      <img
        src={rightVector}
        alt="Right Vector"
        className="absolute bottom-0 right-0 w-90 h-auto z-0"
      />

      <div className="w-full max-w-sm space-y-3 rounded-b-md bg-white shadow-md sm:p-6 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-sky-950">
            <img className="w-16 h-16" src={logImage} alt="TeamSync Logo" />
          </div>

          <h2 className="mt-1 text-center text-xl font-semibold text-gray-800">
          Welcom To Teamsync
          </h2>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAcceptInvitation}
              className="flex items-center justify-center rounded-sm px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Accept Invitation
            </button>
          </div>
        </div>


        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              By accepting this invitation, you will join the workspace and
              agree to the terms and conditions.
              <a href="#" className="text-blue-500 hover:underline"> more</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
