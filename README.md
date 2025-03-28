import { useNavigate } from "react-router-dom";
import UserPlanCard from "../../../components/user/UserPlanCard";
import { usePlanMutation } from "../../../hooks/usePlans";
import { useWorkSpaceMutation } from "../../../hooks/useWorkSpace";
import { useSubscriptionMutation } from "../../../hooks/useSubscription"; // New hook
import ShimmerUserPlanCard from "../../../components/user/ShimmerUserPlanCard";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your Stripe publishable key

const SubscriptionPricing = () => {
  const navigate = useNavigate();
  const { useGetPlan } = usePlanMutation();
  const { useGetWorkSpace } = useWorkSpaceMutation();
  const { useCreateSubscription } = useSubscriptionMutation(); // Use the new hook
  const { data: plans, isLoading } = useGetPlan();
  const { data: workspace } = useGetWorkSpace();

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Automatically select free plan on load
  useEffect(() => {
    if (!isLoading && plans?.data) {
      const freePlan = plans.data.find((plan) => plan.price === 0);
      if (freePlan) {
        setSelectedPlan(freePlan._id);
      }
    }
  }, [plans, isLoading]);

  // Step 2: Use the subscription mutation
  const subscriptionMutation = useCreateSubscription({
    onSuccess: async (data) => {
      if (data.isPaidPlan) {
        // Step 3a: Handle paid plan - redirect to Stripe checkout
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          });
          if (error) setError(error.message);
        }
      } else {
        // Step 3b: Handle free plan - navigate to dashboard
        navigate('/dashboard');
      }
    },
    onError: (error: any) => setError(error.response?.data?.message || 'Failed to create subscription'),
  });

  // Step 4: Handle subscription button click
  const handleSubscription = () => {
    if (!selectedPlan || !workspace?.data?.data?._id) return;

    const workspaceId = workspace.data.data._id;

    subscriptionMutation.mutate({
      planId: selectedPlan,
      workspaceId,
    });
  };

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Discover The Plans</h1>
        <p className="text-gray-400 text-lg">
          Select from the best plans, ensuring a perfect match. Need more or less?
          Customize your subscription for a seamless fit!
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-7">
        <div className="flex space-x-6 w-full max-w-5xl">
          {isLoading
            ? [...Array(3)].map((_, index) => <ShimmerUserPlanCard key={index} />)
            : plans?.data?.map((data) => (
                <UserPlanCard
                  key={data._id}
                  data={data}
                  isSelected={selectedPlan === data._id}
                  onSelectPlan={() => setSelectedPlan(data._id)}
                />
              ))}
        </div>
        {!isLoading && (
          <div className="w-full flex justify-end gap-3">
            <button
              className="text-white py-2 px-4 rounded-md bg-[#555] hover:bg-[#444] transition disabled:opacity-50"
              disabled={subscriptionMutation.isLoading}
              onClick={() => navigate('/dashboard')}
            >
              Skip
            </button>
            <button
              className={`py-2 px-4 rounded-md transition ${
                selectedPlan && !subscriptionMutation.isLoading
                  ? "bg-[#0052CC] text-white hover:bg-[#0047B3]"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedPlan || subscriptionMutation.isLoading}
              onClick={handleSubscription}
            >
              {subscriptionMutation.isLoading ? 'Processing...' : 'Subscribe'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPricing;