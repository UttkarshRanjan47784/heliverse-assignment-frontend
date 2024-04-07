import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios'
import { setRetrieveNumber, setThisList, setTotalPages, setFilterOn, setSearchOn, setAllOn } from '@/app/ListSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function FilterSection() {

    const [domainInput, setDomainInput] = useState(``)
    const [genderInput, setGenderInput] = useState(``)
    const [availableInput, setAvailableInput] = useState(``)

    const dispatch = useDispatch()
    const retrieveNum = useSelector(state => state.retrieveNumber)

    const handleDomainChange = (event) => { setDomainInput(event.target.value) }
    const handleGenderChange = (event) => { setGenderInput(event.target.value) }
    const handleAvailableChange = (event) => { 
        if (event.target.innerText == "Available")
            setAvailableInput(true)
        if (event.target.innerText == "Clear Filter")
            setAvailableInput(null)
        else
            setAvailableInput(false)
    }

    const handleFilter = async (event) => {
        dispatch(setFilterOn({ newState : true }))
        dispatch(setSearchOn({ newState : false }))
        dispatch(setAllOn({  newState : false }))

        let url = `http://localhost:5000/api/filterusers/?offset=0`
        url = domainInput.length > 0 ? url + `&domain=${domainInput[0].toUpperCase() + domainInput.substring(1)}` : url
        url = genderInput.length > 0 ? url + `&gender=${genderInput[0].toUpperCase() + genderInput.substring(1)}` : url
        url = availableInput != null ? url + `&available=${availableInput}` : url
        
        let response = await axios.get(url)
        if (response.data.stat){
            // setList(response.data.msg)
            dispatch(setThisList({
                newList : response.data.msg
            }))
            if (retrieveNum){
                dispatch(setTotalPages({
                    newTotal : Math.ceil(response.data.num/20)
                }))
                // setRetrieveNum(false)
                dispatch(setRetrieveNumber({
                    newState : false
                }))
            }
        } else {
            alert(`Error Retrieving List of Users \n${response.data.msg}`)
        }
    }

  return (
    <div className='flex justify-center items-center mt-5 px-5 space-x-1'>
        <Input name='domainInput' placeholder='Domain'
        className='text-center' value={domainInput} onChange={handleDomainChange}/>
        <Input name='genderInput' placeholder='Gender'
        className='text-center' value={genderInput} onChange={handleGenderChange}/>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div name='availableInput' placeholder='Availability'
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
