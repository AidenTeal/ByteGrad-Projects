import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "./contexts/contextHooks/useBookmarkContext";

export default function BookmarkIcon({bookmarkID}: {bookmarkID: number}) {
  const { bookmarkedIDs, handleToggleBookmark } = useBookmarkContext();

  return (
    <button className="bookmark-btn" onClick={(event) => {
      handleToggleBookmark(bookmarkID)
      event.stopPropagation();
      event.preventDefault();
    }}>
      <BookmarkFilledIcon className={`${bookmarkedIDs.includes(bookmarkID) ? "filled" : ""}`} />
    </button>
  );
}
