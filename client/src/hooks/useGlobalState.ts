import { useContext } from "react";
import { AddOfferingContext, AddOfferingContextType } from "../context";

export const useAddOfferingContext = (): AddOfferingContextType => {
    const context = useContext(AddOfferingContext);
    if (!context) {
        throw new Error("useAddOfferingContext must be used within an AddOfferingContextProvider");
    }
    return context;
};