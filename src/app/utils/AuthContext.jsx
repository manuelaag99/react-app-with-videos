"use client"
const { createContext, useState, useCallback, useContext } = require("react");

const AuthContext = createContext({
    isLoggedIn: false,
    uId: null,
    token: null,
    login: () => {},
    logout: () => {}
});

export function AuthProvider ({ children }) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ userId, setUserId ] = useState();
    const [ token, setToken ] = useState();

    const logIn = useCallback((uId, token) => {
        setUserId(uId);
        setToken(token);
    }, [])

    const logOut = useCallback(() => {
        setToken(null);
        setUserId(null);
    }, [])


    return (
        <AuthContext.Provider value={{ isLoggedIn: token, token: token, userId: userId, login: logIn, logout: logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

// export { AuthContext, AuthProvider }

export function useAuthContext () {
    return useContext(AuthContext);
}