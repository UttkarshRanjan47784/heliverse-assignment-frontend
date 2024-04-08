import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CircleUserRound } from 'lucide-react'
import axios from 'axios'
import {useDispatch} from 'react-redux'

import { setNewGroupMemberList, setNewGroupDomainList, setNewGroupIDList } from '@/app/ListSlice'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import x from '@/app/helper'

export default function TeamBuilder() {

    const memberList = useSelector(state => state.newGroupMemberList)
    const domainList = useSelector(state => state.newGroupExhaustedDomains)
    const IDList = useSelector(state => state.newGroupMemberIDList)

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(memberList)
    }, [memberList])

    const renderGroup = memberList.map((item)=>{
        return <Accordion type="single" collapsible key={`member-${item.id}-${Math.random()}`}>
                    <AccordionItem value={`member-${item.id}-${Math.random()}`}>
                        <AccordionTrigger>
                        <Avatar className='inline-block size-8 '>
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback><CircleUserRound /></AvatarFallback>
                        </Avatar>
                            <div>{`${item.first_name} ${item.last_name} - ${item.domain}`}</div>
                        </AccordionTrigger>
                            <AccordionContent className='text-center text-muted-foreground'>
                                {`ID : ${item.id} - ${item.email} - ${item.gender}`}
                            </AccordionContent>
                    </AccordionItem>
                </Accordion>
    })

    const handleNewGroup = async (event) => {
        event.preventDefault()
        if (memberList.length < 2){
            alert(`Group must contain atleast 2 people`)
            return
        }
        let gname = prompt(`Enter Group Name`)
        if (gname.length == 0){
            alert(`Group name cannot be empty`)
            return
        }
        gname = gname[0].toUpperCase() + gname.substring(1);
        let group = {
            groupName : gname,
            groupMembers : memberList,
            groupDomains : domainList,
            groupIDs : IDList
        }
        console.log(group)
        let response = await axios.post(`${x}/api/team`, group)
        if (!response.data.stat){
            alert(`Op Failed : ${response.data.msg}`)
            return
        }
        if (response.data.stat){
            dispatch(setNewGroupMemberList({
                newList : []
            }))
            dispatch(setNewGroupDomainList({
                newList : []
            }))
            dispatch(setNewGroupIDList({
                newList : []
            }))
        }
    }

  return (
    <div className='m-5 p-5 border border-input'>
        <h1 className='text-center'>Team</h1>
        {renderGroup}
        <div className='flex justify-center items-center mt-5'>
            <Button className='mx-auto' onClick={handleNewGroup}>Add Group</Button>
        </div>
    </div>
  )
}
