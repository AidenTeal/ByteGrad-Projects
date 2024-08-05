import { FormEvent, useState } from "react";
import { feedbackItem } from "../../lib/types";

export default function FeedbackForm({addItemToList}: {addItemToList: (newFeedback: feedbackItem) => void}) {
  const [text, setText] = useState("");
  const [showValidInput, setShowValidInput] = useState(false);
  const [showInvalidInput, setShowInvalidInput] = useState(false);

  const charactersLeft: number = 150 - text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText: string = event.target.value;
    if (newText.length > 150) {
      return;
    }
    setText(event.target.value);
  };

  const handleAddFeedback = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const companyName = text.split(' ').find((word) => word.includes('#'))?.substring(1) || "None";

    const newFeedback: feedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      company: companyName,
      text: text,
      daysAgo: 0,
      badgeLetter: companyName[0].toUpperCase()
    };

    // basic validation
    if (text.includes("#") && text.length >= 5) {
      setShowValidInput(true);
      addItemToList(newFeedback);
      setShowValidInput(false);
      setText("");
    } else {
      setShowInvalidInput(true);
      setTimeout(() => {
        setShowInvalidInput(false);
      }, 2000);
      return;
    }
  }

  return (
    <form className={`form ${showValidInput ? 'form--valid' : ''}
      ${showInvalidInput ? 'form--invalid' : ''}`} onSubmit={handleAddFeedback}>
      <textarea
        id="feedback-textarea"
        value={text}
        placeholder="..."
        spellCheck={false}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to hashtag the company name
      </label>
      <div>
        <p className="u-italic"> {charactersLeft} </p>
        <button>
          <span> Submit </span>
        </button>
      </div>
    </form>
  );
}
