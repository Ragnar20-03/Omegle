import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const Room = () => {
    const [ searchparam , setSearchParam] = useSearchParams()
    const name = searchparam.get("name")

    useEffect( () =>{

    } , [name]) 
    return <div>
        <input type="text" name="" id=""  onChange={(e) => {
            // setN
        }}/>
        Room
    </div>
}