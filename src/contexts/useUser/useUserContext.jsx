import { useQuery } from "@tanstack/react-query"
import React, { createContext, useEffect, useState } from "react"
import { getAccount } from "../../apiCall/get"
import { useLocation } from "react-router-dom"
import { StringParam, useQueryParam } from "use-query-params"


export const UserProvider = createContext()

const UserContext = ({children}) => {
    const [token , setToken] = useQueryParam('token' , StringParam)
    const [sId , setSid] = useQueryParam('s_id' , StringParam)
    const location = useLocation()
    const Path = location?.pathname
    
    const handleGetDefaultUser = (key) => {
        var newUser = window.localStorage.getItem(key)
        if(newUser){
            newUser = JSON.parse(newUser)
        }
        return newUser || null
    }

    const [userAdmin , setUserAdmin] = useState(handleGetDefaultUser('user-admin'))
    const [user , setUser] = useState(handleGetDefaultUser('user'))

    const {data, isLoading} = useQuery({
        queryKey: ['user-account'],
        queryFn: async () => {
            const res = await getAccount()
            return res
        },
        staleTime: Infinity,
        enabled: userAdmin ? true : false
    })

    
    useEffect(() => {
    if (Path.startsWith("/admin") && !token && !sId) {
      if (data?.meta?.user_logged_in == false) {
        window.localStorage.removeItem("user-admin");
        window.location = '/admin/login'
      }
    }
    }, [Path, data]);


    return(
        !isLoading && 
        <UserProvider.Provider value={{user , userAdmin , setUserAdmin , setUser}}>
            {children}
        </UserProvider.Provider>
    )

}

export default UserContext