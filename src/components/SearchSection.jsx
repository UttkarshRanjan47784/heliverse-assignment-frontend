import React, { useState } from 'react'
import { Input } from './ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SearchSection() {

    let [qType, setQType] = useState(`First Name`)

  return (
    <div className='flex justify-center items-center mt-5 px-5 space-x-1'>
        <Input placeholder={`Search ${qType} Name`}
        className='text-center'></Input>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='flex w-24 border border-input h-10 rounded-md justify-center items-center'>{qType}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>{setQType(`First Name`)}}>First Name</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{setQType(`Last Name`)}}>Last Name</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
