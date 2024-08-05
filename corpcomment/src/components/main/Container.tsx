import FeedbackList from "./Feedback/FeedbackList";
import Header from "./header/Header";

export default function Container() {

  return (
    <main className="container">
        <Header />
        <FeedbackList />
    </main>
  )
}
