import axios from "axios";
import { create } from "zustand";
import { feedbackItem } from "../lib/types";

interface Store {
  feedbackItems: feedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  validInput: boolean;
  invalidInput: boolean;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => feedbackItem[];
  selectCompany: (companyName: string) => void;
  addItemToList: (newFeedback: feedbackItem) => Promise<void>;
  useFetchFeedbackItems: () => Promise<void>;
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  validInput: false,
  invalidInput: false,
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  selectCompany: (companyName: string) => {
    set(() => ({ selectedCompany: companyName }));
  },
  addItemToList: async (newFeedback: feedbackItem) => {
    set((state) => ({ feedbackItems: [...state.feedbackItems, newFeedback] }));
    await axios.post(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      newFeedback
    );
  },
  useFetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));
    await axios
      .get(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      )
      .then((response) => {
        if (response.status !== 200) {
          set(() => ({ errorMessage: "something went wrong" }));
          throw new Error("Network response was not ok");
        }

        const data = response.data;
        set(() => ({ feedbackItems: data.feedbacks }));
        set(() => ({ isLoading: false }));
      })
      .catch(() => {
        set(() => ({ errorMessage: "something went wrong" }));
        set(() => ({ isLoading: false }));
      });
  },
}));
