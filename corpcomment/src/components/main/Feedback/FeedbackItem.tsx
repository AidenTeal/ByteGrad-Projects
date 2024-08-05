import { useState } from "react";
import { feedbackItem } from "../../lib/types";

export default function FeedbackItem({upvoteCount, company, text, daysAgo, badgeLetter}: feedbackItem) {
  const [open, setOpen] = useState(false);
  const [upvoteCnt, setUpvoteCnt] = useState(upvoteCount)

  const handleItemOpenClick = () => {
    setOpen((prev) => !prev);
  }

  const handleUpvoteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCnt((prev) => prev + 1);
    event.currentTarget.disabled = true;
    event.stopPropagation();
  }

  return (
    <li 
      className={`feedback ${open ? "feedback--expand" : ""}`}
      onClick={handleItemOpenClick}>
      <button onClick={handleUpvoteClick}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
        </svg>
        <span> {upvoteCnt} </span>
      </button>
      <div>
        <p> {badgeLetter} </p>
      </div>

      <div>
        <p> {company} </p>
        <p>
          {text}
        </p>
      </div>

      <p> {daysAgo === 0 ? "new" : `${daysAgo}d`} </p>
    </li>
  );
}
