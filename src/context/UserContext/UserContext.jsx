import React, { createContext, useMemo, useState } from "react";

export const UserContext = createContext({
    auth: false,
    setAuth: () => {},
});

export function UserProvider({ children }) {
    const [auth, setAuth] = useState(false);

    const userValue = useMemo(
        () => ({
            auth,
            setAuth,
        }),
        [auth]
    );

    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
}
