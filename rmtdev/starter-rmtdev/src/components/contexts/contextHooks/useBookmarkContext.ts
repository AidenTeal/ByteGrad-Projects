import { useContext } from "react";
import { BookmarkIDContext } from "../BookmarkIDProvider";

export function useBookmarkContext() {
  const context = useContext(BookmarkIDContext);
  // console.log("Context:", context); // Debugging line
  if (!context) {
    throw new Error("BookmarkIDContext is not found");
  }

  const { bookmarkedIDs, handleToggleBookmark, bookmarkedJobItems, isLoading } = context;

  return { bookmarkedIDs, handleToggleBookmark, bookmarkedJobItems, isLoading };
}
