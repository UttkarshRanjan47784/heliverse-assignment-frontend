import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import x from '@/app/helper';

import { setViewGroup, setNumberGroups } from '@/app/ListSlice'; 
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ViewTeamsPage() {

    const groups = useSelector(state => state.viewGroupList)
    const numGroups = useSelector(state => state.numberGroups)
    const dispatch = useDispatch()

    async function retrieveGroups (){
        let response = await axios.get(`${x}/api/team`);
        if (response.data.stat){
            dispatch(setViewGroup({
                newList : response.data.msg
            }))
            dispatch(setNumberGroups({
                newNum : response.data.num
            }))
        } else {
            alert(`Op failed : ${response.data.msg}`);
            return;
        }
    }

    useEffect(()=>{
        retrieveGroups()
    }, [])

    const renderGroups = groups.map((item) => {
        return <Accordion type="single" collapsible key={item.groupName}>
                    <AccordionItem value={`group-${item.groupName}`}  className='text-center'>
                        <AccordionTrigger >{`${item.groupName}`}</AccordionTrigger>
                            <AccordionContent className='text-center'>
                                {item.groupMembers.map((member)=>{
                                    return <div className='flex items-center justify-center border border-input p-3' key={item.groupName+member.id}>
                                        <Avatar>
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className='text-center text-xs text-muted-foreground ml-10'>
                                            {`ID : ${member.id} - ${member.first_name} ${member.last_name} - ${member.domain} - ${member.email} - ${member.gender}`}
                                        </div>
                                    </div>
                                })}
                            </AccordionContent>
                        </AccordionItem>
                </Accordion>
    })

  return (
    <div className='p-5'>
        <h1 className='text-xl text-center'>{`Number of Teams : ${numGroups}`}</h1>
        {renderGroups}
    </div>
  )
}
