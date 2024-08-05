interface HashtagItemProp {
    company: string;
    onCompanyClick: (companyName: string) => void;
  }

export default function HashtagItem({company, onCompanyClick}: HashtagItemProp) {
  return (
    <li key={company}>
        <button onClick={() => onCompanyClick(company)}> #{company} </button>
    </li>
  )
}
