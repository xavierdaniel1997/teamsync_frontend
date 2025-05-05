import { Link, useNavigate } from "react-router-dom";
import UserPlanCard from "../../../components/user/UserPlanCard";
import { usePlanMutation } from "../../../hooks/usePlans";
import ShimmerUserPlanCard from "../../../components/user/ShimmerUserPlanCard";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useWorkSpaceMutation } from "../../../hooks/useWorkSpace";
import { useSubscriptionMutation } from "../../../hooks/useSubscription";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { loadStripe } from "@stripe/stripe-js";



const SubscriptionPricing = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user)
  const { useGetPlan } = usePlanMutation();
  const { useGetWorkSpace } = useWorkSpaceMutation();
  const { data: plans, isLoading } = useGetPlan;
  const { data: workspace } = useGetWorkSpace;
  const { useCreateSubscription, useGetMySubscription } = useSubscriptionMutation()
  const { data: subscriptionPlan, isLoading: isSubscriptionLoading } = useGetMySubscription
  // console.log("mySubscription", subscriptionPlan)

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);




  useEffect(() => {
    if (isSubscriptionLoading || isLoading) return;

    if (subscriptionPlan?.data?.plan?._id) {
      setSelectedPlan(subscriptionPlan.data.plan._id);
    } else if (plans?.data) {
      const freePlan = plans.data.find((plan: any) => plan.price === 0);
      if (freePlan) {
        setSelectedPlan(freePlan._id);
      }
    }
  }, [plans, isLoading, subscriptionPlan, isSubscriptionLoading]);



  const stripePromise = loadStripe("pk_test_51R62P9ACrGKndsnVqBzsVUyikpGpj89R8bJaNzajrheVaaiVhuUcGA1MHvPJoOxfM6M2DnoJesTxGcWTVWwxZmZo00hRWbyXoV");


  // console.log("workspaceeeeeeeeeeeeeeeeeeeeeee", workspace)

  const handleSubscription = async () => {
    console.log("click subscription")
    if (!selectedPlan || !workspace?.data?.data?._id || !user?.email) return;
    // setIsSubmitting(true);
    const workspaceId = workspace?.data?.data?._id;
    try {
      const response = await useCreateSubscription.mutateAsync({
        planId: selectedPlan,
        workspaceId,
        email: user.email,
      });
      console.log("API Response:", response);
      if (response.data?.sessionId) {
        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe failed to initialize");

        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (error) {
          console.error("Stripe Checkout error:", error.message);
        }
      } else if (response.data?.subscription) {
        console.log("Free subscription created successfully:", response.data.subscription);
        navigate("/create-project");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };




  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Discover The Plans
        </h1>
        <p className="text-gray-400 text-lg">
          Select from the best plans, ensuring a perfect match. Need more or less?
          Customize your subscription for a seamless fit!
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex space-x-6 w-full max-w-5xl">
          {isLoading
            ? [...Array(3)].map((_, index) => <ShimmerUserPlanCard key={index} />)
            : plans?.data?.map((data: any) => (
              <UserPlanCard
                key={data._id}
                data={data}
                isSelected={selectedPlan === data._id}
                onSelectPlan={() => setSelectedPlan(data._id)}
                isCurrentPlan={subscriptionPlan?.data?.plan?._id === data._id}
                currentPlanPrice={subscriptionPlan?.data?.plan?.price}
              />
            ))}
        </div>
        {!isLoading && (
          <div className="w-full flex justify-end gap-3">
            <Link to="/project"
              className="text-white py-2 px-4 rounded-md bg-[#555] hover:bg-[#444] transition"
            >
              Skip
            </Link>
            {/* <button
              className={`py-2 px-4 rounded-md transition ${
                selectedPlan
                  ? "bg-[#0052CC] text-white hover:bg-[#0047B3]"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedPlan}
              onClick={handleSubscription}
            >
              Next
            </button> */}
            <button
              className={`py-2 px-4 rounded-md transition ${selectedPlan && selectedPlan !== subscriptionPlan?.data?.plan?._id
                  ? "bg-[#0052CC] text-white hover:bg-[#0047B3]"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              disabled={
                !selectedPlan || selectedPlan === subscriptionPlan?.data?.plan?._id
              }
              onClick={handleSubscription}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPricing;




