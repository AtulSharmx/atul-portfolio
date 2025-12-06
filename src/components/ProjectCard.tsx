import { TiltCard } from './TiltCard';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  tags?: string[];
  onReadMore?: () => void;
}

export const ProjectCard = ({
  title,
  description,
  githubUrl,
  tags = [],
  onReadMore,
}: ProjectCardProps) => {
  return (
    <TiltCard className="group w-[340px] sm:w-[380px] flex-shrink-0">
      <div className="glass-panel h-full p-6 flex flex-col gap-4 transition-all duration-300 group-hover:border-primary/30">
        {/* Header with gradient accent */}
        <div className="h-2 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
          {description}
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="heroOutline"
            size="sm"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReadMore}
            className="group/btn"
          >
            Read more
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </TiltCard>
  );
};
