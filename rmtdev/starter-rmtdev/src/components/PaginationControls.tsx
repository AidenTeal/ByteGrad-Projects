import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "./lib/types";
import { useJobItemsContext } from "./contexts/contextHooks/useJobItemsContext";

interface PaginationButtonProps {
  direction: PageDirection;
  onClick: (direction: PageDirection) => void;
  pageNumber: number;
}

export default function PaginationControls() {
  const { currentPage, handleChangePage, finalPage } = useJobItemsContext();

  return (
  <section className="pagination">
    {currentPage === 1 ? (
        !finalPage && <PaginationButton direction="next" onClick={handleChangePage} pageNumber={currentPage + 1} />
      ) : (
        <>
          <PaginationButton direction="previous" onClick={handleChangePage} pageNumber={currentPage - 1} />
          {!finalPage && <PaginationButton direction="next" onClick={handleChangePage} pageNumber={currentPage + 1} />}
        </>
      )
    }
  </section>
  )
}

function PaginationButton ({direction, onClick, pageNumber}: PaginationButtonProps) {
  return (
    <button className={`pagination__button pagination__button--${direction}`} 
      onClick={(e) => {   
        onClick(direction);
        e.currentTarget.blur();
      }}>
      {direction === "previous" ? 
        <>
          <ArrowLeftIcon /> 
          Page {pageNumber}
        </>
      : 
      <>
        <ArrowRightIcon /> 
        Page {pageNumber}
      </>
      }
    </button>
  )
}