import { useJobItemsContext } from './contexts/contextHooks/useJobItemsContext';
import JobList from './JobList'

export default function JobListData() {
  const { jobItemsSortedForPage, isLoading } = useJobItemsContext();

  return (
    <JobList jobItems={jobItemsSortedForPage} isLoading={isLoading} />
  )
}
