import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CircleUserRound } from 'lucide-react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'

export default function TeamBuilder() {

    const memberList = useSelector(state => state.newGroupMemberList)

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

    const handleNewGroup = (event) => {
        event.preventDefault()
        if (memberList.length < 2){
            console.log(`Group must contain atleast 2 people`)
            return
        }
    }

  return (
    <div className='m-5 p-5 border border-input'>
        <h1>Team</h1>
        {renderGroup}
        <div className='flex justify-center items-center mt-5'>
            <Button className='mx-auto' onClick={handleNewGroup}>Add Group</Button>
        </div>
    </div>
  )
}
