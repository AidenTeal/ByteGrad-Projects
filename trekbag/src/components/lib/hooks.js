import { useContext } from "react"
import { ItemsContext } from "../contexts/ItemsContextProvider"

export function useItemsContext() {
    const context = useContext(ItemsContext);

    if (!context) {
        throw new Error (
            "useItemsContext must be used within a ItemsContextProvider"
        );
    }
    return context;
}