import { useEffect, useState } from "react";
import { useElementOnScreen } from "../../../hooks/IntersectionHook";

const TypingInput = () => {
  const fullText = "Your password is ";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [cursorExists, setCursorExists] = useState(true);

  const isTyping = displayedText.length < fullText.length;
  const { containerRef, isVisible } = useElementOnScreen({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isTyping && isVisible) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, isVisible]);

  useEffect(() => {
    if (!isTyping && isVisible) {
      const timer = setTimeout(() => {
        setCursorExists(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, isVisible]);

  useEffect(() => {
    if (!isTyping && cursorExists && isVisible) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 800);
      return () => clearInterval(cursorInterval);
    }
  }, [isTyping, cursorExists, isVisible]);

  return (
    <div className="flex w-full" ref={containerRef}>
      <input
        type="text"
        className="noto-sans tracking-tight text-(--gray) w-full px-4 py-2 rounded-lg border border-[#042741] bg-[#010407] outline-transparent focus:outline-[#14426631] focus:outline-2 outline-offset-1"
        value={`${displayedText}${cursorExists && showCursor ? "|" : ""}`}
        readOnly
      />
    </div>
  );
};

export default TypingInput;
