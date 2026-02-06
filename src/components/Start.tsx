import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Start = ({ onNext }: { onNext: () => void }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleNo = () => {
    setIsRejected(true);
  };

  const handleYes = () => {
    if (hasStarted) return;
    setHasStarted(true);

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-rose-200 text-center space-y-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <img
                src={isRejected ? "./nah.gif" : "./adventure.gif"}
                alt={
                  isRejected ? "Playful rejection gif" : "Adventure heart gif"
                }
                className="w-40 h-40 object-contain rounded-xl"
              />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 leading-tight">
              {isRejected
                ? "Too bad! LOOOOOOL"
                : "My love, would you like to go on an adventure?"}
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                aria-label="Say yes to the adventure"
                onClick={handleYes}
                disabled={hasStarted}
                className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transform active:scale-95 transition-all"
              >
                Yes!
              </button>

              {!isRejected && (
                <button
                  aria-label="Say no to the adventure"
                  onClick={handleNo}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-10 py-4 rounded-full text-xl font-bold transform active:scale-95 transition-all"
                >
                  No
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="adventure-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-rose-700">
              The Journey Begins... 🗺️
            </h2>
            <p className="mt-4 text-rose-500">
              Preparing something special… 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
