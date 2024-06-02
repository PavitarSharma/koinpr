import { useContext } from "react";
import { AddOfferingContext, AddOfferingContextType, AuthContext, AuthContextType, FilterContext, FilterContextType } from "../context";


export const useAddOfferingContext = (): AddOfferingContextType => {
    const context = useContext(AddOfferingContext);
    if (!context) {
        throw new Error("useAddOfferingContext must be used within an AddOfferingContextProvider");
    }
    return context;
};

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within an FilterContextProvider");
    }
    return context;
}

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}