import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { STORY_CONFIG } from '../config/story';

interface WordCountProgressProps {
  wordCount: number;
  error?: string;
}

export const WordCountProgress = ({ wordCount, error }: WordCountProgressProps) => {
  const { WORD_LIMIT } = STORY_CONFIG;
  
  return (
    <div className="space-y-2">
      <Progress 
        value={(wordCount / WORD_LIMIT) * 100} 
        className="h-2 bg-muted [&>div]:bg-primary"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{wordCount} words</span>
        <span>{WORD_LIMIT - wordCount} remaining</span>
      </div>
      
      {error && (
        <Alert variant="destructive" className="text-sm p-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};