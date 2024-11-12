import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WordCountProgress } from './WordCountProgress';

interface StoryInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  wordCount: number;
  error?: string;
  placeholder?: string;
  buttonText?: string;
  disabled?: boolean;
}

export const StoryInput = ({
  value,
  onChange,
  onSubmit,
  wordCount,
  error,
  placeholder = "Continue your story...",
  buttonText = "Add Branch",
  disabled = false,
}: StoryInputProps) => {
  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-base bg-background border-input resize-none p-2"
      />
      
      <WordCountProgress 
        wordCount={wordCount}
        error={error}
      />

      <Button
        onClick={onSubmit}
        disabled={disabled || !value.trim() || !!error}
        className="w-full h-8 text-sm bg-accent hover:bg-accent/80 
          text-accent-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
};