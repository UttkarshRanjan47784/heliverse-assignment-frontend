import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setListFilter, setCurrentPageFilter, nextCurrentPageFilter, prevCurrentPageFilter, setTotalPagesFilter } from '@/app/ListSlice';
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

export default function DisplayFiltered() {

    let list = useSelector(state => state.listFilter)
    const dispatch = useDispatch()
    const curPage = useSelector(state => state.currentPageFilter)
    const allPages = useSelector(state => state.totalPagesFilter)
    const slugFilter = useSelector(state => state.slugFilter)
    // const retrieveNum = useSelector(state => state.retrieveNumberHome)

    
    // const listF = useSelector(state => state.listFilter)
    // const curPageF = useSelector(state => state.currentPageFilter)
    // const totPageF = useSelector(state => state.totalPagesFilter)

    async function retrieveList (off){
        console.log(slugFilter)
        let url = `http://localhost:5000/api/filterusers?offset=${off}` + slugFilter
        let response = await axios.get(url);
        if (response.data.stat){
            dispatch(setListFilter({
                newList : response.data.msg
            }))
            dispatch(setTotalPagesFilter({
                newTotal : Math.ceil(response.data.num/20)
            }))
        } else {
            alert(`Error Retrieving List of Users \n${response.data.msg}`)
        }
    }

    useEffect(()=>{
        let off = (curPage - 1) * 20
        retrieveList(off)
    }, [curPage, slugFilter])

    const handleCurPageChange = (event) => {
        dispatch(setCurrentPageFilter({
            newPage: Number(event.target.id)
        }));
        window.scroll(0,0)
    }

    const renderList = list.map((item)=>{
        return <Card key={item._id} className='border border-input overflow-hidden hover:scale-105'>
            <CardHeader className='grid grid-cols-8 space-x-3 items-center'>
                <Avatar className='inline-block size-8'>
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
            </CardFooter>
        </Card>
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
        dispatch(nextCurrentPageFilter())
        window.scroll(0,0)
    }
    
    const handlePrevPage = (event)=>{
        event.preventDefault()
        dispatch(prevCurrentPageFilter())
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
