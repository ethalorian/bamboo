export interface StoryNode {
  id: string;
  content: string;
  branches: StoryNode[];
  level: number;
  lineNumber?: number;
}

export interface ImageGenerationResponse {
  imageUrl: string;
}

export interface ImageGenerationError {
  error: string;
}