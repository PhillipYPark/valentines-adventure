import { useState } from "react";
import { motion } from "framer-motion";

type CardType = {
  id: number;
  content: string;
  matched: boolean;
};

const IMAGE_NAMES = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"];

const IMAGE_EXTENSIONS: Record<string, string> = {
  m1: "jpeg",
  m2: "JPG",
  m3: "JPG",
  m4: "JPG",
  m5: "JPG",
  m6: "JPG",
  m7: "JPG",
  m8: "jpeg",
};
const IMAGES = IMAGE_NAMES.map((name) => `./${name}.${IMAGE_EXTENSIONS[name]}`);

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export const Matcher = ({ onNext }: { onNext: () => void }) => {
  const [cards, setCards] = useState<CardType[]>(
    shuffle([...IMAGES, ...IMAGES]).map((img, i) => ({
      id: i,
      content: img,
      matched: false,
    })),
  );

  const [flipped, setFlipped] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);
  const [matchedHeart, setMatchedHeart] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    if (disableAll) return;
    if (flipped.includes(index) || cards[index].matched) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (cards[first].content === cards[second].content) {
        const newCards = cards.map((c, i) =>
          i === first || i === second ? { ...c, matched: true } : c,
        );
        setCards(newCards);
        setFlipped([]);
        setMatchedHeart(first);
        setTimeout(() => setMatchedHeart(null), 800);

        if (newCards.every((c) => c.matched)) {
          setTimeout(onNext, 1000);
        }
      } else {
        setDisableAll(true);
        setTimeout(() => {
          setFlipped([]);
          setDisableAll(false);
        }, 1000);
      }
    }
  };

  return (
    <motion.div
      key="matcher"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <h2 className="text-2xl font-bold text-rose-800 mb-6">
        Match the Memories 🧩
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || card.matched;
          const showHeart = matchedHeart === i;

          return (
            <motion.div
              key={card.id}
              onClick={() => handleFlip(i)}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 perspective"
            >
              <motion.div
                className="relative w-full h-full rounded-xl shadow-lg cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {!isFlipped && (
                  <div className="absolute w-full h-full bg-rose-200 rounded-xl backface-hidden flex items-center justify-center">
                    <span className="text-xl md:text-2xl text-rose-400">
                      💌
                    </span>
                  </div>
                )}

                {isFlipped && (
                  <img
                    src={card.content}
                    alt="Memory card"
                    className="absolute w-full h-full object-contain rounded-xl rotateY-180 backface-hidden"
                  />
                )}

                {showHeart && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-3xl md:text-4xl animate-pulse">
                      💖
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-rose-500">
        Find all the pairs to continue your adventure! 💖
      </p>
    </motion.div>
  );
};
