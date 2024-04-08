import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setSlugSearch, setCurrentPageSearch } from '@/app/ListSlice'


import { Input } from './ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDebounce } from './hooks/useDebounce'

export default function SearchSection() {

    let [qType, setQType] = useState(true)
    let [ip, setIp] = useState(``)
    let backendTrigger = useDebounce(ip)

    const dispatch = useDispatch()

    useEffect(()=>{
        if (backendTrigger.length == 0){
            let slug = ''
            dispatch(setSlugSearch({
                newSlug : slug
            }))
            dispatch(setCurrentPageSearch({
                newPage : 1
            }))
            return
        }
        let slug = `${qType?`fn`:`ln`}/${backendTrigger[0].toUpperCase() + backendTrigger.substring(1)}`
        dispatch(setSlugSearch({
            newSlug : slug
        }))
        dispatch(setCurrentPageSearch({
            newPage : 1
        }))
    }, [backendTrigger, qType])

  return (
    <div className='flex justify-center items-center mt-5 px-5 space-x-1'>
        <Input placeholder={`Search ${qType? `First`:`Last`} Name`} value={ip}
        className='text-center'
        onChange={(event)=>{setIp(event.target.value)}}></Input>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='flex w-24 border border-input h-10 rounded-md justify-center items-center'>{qType?`First Name` : `Last Name`}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>{setQType(true)}}>First Name</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{setQType(false)}}>Last Name</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
