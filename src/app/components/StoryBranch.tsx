import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { StoryNode } from '@/types/story';

interface StoryBranchProps {
  node: StoryNode;
  isActive: boolean;
  isInPath: boolean;
  onBranchSelect: (node: StoryNode) => void;
  maxLevel: number;
  lineNumber: number;
}

export const StoryBranch = ({ 
  node, 
  isActive, 
  isInPath, 
  onBranchSelect,
  maxLevel,
  lineNumber = node.level + 1
}: StoryBranchProps) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`
          p-3 rounded-lg w-[12rem] relative
          ${isActive ? 'bg-accent/50 ring-1 ring-primary' : 
            isInPath ? 'bg-secondary ring-1 ring-primary/50' :
            'bg-card shadow-sm hover:shadow ring-1 ring-border'}
        `}
        whileHover={{ scale: 1.02 }}
        onClick={() => onBranchSelect(node)}
      >
        <p className="text-sm text-foreground line-clamp-3">
          {node.content}
        </p>
        {isInPath && (
          <div className="absolute -right-1 -top-1">
            <div className="bg-background rounded-full p-0.5 shadow-sm">
              <Star className="w-3 h-3 text-primary" />
            </div>
          </div>
        )}
      </motion.div>

      {node.branches.map((branch) => (
        <div key={branch.id} className="pt-6 relative">
          <div className="absolute top-0 left-1/2 w-px h-6 bg-border" />
          <StoryBranch 
            node={branch}
            isActive={isActive}
            isInPath={isInPath}
            onBranchSelect={onBranchSelect}
            maxLevel={maxLevel}
            lineNumber={lineNumber + 1}
          />
        </div>
      ))}
    </div>
  );
};