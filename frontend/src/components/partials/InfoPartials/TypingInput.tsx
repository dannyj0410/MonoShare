import { useEffect, useState } from "react";
import { m } from "framer-motion";

const TypingInput = () => {
  const fullText = "Your password is ";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [cursorExists, setCursorExists] = useState(true);

  const [hasEnteredView, setHasEnteredView] = useState(false);

  const isTyping = displayedText.length < fullText.length;

  // typing
  useEffect(() => {
    if (isTyping && hasEnteredView) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, hasEnteredView]);

  // show cursor
  useEffect(() => {
    if (!isTyping && hasEnteredView) {
      const timer = setTimeout(() => setCursorExists(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, hasEnteredView]);

  // blinking
  useEffect(() => {
    if (!isTyping && cursorExists && hasEnteredView) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 800);
      return () => clearInterval(cursorInterval);
    }
  }, [isTyping, cursorExists, hasEnteredView]);

  return (
    <m.div
      onViewportEnter={() => setHasEnteredView(true)}
      viewport={{ once: true, amount: 0.1 }}
      className="flex w-full"
    >
      <input
        type="text"
        className="noto-sans tracking-tight text-(--gray) w-full px-4 py-2 rounded-lg border border-[#042741] bg-[#010407] outline-transparent focus:outline-[#14426631] focus:outline-2 outline-offset-1"
        value={`${displayedText}${cursorExists && showCursor ? "|" : ""}`}
        readOnly
      />
    </m.div>
  );
};

export default TypingInput;
