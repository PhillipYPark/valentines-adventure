import { useState } from "react";
import { motion } from "framer-motion";

type Question = {
  question: string;
  options: string[];
  correct: number;
  gif: string;
};

const QUESTIONS: Question[] = [
  {
    question: "Where was our first official date? 💕",
    options: [
      "Kerry Park 🌆",
      "Suzzallo Library 📚",
      "Ferris Wheel 🎡",
      "UW IMA 🏋️",
    ],
    correct: 2,
    gif: "./one.gif",
  },
  {
    question: "Who said “I love you” first? 😳",
    options: ["You", "Me", "Same time 💞", "The universe 🌌"],
    correct: 0,
    gif: "./two.gif",
  },
  {
    question: "What’s my favorite thing about you? 🥰",
    options: ["Your smile", "Your heart", "Your laugh", "All of the above 💖"],
    correct: 3,
    gif: "./three.gif",
  },
];

export const Quiz = ({ onNext }: { onNext: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = QUESTIONS[current];

  const handleSelect = (index: number) => {
    if (selected !== null) return;

    if (index === question.correct) {
      setSelected(index);
      setTimeout(() => {
        if (current < QUESTIONS.length - 1) {
          setCurrent((prev) => prev + 1);
          setSelected(null);
        } else {
          onNext();
        }
      }, 900);
    } else {
      setSelected(index);
      setTimeout(() => {
        setSelected(null);
      }, 900);
    }
  };

  return (
    <motion.div
      key="quiz"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-rose-200 text-center space-y-6">
        <h2 className="text-2xl font-bold text-rose-800">
          Memory Check {current + 1}/{QUESTIONS.length}
        </h2>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <img
            src={question.gif}
            alt="Question related gif"
            className="w-24 md:w-28 h-24 md:h-28 object-contain"
          />
        </motion.div>

        <p className="text-lg text-rose-700">{question.question}</p>

        <div className="grid gap-4">
          {question.options.map((option, index) => {
            const isCorrect =
              selected !== null &&
              index === question.correct &&
              index === selected;
            const isWrong = selected === index && index !== question.correct;

            return (
              <motion.button
                key={option}
                onClick={() => handleSelect(index)}
                whileTap={{ scale: 0.97 }}
                disabled={selected !== null && isCorrect}
                className={`
        px-4 py-3 rounded-xl font-semibold border-2 transition-all
        ${selected === null ? "bg-rose-100 hover:bg-rose-200 border-rose-200" : ""}
        ${isCorrect ? "bg-green-400 text-white border-green-500" : ""}
        ${isWrong ? "bg-rose-400 text-white border-rose-500" : ""}
        disabled:cursor-not-allowed
      `}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
        <p className="text-sm text-rose-500">
          {selected !== null && selected !== question.correct
            ? "Oops! Try again 😉"
            : "No wrong answers… just cute ones 😉"}
        </p>
      </div>
    </motion.div>
  );
};
