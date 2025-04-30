import React, {createContext, useContext, useRef} from 'react';

const SearchContext = createContext();

export function SearchProvider({children}) {
    const searchInputRef = useRef(null);
    console.log(searchInputRef)
    const focusSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        } else {
            console.warn('TextInput referensi topilmadi');
        }
    };

    return (
        <SearchContext.Provider value={{searchInputRef, focusSearchInput}}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}