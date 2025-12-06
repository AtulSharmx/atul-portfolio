import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  githubUrl: string;
  tags: string[];
  challenges?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass-panel border-border/50 bg-card/95 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="h-2 w-20 rounded-full bg-gradient-to-r from-primary to-accent mb-4" />
          <DialogTitle className="text-2xl font-bold gradient-text">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Long description */}
          <div className="space-y-2">
            <p className="text-foreground leading-relaxed">{project.longDescription}</p>
          </div>
          
          {/* Tech stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Layers className="w-4 h-4" />
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <Code2 className="w-4 h-4" />
                Challenges Solved
              </div>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <Button variant="hero" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
