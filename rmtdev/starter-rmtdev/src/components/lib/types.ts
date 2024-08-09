export interface TJobItem {
    id: number;
    title: string;
    relevanceScore: number;
    daysAgo: number;
    company: string;
    badgeLetters: string;
}

export interface TJobItemContent extends TJobItem {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary: string;
    location: string;
    coverImgURL: string;
    companyURL: string;
}


export interface UseSortedJobItemsProps {
    jobItems: TJobItem[] | undefined,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  }

export type PageDirection = "next" | "previous"