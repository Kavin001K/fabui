import { useEffect, useState } from "react";

const TextType = ({ texts = ["Laundry Made Easy", "Fresh Clothes Everyday", "Doorstep Pickup & Delivery"], speed = 100 }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < texts[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + texts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // pause before resetting
      const timeout = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index, texts, speed]);

  return <h2 className="fw-bold text-warning">{text}|</h2>;
};

export default TextType;
