import ConnectButton from './Up';
import { Bookmark } from 'lucide-react';

export const Header = () => (
  <header className="w-full bg-secondary sticky top-0 z-50 shadow-[0_4px_10px_-2px] shadow-primary/25">
    <div className="w-2/3 mx-auto py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-accent p-2 rounded-lg backdrop-blur-sm">
            <Bookmark className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-medium text-foreground">Bamboo</h1>
        </div>
        
        <ConnectButton 
          className="bg-primary text-primary-foreground font-medium px-6 py-2 rounded-lg text-base
            shadow-lg hover:shadow-primary/25 hover:bg-primary/90 transition-all duration-200"
        />
      </div>
    </div>
  </header>
);