import React from 'react'
import { useNavigate } from 'react-router-dom'

import {Menu} from 'lucide-react'
import { ModeToggle } from './mode-toggler'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSlugSearch } from '@/app/ListSlice'

export default function () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleHeadChange = (event) => {
        event.preventDefault();
        switch (event.target.innerText){
            case 'Home' : navigate('/');
            break;
            case 'Find People' :
            dispatch(setSlugSearch({
                newSlug : ``
            }))
            navigate('/search');
            break;
            case 'Filter' : navigate ('/filter');
            break;
            case 'Build Team' :
            dispatch(setSlugSearch({
                newSlug : ``
            }))
            navigate('/buildteam');
            break
            case 'View Teams' :
            navigate('/viewteams');
            break
            default : navigate('/')
        }
    }

  return (
    <div className='flex items-center justify-between px-3 border-b border-input h-14'>
    <div className='hidden md:flex items-center h-full'>
        <div className='pacifico-regular mr-3 text-xl h-full flex items-center'>Team Builder</div>
        <div className='hidden cursor-pointer text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'
        onClick={handleHeadChange}>Home</div>
        <div className='hidden cursor-pointer text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'
        onClick={handleHeadChange}>Find People</div>
        <div className='hidden cursor-pointer text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'
        onClick={handleHeadChange}>Filter</div>
        <div className='hidden cursor-pointer text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'
        onClick={handleHeadChange}>Build Team</div>
        <div className='hidden cursor-pointer text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'
        onClick={handleHeadChange}>View Teams</div>
    </div>
    <div className='md:hidden flex items-center h-full'>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <SheetHeader>
                    <SheetTitle><div className='pacifico-regular mr-3 text-3xl h-full flex items-center'>Team Builder</div></SheetTitle>
                </SheetHeader>
                <SheetFooter className='mt-10'>
                <SheetClose asChild>
                    <div className="mt-10 grid gap-4 py-4">
                        <div className='font-medium p-3 h-full md:flex items-center hover:bg-muted'>Home</div>
                        <div className='font-medium p-3 h-full md:flex items-center hover:bg-muted'>Find People</div>
                        <div className='font-medium p-3 h-full md:flex items-center hover:bg-muted'>Filter</div>
                        <div className='font-medium p-3 h-full md:flex items-center hover:bg-muted'>Build Team</div>
                        {/* <Button type="submit">Upload</Button> */}
                    </div>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
    <div className='flex items-center space-x-2'>
        <ModeToggle />
    </div>
    </div>
  )
}
