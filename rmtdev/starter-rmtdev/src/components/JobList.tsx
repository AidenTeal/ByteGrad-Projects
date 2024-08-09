import { useActiveIDContext } from "./contexts/contextHooks/useActiveIDContext";
import JobListItem from "./JobListItem";
import { TJobItem } from "./lib/types";
import Spinner from "./Spinner";

interface JobListProps {
  jobItems: TJobItem[] | [];
  isLoading: boolean;
}

export function JobList({jobItems, isLoading}: JobListProps) {
  const { activeID } = useActiveIDContext();
  
  if (jobItems === undefined) {
    return;
  }

  return <ul className="job-list">
    {isLoading && <Spinner />}

    {jobItems.map((job: TJobItem) => {
      return <JobListItem key={job.id} id={job.id} title={job.title} relevanceScore={job.relevanceScore} daysAgo={job.daysAgo} company={job.company} badgeLetters={job.badgeLetters} isActive={activeID === job.id}/>
    })}
  </ul>;
}

export default JobList;
