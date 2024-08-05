import { useFeedbackItemsStore } from "../contexts/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {

  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const handleCompanyClick = useFeedbackItemsStore((state) => state.selectCompany);

  return (
  <ul className="hashtags">
    {companyList.map((company: string) => {
        return (
          <HashtagItem key={company} company={company} onCompanyClick={handleCompanyClick} />
          )
        })}
  </ul>
  );
}
