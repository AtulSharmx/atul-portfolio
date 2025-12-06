import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Internship',
    message: '',
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('x-bV8g6m1Qdy0F1Ky');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const templateParams = {
        to_email: 'atulsharma.dev@gmail.com', // Replace with your email
        from_name: formData.name,
        from_email: formData.email,
        role: formData.role,
        message: formData.message,
      };

      await emailjs.send(
        'service_n9q27tw',
        'template_5963m7m',
        templateParams
      );

      setShowSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        setFormData({ name: '', email: '', role: 'Internship', message: '' });
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-panel border-border/50 bg-card/95 backdrop-blur-xl">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-scale-in">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
            <p className="text-muted-foreground text-center">Thanks for reaching out. I'll reply soon.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">Let's Connect</DialogTitle>
              <p className="text-muted-foreground">Open to internships and project collaborations.</p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-muted/50 border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-muted/50 border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">I'm interested in</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Internship">Internship Opportunity</option>
                  <option value="Project">Project Collaboration</option>
                  <option value="Other">Something Else</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about the opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
