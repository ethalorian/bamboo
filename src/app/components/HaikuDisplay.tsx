'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { StoryNode } from '@/types/story';

interface HaikuDisplayProps {
  story: StoryNode;
}

export const HaikuDisplay = ({ story }: HaikuDisplayProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recursively get all lines in order
  const getHaikuLines = (node: StoryNode): string[] => {
    const lines = [node.content];
    if (node.branches.length > 0) {
      lines.push(...getHaikuLines(node.branches[0]));
    }
    return lines;
  };

  const lines = getHaikuLines(story);
  const fullHaiku = lines.join('\n');

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ haikuText: fullHaiku }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full p-8 bg-card/50 rounded-xl">
        <div className="font-serif text-center space-y-2">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              className="text-lg text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      <motion.button
        onClick={generateImage}
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lines.length * 0.2 }}
      >
        {isLoading ? 'Generating visualization...' : 'Generate Haiku Visualization'}
      </motion.button>

      {error && (
        <motion.div 
          className="text-destructive text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {imageUrl && (
        <motion.div 
          className="relative w-full aspect-square max-w-lg mx-auto rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={imageUrl}
            alt="AI-generated visualization of haiku"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 32rem"
          />
        </motion.div>
      )}
    </motion.div>
  );
};