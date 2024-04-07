import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import {Check, X} from 'lucide-react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { Button } from './ui/button';

export default function DisplayAll() {

    let [list, setList] = useState([]);

    async function retrieveList (){
        let response = await axios.get('http://localhost:5000/api/users?offset=0');
        if (response.data.stat){
            setList(response.data.msg)
        } else {
            alert(`Error Retrieving List of Users \n${response.data.msg}`)
        }
    }

    useEffect(()=>{
        retrieveList()
    }, [])

    const renderList = list.map((item)=>{
        return <Card key={item._id} className='border border-input overflow-hidden hover:scale-105'>
            <CardHeader className='grid grid-cols-8 space-x-3 items-center'>
                <Avatar className='inline-block size-8'>
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
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

  return (
    <div className='p-5 space-y-5'>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {renderList}
        </div>
        <div className='row-span-1 flex justify-center items-center border border-input space-x-5'>
            <button>Prev</button>
            <button>Next</button>
        </div>
    </div>
  )
}
