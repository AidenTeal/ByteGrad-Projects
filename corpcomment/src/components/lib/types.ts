export interface feedbackItem {
    id: number;
    company: string;
    badgeLetter: string;
    text: string;
    upvoteCount: number;
    daysAgo: number;
  }

export interface FeedbackFunctionProps {
    feedbackItems: feedbackItem[];
    setFeedbackItems: (feedbackItems: feedbackItem[]) => void;
  }