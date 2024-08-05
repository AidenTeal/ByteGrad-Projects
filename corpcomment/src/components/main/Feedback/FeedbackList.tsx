import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { feedbackItem } from "../../lib/types";
import { useFeedbackItemsStore } from "../../contexts/feedbackItemsStore";

export default function FeedbackList() {

  const filteredFeedbackItems = useFeedbackItemsStore((state) => state.getFilteredFeedbackItems());
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage}/>}
      {filteredFeedbackItems !== undefined ? filteredFeedbackItems.map((feedback: feedbackItem) => (
        <FeedbackItem 
          key={feedback.id}
          id={feedback.id}
          upvoteCount={feedback.upvoteCount}
          company={feedback.company}
          text={feedback.text}
          daysAgo={feedback.daysAgo}
          badgeLetter={feedback.badgeLetter}
        />
      )) :
      null }
    </ol>
  );
}
