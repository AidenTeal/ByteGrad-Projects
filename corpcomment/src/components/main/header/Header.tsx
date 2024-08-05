import { useFeedbackItemsStore } from "../../contexts/feedbackItemsStore";
import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

export default function Header() {

  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);

  return (
    <header>
        <Pattern />
        <Logo />
        <PageHeading />
        <FeedbackForm addItemToList={addItemToList}/>
    </header>
  )
}
