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
  const {useGetWorkSpace} = useWorkSpaceMutation();
  const {useCreateSubscription} = useSubscriptionMutation()
  const { data: plans, isLoading } = useGetPlan;
  const {data: workspace} = useGetWorkSpace;

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if(!isLoading && plans.data){
      const freePlan = plans.data.find((plan: any) => plan.price === 0)
      if(freePlan){
        setSelectedPlan(freePlan._id)
      }
    }
  }, [plans, isLoading])


const stripePromise = loadStripe("pk_test_51R62P9ACrGKndsnVqBzsVUyikpGpj89R8bJaNzajrheVaaiVhuUcGA1MHvPJoOxfM6M2DnoJesTxGcWTVWwxZmZo00hRWbyXoV"); 

  // const handleSubscription = async () => {
  //   if(!selectedPlan || !workspace?.data?.data?._id || !user?.email) return;
  //   const selectedPlanData = plans.data.find((plan: any) => plan._id === selectedPlan)
  //   const workspaceId = workspace?.data?.data?._id
  //   console.log("data that is going to backend", workspaceId, selectedPlanData)
  //   try {
  //     const response = await useCreateSubscription.mutateAsync({
  //       planId: selectedPlan,
  //       workspaceId,
  //       email: user.email
  //     });

  //     if (response.sessionId) {
  //       const stripe = await stripePromise;
  //       if (stripe) {
  //         await stripe.redirectToCheckout({ sessionId: response.sessionId });
  //       }
  //     } else if (response.subscription) {
  //       console.log("success")
  //     }
  //   } catch (error) {
  //     console.error("Subscription error:", error);
  //   }
    
  // }

  const handleSubscription = async () => {
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
        navigate("/dashboard");
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
                />
              ))}
        </div>
        {!isLoading && (
          <div className="w-full flex justify-end gap-3">
            <button
              // to="/create-work-space"
              className="text-white py-2 px-4 rounded-md bg-[#555] hover:bg-[#444] transition"
            >
              Skip
            </button>
            <button
              className={`py-2 px-4 rounded-md transition ${
                selectedPlan
                  ? "bg-[#0052CC] text-white hover:bg-[#0047B3]"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedPlan}
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
