import { useJobItemsContext } from "./contexts/contextHooks/useJobItemsContext";

interface SortingButtonProp {
  handleSortType: (sortingType: "relevant" | "recent") => void;
  sortType: "relevant" | "recent";
  Type: "relevant" | "recent";
}

export default function Sorting() {
  const { handleSortType, sortType } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton Type="relevant" handleSortType={handleSortType} sortType={sortType}/>

      <SortingButton Type="recent" handleSortType={handleSortType} sortType={sortType}/>
    </section>
  );
}

function SortingButton({Type, sortType, handleSortType}: SortingButtonProp) {
  return (
    <>
      <button className={`sorting__button sorting__button--${sortType} ${Type === sortType ? "sorting__button--active" : ""}`} onClick={() => handleSortType(Type)}>
        {Type}
      </button>
    </>
  )
}
