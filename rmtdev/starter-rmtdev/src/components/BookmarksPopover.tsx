import { forwardRef } from "react";
import JobList from "./JobList";
import { createPortal } from "react-dom";
import { useBookmarkContext } from "./contexts/contextHooks/useBookmarkContext";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>, 
    document.body
  );
});

export default BookmarksPopover;
