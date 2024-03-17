import { useCallback, useState } from "react";

export const useAuth = () => {
    const [userId, setUserId] = useState();
    const [token, setToken] = useState();
    
    const logIn = useCallback((uId, token) => {
        setUserId(uId);
        setToken(token);
    }, [])
    
    const logOut = useCallback(() => {
        setUserId(null);
        setToken(null);
    }, [])

    return [ logIn, logOut, userId, token ];
}