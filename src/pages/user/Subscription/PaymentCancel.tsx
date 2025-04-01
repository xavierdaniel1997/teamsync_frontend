import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const workspaceId = searchParams.get("workspaceId");
    const userId = searchParams.get("userId");

    if (workspaceId && userId) {
      console.log("Payment cancelled:", { workspaceId, userId });
      setTimeout(() => setIsLoaded(true), 500);
    } else {
      console.error("Missing query parameters in cancel URL");
    }
  }, [searchParams]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen w-full bg-rose-700 text-white overflow-hidden relative"
    >
      {/* Background pulse effect */}
      <motion.div
        className="absolute inset-0 bg-rose-800 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0, 0.2, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ width: "100vw", height: "100vh", left: "0", top: "0" }}
      />

      {/* Animated Badge */}
      <motion.div className="relative z-10 mb-8">
        <motion.div
          className="bg-white rounded-full p-6 shadow-lg flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-16 h-16 text-rose-600"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <motion.path
              d="M8 8L16 16M16 8L8 16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Message text */}
      <motion.h1 className="text-3xl font-bold text-center relative z-10">
        Payment Cancelled
      </motion.h1>
      <motion.p className="mt-2 text-lg text-rose-100 text-center max-w-xs relative z-10">
        Your payment was not processed. You can try again whenever you're ready.
      </motion.p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
        <motion.button
          className="px-6 py-3 bg-white text-rose-600 rounded-lg font-semibold shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            console.log("Navigating to /subscriptions");
            navigate("/subscriptions");
          }}
        >
          Try Again
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-rose-800 text-white rounded-lg font-semibold shadow-lg border border-rose-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            console.log("Navigating to /project");
            navigate("/project");
          }}
        >
          Back to Dashboard
        </motion.button>
      </div>

      {/* Progress disappearing indicator */}
      <motion.div className="mt-12 h-1 bg-rose-800 rounded-full w-64 overflow-hidden relative z-10">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default PaymentCancel;
