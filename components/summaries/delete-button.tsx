"use client"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteSummaryAction } from '@/actions/summary-action'
import { toast } from 'sonner'

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();


    const handleDelete = async () => {
        const result = await deleteSummaryAction({ summaryId });

        if (!result.success) {
            toast("Error", {
                description: "Failed to delete summary ",
            });
        }
        setOpen(false);
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}
                        className='text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-5  0  ' >
                        <Trash2 className='w-4 h-4' />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Summary</DialogTitle>
                        <DialogDescription>
                            Are you sure you went to delete this summary ?
                            this action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant={"ghost"} className='bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100 px-3 py-1'
                            onClick={() => setOpen(false)} >Cancel</Button>
                        <Button variant={"destructive"} className='bg-gray-900 hover:bg-gray-600' onClick={handleDelete} >
                            {isPending ? "Deleting" : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteButton