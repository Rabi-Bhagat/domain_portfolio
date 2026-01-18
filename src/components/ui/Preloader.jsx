import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const secondaryText = "Welcome to Rabi's Portfolio...";

  useEffect(() => {
    // Timeline configuration
    const showNamasteTime = 500;
    const showWelcomeTime = 2500; // 500 (start) + 2000 (duration)

    const timer1 = setTimeout(() => {
        setStep(1);
    }, showNamasteTime);

    const timer2 = setTimeout(() => {
        setStep(2);
    }, showWelcomeTime);

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    };
  }, []);

  // Typing effect only runs when step becomes 2
  useEffect(() => {
    if (step === 2) {
        let index = 0;
        const interval = setInterval(() => {
            setText(secondaryText.slice(0, index + 1)); // Using slice is safer
            index++;
            
            if (index === secondaryText.length) {
                clearInterval(interval);
                // Wait 1.5s after finishing typing before closing
                setTimeout(onComplete, 1500);
            }
        }, 50);

        return () => clearInterval(interval);
    }
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
            <motion.div
                key="namaste"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent absolute"
            >
                Namaste 🙏
            </motion.div>
        )}

        {step === 2 && (
            <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-3xl font-mono font-bold text-white text-center px-4"
            >
                {text}
                <span className="animate-pulse text-primary inline-block ml-1">|</span>
            </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading Bar - Continues throughout */}
      <div className="absolute bottom-20 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
