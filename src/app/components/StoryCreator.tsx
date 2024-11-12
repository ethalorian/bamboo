'use client'

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

import {  
  GitBranch,
  Bookmark 
} from 'lucide-react';
import { Header } from './Header';
import { StoryBranch } from './StoryBranch';
import { StoryNode } from '@/types/story';
import { STORY_CONFIG } from '../config/story';
import { StoryInput } from './StoryInput';
import { HaikuDisplay } from './HaikuDisplay';

const StoryCreator = () => {
  const [story, setStory] = useState<StoryNode>({
    id: 'root',
    content: '',
    branches: [],
    level: 0
  });
  const [currentInput, setCurrentInput] = useState('');
  const [activeBranch, setActiveBranch] = useState<StoryNode | null>(null);
  const [selectedPath, setSelectedPath] = useState<StoryNode[]>([]);
  const [showingStory, setShowingStory] = useState(false);
  const [error, setError] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const { WORD_LIMIT, MAX_LEVEL } = STORY_CONFIG;

  useEffect(() => {
    const words = currentInput.trim() ? currentInput.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    setWordCount(words);
    setError(words > WORD_LIMIT ? `Story segment cannot exceed ${WORD_LIMIT} words` : '');
  }, [currentInput]);

  const addBranch = () => {
    if (!activeBranch || !currentInput.trim() || activeBranch.level >= 2) return;

    const newBranch: StoryNode = {
      id: Math.random().toString(36).slice(2),
      content: currentInput.trim(),
      branches: [],
      level: activeBranch.level + 1,
      lineNumber: activeBranch.level + 2
    };

    setStory(prev => {
      const updateBranches = (node: StoryNode): StoryNode => {
        if (node.id === activeBranch.id) {
          return {
            ...node,
            branches: [newBranch]
          };
        }
        return {
          ...node,
          branches: node.branches.map(updateBranches)
        };
      };
      return updateBranches(prev);
    });

    setCurrentInput('');
    setActiveBranch(newBranch);
    setSelectedPath(prev => [...prev, newBranch]);
  };

  const startStory = () => {
    if (!currentInput.trim()) return;
    const newStory = {
      id: 'root',
      content: currentInput.trim(),
      branches: [],
      level: 0,
      lineNumber: 1
    };
    setStory(newStory);
    setActiveBranch(newStory);
    setSelectedPath([newStory]);
    setCurrentInput('');
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 overflow-hidden">
        <Card className="h-full bg-card/70 backdrop-blur-sm border-border flex flex-col">
          {!story.content ? (
            <div className="h-full flex flex-col p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-accent p-2 rounded-lg">
                  <Bookmark className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-medium text-foreground">Begin Your Tale</h2>
              </div>

              <StoryInput
                value={currentInput}
                onChange={setCurrentInput}
                onSubmit={!story.content ? startStory : addBranch}
                wordCount={wordCount}
                error={error}
                placeholder={`Enter line ${!story.content ? 1 : (activeBranch?.level || 0) + 2} (${!story.content || (activeBranch?.level || 0) === 1 ? '5' : '7'} syllables)`}
                buttonText={!story.content ? "Begin Haiku" : `Add Line ${(activeBranch?.level || 0) + 2}`}
                disabled={activeBranch?.level === 2}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="bg-accent px-2 py-0.5 rounded-full text-xs text-muted-foreground">
                  Line {(activeBranch?.level ?? 0) + 1} / 3
                </div>
              </div>

              <div className="flex-1 relative bg-card/50 rounded-xl p-3 overflow-auto mb-3">
                {activeBranch?.level === 2 ? (
                  <HaikuDisplay story={story} />
                ) : (
                  <div className="min-w-max p-2">
                    <StoryBranch 
                      node={story}
                      isActive={story.id === activeBranch?.id}
                      isInPath={selectedPath.some(p => p.id === story.id)}
                      onBranchSelect={setActiveBranch}
                      maxLevel={2}
                      lineNumber={1}
                    />
                  </div>
                )}
              </div>

              {activeBranch && activeBranch.level < 2 && (
                <div className="h-auto">
                  <StoryInput
                    value={currentInput}
                    onChange={setCurrentInput}
                    onSubmit={addBranch}
                    wordCount={wordCount}
                    error={error}
                    placeholder={`Enter line ${activeBranch.level + 2} (${activeBranch.level === 0 ? '7' : '5'} syllables)`}
                    buttonText={`Add Line ${activeBranch.level + 2}`}
                    disabled={activeBranch.level >= 2}
                  />
                </div>
              )}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default StoryCreator;