import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const workspaceId = searchParams.get("workspaceId");
    const planId = searchParams.get("planId");
    const userId = searchParams.get("userId");

    if (workspaceId && planId && userId) {
      console.log("Subscription successful:", { workspaceId, planId, userId });
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } else {
      console.error("Missing query parameters in success URL");
    }
  }, [searchParams, navigate]);

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
      <p className="text-gray-400 text-lg">Redirecting to dashboard...</p>
    </div>
  );
};

export default Success;