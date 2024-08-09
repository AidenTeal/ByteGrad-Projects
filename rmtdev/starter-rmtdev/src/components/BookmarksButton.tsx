import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useOnClickOutside } from "./lib/hooks";

export default function BookmarksButton() {
  const [openPopover, setOpenPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setOpenPopover(false))
  
  return (
    <section>
      <button
        ref={buttonRef} 
        className="bookmarks-btn" 
        onClick={() => setOpenPopover(!openPopover)}
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {openPopover && <BookmarksPopover ref={popoverRef}/>}
    </section>
  );
}
