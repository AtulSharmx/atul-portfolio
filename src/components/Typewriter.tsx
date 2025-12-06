import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
}

export const Typewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  className = '',
}: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (currentText === currentWord) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typeSpeed);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink text-primary">|</span>
    </span>
  );
};
