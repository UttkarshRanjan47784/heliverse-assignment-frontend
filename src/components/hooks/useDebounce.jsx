import { useState, useEffect } from "react";

export const useDebounce = (value) => {
    const [debVal, setDebVal] = useState(value);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebVal(value)
        }, 500);

        return () => clearTimeout(timeout)
    }, [value])

    return debVal
}