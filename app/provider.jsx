'use client'

import React, { useContext, useEffect, useState } from 'react'
import { supabase } from './services/supabaseClient'
import { UserDetailsContext } from '@/context/UserDetailContext'

export default function Provider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        createNewUser();
    }, [])

    const createNewUser = () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email);

            console.log("Users", Users)

            if (Users?.length == 0) {
                const { data, error } = await supabase.from("Users").insert([
                    {
                        name: user?.user_metadata?.name,
                        email: user?.user_metadata?.email,
                        picture: user?.user_metadata?.picture
                    }
                ])
                setUser(data)
                console.log("data", data)
            }

            setUser(Users[0]);
        })

    }


    return (
        <UserDetailsContext.Provider value={{ user }}>
            {children}
        </UserDetailsContext.Provider>
    )
}


