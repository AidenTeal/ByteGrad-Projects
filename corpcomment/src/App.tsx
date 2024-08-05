import { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Container from "./components/main/Container";
import HashtagList from "./components/SideList/HashtagList";
import { useFeedbackItemsStore } from "./components/contexts/feedbackItemsStore";


function App() {
  const fetchFeedbackItems = useFeedbackItemsStore((state) => state.useFetchFeedbackItems);

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />

        <Container/>
        <HashtagList />
    </div>
  );
}

export default App;
