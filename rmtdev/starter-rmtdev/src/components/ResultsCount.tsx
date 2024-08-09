import { useJobItemsContext } from "./contexts/contextHooks/useJobItemsContext";

export default function ResultsCount() {
  const { jobItems } = useJobItemsContext();

  const numResults = jobItems === undefined ? 0 : jobItems.length

  return <p className="count"><span className="u-bold">{numResults}</span> results</p>;
}
