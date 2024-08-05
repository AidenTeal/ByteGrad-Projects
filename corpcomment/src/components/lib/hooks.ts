/*import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext, FeedbackItemsContextProps } from "../contexts/FeedbackItemsContextProvider";
import axios from "axios";
import { feedbackItem } from "./types";

export function useFeedbackItemsContext (): FeedbackItemsContextProps {
    const context = useContext(FeedbackItemsContext);
    if (!context) {
      throw new Error("useFeedbackItemsContext must be used within a FeedbackItemsContextProvider");
    }
    return context;
}

export function useFetchItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackItems, setFeedbackItems] = useState<feedbackItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        )
        .then((response) => {
          if (response.status !== 200) {
            setErrorMessage("something went wrong");
            throw new Error("Network response was not ok");
          }

          const data = response.data;
          setFeedbackItems(data.feedbacks);
          setIsLoading(false);
        })
        .catch(() => {
          setErrorMessage("something went wrong");
          setIsLoading(false);
        });
    };

    fetchData();
  }, [setFeedbackItems]);

  return {
    feedbackItems,
    setFeedbackItems,
    isLoading,
    errorMessage
  };    
}
  */