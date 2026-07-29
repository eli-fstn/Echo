import { useState, useEffect } from "react";

function TypingText({ text, speed }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="font-[Amaranth] text-center my-10 italic text-2xl">
      {displayedText}<span className="animate-[blink_1s_ease-in-out_infinite]">|</span>
    </p>
  );
}

export default TypingText;