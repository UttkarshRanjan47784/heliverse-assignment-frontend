import React from 'react'
import {Menu} from 'lucide-react'
import { ModeToggle } from './mode-toggler'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'

export default function () {
  return (
    <div className='flex items-center justify-between px-3 border-b border-input h-14'>
    <div className='hidden md:flex items-center h-full'>
        <div className='pacifico-regular mr-3 text-xl h-full flex items-center'>Team Builder</div>
        <div className='hidden text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'>Home</div>
        <div className='hidden text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'>Find People</div>
        <div className='hidden text-xs font-medium px-3 h-full md:flex items-center hover:bg-muted'>Teams</div>
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
                <div className="mt-10 grid gap-4 py-4">
                    <div className='font-medium px-3 h-full md:flex items-center hover:bg-muted'>Home</div>
                    <div className='font-medium px-3 h-full md:flex items-center hover:bg-muted'>Find People</div>
                    <div className='font-medium px-3 h-full md:flex items-center hover:bg-muted'>Teams</div>
                </div>
                <SheetFooter className='mt-10'>
                <SheetClose asChild>
                    <Button type="submit">Upload</Button>
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