import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setListSearch, setCurrentPageSearch, nextCurrentPageSearch, prevCurrentPageSearch, setTotalPagesSearch } from '@/app/ListSlice';
import {setNewGroupName, addNewGroupMember, addNewGroupDomain, addNewGroupMemberID} from '@/app/ListSlice';
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {Check, X, CircleUserRound} from 'lucide-react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { Button } from './ui/button';

export default function DisplayTeamBuilder() {

    let list = useSelector(state => state.listSearch)
    const dispatch = useDispatch()
    const curPage = useSelector(state => state.currentPageSearch)
    const allPages = useSelector(state => state.totalPagesSearch)
    const slugSearch = useSelector(state => state.slugSearch)

    const groupMembers = useSelector(state => state.newGroupMemberList)
    const groupDomains = useSelector(state => state.newGroupExhaustedDomains)
    const groupIDs = useSelector(state => state.newGroupMemberIDList)

    async function retrieveList (off){
        let url = `http://localhost:5000/api/searchusers/` + slugSearch + `?offset=${off}`
        let response = await axios.get(url);
        console.log(response.data)
        if (response.data.stat){
            dispatch(setListSearch({
                newList : response.data.msg
            }))
            dispatch(setTotalPagesSearch({
                newTotal : Math.ceil(response.data.num/20)
            }))
        } else {
            alert(`Error Retrieving List of Users \n${response.data.msg}`)
        }
    }
    async function retrieveListAll (off){
        let response = await axios.get(`http://localhost:5000/api/users?offset=${off}`);
        if (response.data.stat){
            dispatch(setListSearch({
                newList : response.data.msg
            }))
            dispatch(setTotalPagesSearch({
                newTotal : Math.ceil(response.data.num/20)
            }))
        } else {
            alert(`Error Retrieving List of Users \n${response.data.msg}`)
        }
    }

    useEffect(()=>{
        let off = (curPage - 1) * 20
        if (slugSearch.length == 0){
            retrieveListAll(off)
        } else {
            retrieveList(off)
        }
    }, [curPage, slugSearch])

    const handleCurPageChange = (event) => {
        dispatch(setCurrentPageSearch({
            newPage: Number(event.target.id)
        }));
        window.scroll(0,0)
    }

    const handleAddTeamMember = (event) => {
        event.preventDefault()
        let arr = event.target.id.split('$')
        console.log(arr)
        if (groupIDs.includes(arr[0])){
            alert(`Cannot same person twice`);
            return
        }
        if (groupDomains.includes(arr[5])){
            alert(`Cannot add multiple persons from same domain`)
            return
        }
        dispatch(addNewGroupMemberID({
            newID : Number(arr[0])
        }))
        dispatch(addNewGroupDomain({
            newDomain : arr[5]
        }))

        let temp =  {
            id : arr[0],
            first_name : arr[1],
            last_name : arr[2],
            email : arr[3],
            gender : arr[7],
            avatar : arr[6],
            domain : arr[5],
            available : arr[4]
        }

        dispatch(addNewGroupMember({
            newMember : temp
        }))
    }

    const renderList = list.map((item)=>{
        return <div key={item._id} id={`${item.id}/${item.first_name}/${item.last_name}/${item.email}/${item.available}/${item.domain}/${item.avatar}/${item.gender}`}>
            <Card  className='border border-input overflow-hidden hover:scale-105'>
            <CardHeader className='grid grid-cols-8 space-x-3 items-center'>
                <Avatar className='inline-block size-8 '>
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback><CircleUserRound /></AvatarFallback>
                </Avatar>
                <div className='col-span-7 text-sm'>
                    {`${item.first_name} ${item.last_name}`}
                    <CardDescription className='col-span-7 text-xs'>{`${item.email}`}</CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between text-xs">
                <div>{item.gender}</div>
                <div>{item.domain}</div>
                <div>{item.available? <Check className='size-5 text-green-600'/> : <X className='size-5 text-red-500'/>}</div>
                <Button className={`size-10 h-8 `}
                id={`${item.id}$${item.first_name}$${item.last_name}$${item.email}$${item.available}$${item.domain}$${item.avatar}$${item.gender}`} onClick={handleAddTeamMember} disabled={!item.available}>+</Button>
            </CardFooter>
        </Card>
        </div>
    })

    const renderPageBtns = [...Array(allPages)].map((item, index)=>{
        if (index == 0)
            return <button key={`AllPage${index}${Math.random()}`}
            className={curPage - 1 == index? `bg-muted px-3 py-1`:null} id={`${index+1}`} onClick={handleCurPageChange}>{index+1}</button>
        if (index >= curPage-5 && index < curPage+5){
            return <button key={`AllPage${index}${Math.random()}`}
            className={curPage - 1 == index? `bg-muted px-3 py-1`:null} id={`${index+1}`} onClick={handleCurPageChange}>{index+1}</button>
        }
        if (index == curPage-6 || index ==curPage+5){
            return <button key={`AllPage${index}${Math.random()}`}>...</button>
        }
        if (index == allPages-1)
            return <button key={`AllPage${index}${Math.random()}`}
            className='p-3' id={`${index+1}`} onClick={handleCurPageChange}>{index+1}</button>

        else
            return null
    })

    const renderPageBtnsSmall = [...Array(allPages)].map((item, index)=>{
        if (index == 0)
            return <button key={`AllPage${index}${Math.random()}`}
            className='p-3' id={`${index+1}`} onClick={handleCurPageChange}>{index+1}</button>
        if (index == allPages-1)
            return <button key={`AllPage${index}${Math.random()}`}
            className='p-3' id={`${index+1}`} onClick={handleCurPageChange}>{index+1}</button>
        if (index >= curPage-2 && index < curPage+2){
            return <button key={`AllPage${index}${Math.random()}`}
            className={curPage - 1 == index? `bg-muted px-3 py-1`:null} id={`${index+1}`} onClick={handleCurPageChange}>{index+1}</button>
        }
        if (index == curPage-6 || index ==curPage+5){
            return <button key={`AllPage${index}${Math.random()}`}>...</button>
        }

        else
            return null
    })

    const handleNextPage = (event)=>{
        event.preventDefault()
        dispatch(nextCurrentPageSearch())
        window.scroll(0,0)
    }
    
    const handlePrevPage = (event)=>{
        event.preventDefault()
        dispatch(prevCurrentPageSearch())
        window.scroll(0,0)
    }

  return (
    <div className='p-5 space-y-5'>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {renderList}
        </div>
        <div className='hidden row-span-1 md:flex justify-center items-center space-x-5'>
            <Button onClick={handlePrevPage} disabled={(curPage-1 <= 0)}>Prev</Button>
            {renderPageBtns}
            <Button onClick={handleNextPage} disabled={(curPage+1 > allPages)}>Next</Button>
        </div>
        <div className='md:hidden row-span-1 flex justify-center items-center space-x-2'>
            <Button onClick={handlePrevPage} disabled={(curPage-1 <= 0)}>Prev</Button>
            {renderPageBtnsSmall}
            <Button onClick={handleNextPage} disabled={(curPage+1 > allPages)}>Next</Button>
        </div>
    </div>
  )
}
