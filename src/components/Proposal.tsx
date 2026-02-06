import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Proposal = () => {
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [gifSrc, setGifSrc] = useState("./pic.gif");
  const [isMoving, setIsMoving] = useState(false);

  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  const handleAnswer = (answer: "yes" | "no") => {
    if (answered) return;
    setAnswered(answer);

    if (answer === "yes") {
      setGifSrc("./end.gif");
    }
  };

  const moveNoButton = () => {
    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 100);

    setNoPos({ top: randomY, left: randomX });
    if (!isMoving) setIsMoving(true);
  };

  useEffect(() => {
    if (answered !== "yes") return;

    const interval = setInterval(() => {
      setHearts((prev) => [...prev, { id: Date.now(), x: Math.random() * 90 }]);
    }, 300);

    return () => clearInterval(interval);
  }, [answered]);

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-800 mb-8 leading-tight">
        {answered === "yes"
          ? "I love you, my love 💕"
          : "Will you be my Valentine? 💘"}
      </h1>

      <motion.img
        key={gifSrc}
        src={gifSrc}
        alt="Valentine surprise"
        className="w-48 sm:w-64 md:w-80 mx-auto mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* Buttons */}
      <AnimatePresence>
        {!answered && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center relative w-full"
          >
            <motion.button
              onClick={() => handleAnswer("yes")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full text-xl sm:text-2xl font-bold shadow-lg"
            >
              Yes
            </motion.button>

            <motion.button
              onClick={() => handleAnswer("no")}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              animate={isMoving ? { top: noPos?.top, left: noPos?.left } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={
                isMoving
                  ? {
                      position: "fixed",
                      zIndex: 50,
                    }
                  : {}
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-10 py-4 rounded-full text-xl sm:text-2xl font-bold shadow-lg"
            >
              No
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling hearts */}
      {answered === "yes" &&
        hearts.map((heart) => {
          const endY = window.innerHeight + 50; // compute inside map so it's after mount

          return (
            <motion.div
              key={heart.id}
              initial={{ y: -50, opacity: 1 }}
              animate={{ y: endY, opacity: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              style={{
                left: `${heart.x}%`,
                top: 0,
                position: "fixed",
                fontSize: "2.5rem",
                pointerEvents: "none",
                zIndex: 50,
              }}
            >
              💖
            </motion.div>
          );
        })}
      {/* No answer message */}
      {answered === "no" && (
        <motion.div
          key="no"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <p className="mt-4 text-rose-500 text-lg sm:text-xl">
            Oh no! Maybe next time 😅
          </p>
        </motion.div>
      )}
    </div>
  );
};
