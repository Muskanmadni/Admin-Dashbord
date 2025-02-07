"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


export function Protectedroute({ children } : { children : React.ReactNode} ){
    const router = useRouter()
    useEffect(() =>{
        const isLoggedin = localStorage.getItem('isloggedin')
        if (!isLoggedin){
            router.push('/admin')
        }
    },[router])
    return <>
    {children}
    </>
}