"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

interface IUserContext {
    user: null | any
    setUser: Dispatch<SetStateAction<null | any>>
}

interface IUserProviderProps {
    children: ReactNode
}

const UserContext = createContext<IUserContext>({
    user: null,
    setUser: (user: any) => null
})

const UserProvider = ({ children }: IUserProviderProps) => {
    const [user, setUser] = useState<null | any>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }