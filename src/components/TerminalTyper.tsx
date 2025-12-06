import { useEffect, useState } from 'react';

interface TerminalTyperProps {
  lines: { text: string; delay?: number; isCommand?: boolean }[];
  className?: string;
}

export const TerminalTyper = ({ lines, className }: TerminalTyperProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];
    const delay = currentLine.delay || 50;

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLine.text.slice(0, currentCharIndex + 1);
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  return (
    <div className={className}>
      <div className="terminal rounded-xl overflow-hidden">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-green-500" />
          <span className="ml-3 text-xs text-muted-foreground">terminal</span>
        </div>
        <div className="p-4 space-y-1 min-h-[160px]">
          {displayedLines.map((line, index) => (
            <div key={index} className="flex items-start gap-2">
              {lines[index]?.isCommand && (
                <span className="text-primary font-bold">$</span>
              )}
              <span className={lines[index]?.isCommand ? 'text-foreground' : 'text-muted-foreground'}>
                {line}
              </span>
            </div>
          ))}
          {isTyping && (
            <span className="inline-block w-2 h-4 bg-primary animate-blink" />
          )}
        </div>
      </div>
    </div>
  );
};
