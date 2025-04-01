import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const workspaceId = searchParams.get("workspaceId");
    const planId = searchParams.get("planId");
    const userId = searchParams.get("userId");

    if (workspaceId && planId && userId) {
      console.log("Subscription successful:", { workspaceId, planId, userId });
      setTimeout(() => setIsComplete(true), 2000);
      setTimeout(() => navigate("/create-project"), 5000);
    } else {
      console.error("Missing query parameters in success URL");
    }
  }, [searchParams, navigate]);

  // Animation variants
  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        duration: 0.8 
      }
    }
  };

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        delay: 0.5, 
        duration: 0.8,
        ease: "easeInOut" 
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.3, 
        duration: 0.6,
        ease: "easeInOut" 
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1, 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({ 
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      transition: { 
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        delay: i * 0.6,
        ease: "easeInOut"
      }
    })
  };

  const confettiVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (custom: { x: number; y: number; rotate: number; delay: number }) => ({ 
      y: [0, custom.y],
      x: [0, custom.x],
      rotate: [0, custom.rotate],
      opacity: [0, 1, 0],
      transition: { 
        duration: 3,
        repeat: Infinity,
        delay: custom.delay
      }
    })
  };

  // Generate confetti pieces when complete
  const confettiPieces = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * 400,
    color: ['#FFC700', '#FF0066', '#00A3FF', '#44FF00'][Math.floor(Math.random() * 4)],
    rotate: Math.random() * 360,
    delay: Math.random() * 0.5
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {isComplete && (
            <>
              {confettiPieces.map(piece => (
                <motion.div
                  key={piece.id}
                  className="absolute left-1/2 top-0"
                  custom={piece}
                  variants={confettiVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    width: Math.random() * 10 + 5,
                    height: Math.random() * 10 + 5,
                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    backgroundColor: piece.color
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Badge with animations */}
      <div className="relative mb-8">
        <motion.div
          className="bg-white rounded-full p-6 shadow-lg"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-16 h-16 text-blue-600"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M8 12l3 3 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </motion.div>

        {/* Animated stars */}
        {[1, 2, 3].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            variants={starVariants}
            custom={i}
            initial="hidden"
            animate="visible"
            style={{
              top: [-20, 30, 0][i],
              left: [60, -10, 70][i],
              color: i === 1 ? "#FFC700" : "#FFFFFF"
            }}
          >
            <span className="text-2xl">✦</span>
          </motion.div>
        ))}
      </div>

      {/* Success message with animation */}
      <motion.h1
        className="text-3xl font-bold"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Payment Successful
      </motion.h1>

      {/* Subtitle with animation */}
      <motion.p
        className="mt-2 text-lg text-gray-200"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
      >
        Create the Project and Connect with your team
      </motion.p>

      {/* Progress indicator */}
      <motion.div
        className="mt-8 h-1 bg-blue-700 rounded-full overflow-hidden w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 3, 
            ease: "linear",
            delay: 1.8
          }}
        />
      </motion.div>
    </div>
  );
};

export default Success;