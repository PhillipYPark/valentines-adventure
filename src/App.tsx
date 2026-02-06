import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Start } from "./components/Start";
import { Quiz } from "./components/Quiz";
import { Matcher } from "./components/Matcher";
import { Catcher } from "./components/Catcher";
import { Proposal } from "./components/Proposal";

export default function App() {
  const [stage, setStage] = useState(0);

  const next = () => setStage((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-rose-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 0 && <Start key="start" onNext={next} />}
        {stage === 1 && <Quiz key="quiz" onNext={next} />}
        {stage === 2 && <Matcher key="matcher" onNext={next} />}
        {stage === 3 && <Catcher key="catcher" onNext={next} />}
        {stage === 4 && <Proposal key="proposal" />}
      </AnimatePresence>
    </div>
  );
}
