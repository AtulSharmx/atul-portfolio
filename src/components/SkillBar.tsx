import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  percentage: number;
  className?: string;
}

export const SkillBar = ({ name, percentage, className }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setTimeout(() => setWidth(percentage), 100);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [percentage, hasAnimated]);

  return (
    <div ref={ref} className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm font-mono text-primary">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-bar-fill transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};
