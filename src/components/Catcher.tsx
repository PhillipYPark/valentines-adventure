import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Catcher = ({ onNext }: { onNext: () => void }) => {
  const TARGET_CATCHES = 5;
  const [catches, setCatches] = useState(0);
  const [hearts, setHearts] = useState<
    { id: number; x: number; startY: number }[]
  >([]);

  useEffect(() => {
    if (catches >= TARGET_CATCHES) return;

    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 85,
          startY: -50 - Math.random() * 100,
        },
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [catches]);

  const handleCatch = (id: number) => {
    setCatches((prev) => prev + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
    if (catches + 1 >= TARGET_CATCHES) {
      setTimeout(onNext, 800);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center overflow-hidden p-6 relative">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-800 mb-4 text-center">
        Catch the Hearts! 💖
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-rose-500 mb-6 text-center">
        Catch {TARGET_CATCHES} hearts to continue your adventure!
      </p>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: heart.startY, opacity: 1 }}
            animate={{ y: "100vh", opacity: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            style={{ left: `${heart.x}%` }}
            className="absolute cursor-pointer pointer-events-auto"
            onClick={() => handleCatch(heart.id)}
            whileTap={{ scale: 0.8 }}
          >
            <span className="text-5xl sm:text-6xl md:text-7xl animate-pulse">
              💖
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-lg sm:text-xl md:text-2xl font-bold text-rose-700 text-center">
        Hearts caught: {catches}/{TARGET_CATCHES}
      </p>
    </div>
  );
};
