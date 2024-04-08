import React, { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch } from 'react-redux'
import { setCurrentPageFilter, setSlugFilter } from '@/app/ListSlice'

export default function FilterSection() {

    const [domainInput, setDomainInput] = useState(``)
    const [genderInput, setGenderInput] = useState(``)
    const [availableInput, setAvailableInput] = useState(``)

    const fieldAva = useRef()

    const dispatch = useDispatch()

    const handleDomainChange = (event) => { setDomainInput(event.target.value) }
    const handleGenderChange = (event) => { setGenderInput(event.target.value) }
    const handleAvailableChange = (event) => { 
        if (event.target.innerText == "Available"){
            
            fieldAva.current.className='text-center text-muted-foreground rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-10 bg-green-500 text-primary'
            fieldAva.current.innerText = 'Available'
            setAvailableInput(`true`)
        }
        else if (event.target.innerText == "Clear Filter"){
            fieldAva.current.className='text-center text-muted-foreground rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-10'
            fieldAva.current.innerText = 'Availability'
            setAvailableInput(``)
        }
        else{
            fieldAva.current.className='text-center text-muted-foreground rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-10 bg-red-500 text-primary'
            
            fieldAva.current.innerText = 'Unavailable'
            setAvailableInput(`false`)
        }
    }

    const handleFilter = async (event) => {
        let slug = ''
        slug = domainInput.length > 0 ? slug + `&domain=${domainInput[0].toUpperCase() + domainInput.substring(1)}` : slug
        slug = genderInput.length > 0 ? slug + `&gender=${genderInput[0].toUpperCase() + genderInput.substring(1)}` : slug
        slug = availableInput.length > 0 ? slug + `&available=${availableInput}` : slug
        dispatch(setSlugFilter({
            newSlug : slug
        }))
        dispatch(setCurrentPageFilter({
            newPage : 1
        }))
    }

  return (
    <div className='flex justify-center items-center mt-5 px-5 space-x-1'>
        <Input name='domainInput' placeholder='Domain'
        className='text-center' value={domainInput} onChange={handleDomainChange}/>
        <Input name='genderInput' placeholder='Gender'
        className='text-center' value={genderInput} onChange={handleGenderChange}/>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div name='availableInput' placeholder='Availability' ref={fieldAva}
                className='text-center text-muted-foreground rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-10'>Availability</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleAvailableChange}>Clear Filter</DropdownMenuItem>
                <DropdownMenuItem onClick={handleAvailableChange}>Available</DropdownMenuItem>
                <DropdownMenuItem onClick={handleAvailableChange}>Unavailable</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={handleFilter}>Filter</Button>
    </div>
  )
}
