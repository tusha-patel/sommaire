"use client";

import React, { useRef, useState } from 'react'
import UploadFormInput from './upload-form-input'
import { z } from "zod";
import { useUploadThing } from '@/utils/uploading';
import { toast } from "sonner"
import { generatePdfSummary } from '@/actions/upload-actions';

const schema = z.object({
    file: z.instanceof(File, { message: "Invalid File" }).refine((file) => file.size <= 20 * 1024 * 1024, {
        message: "File Size must be less than 20MB "
    }).refine((file) => file.type.startsWith('application/pdf'), "File Must be a PDF")
});



const UploadForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { startUpload } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
            console.log("upload success");
        },
        onUploadError: (err) => {
            console.error(err);
        },
        onUploadBegin: ((file) => {
            console.log('Upload has begun for ', file);
        })
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get("file") as File;

            const validatedFields = schema.safeParse({ file });

            if (!validatedFields.success) {
                toast("Something went wrong", {
                    description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "invalid file",
                })
                setIsLoading(false);
                return
            }

            toast("📃 Processing PDF", {
                description: "Hang tight ! Our AI is reading through your document ! ⭐"
            })

            try {
                const res = await startUpload([file]);

                if (!res) {
                    toast("Something went wrong", {
                        description: "Please use a different file",
                        className: "bg-red-100 text-red-800 border border-red-400"
                    })
                    setIsLoading(false);
                    return
                }

                toast(" ✅ Uploading PDF", {
                    description: "We are uploading your pdf"
                });

                console.log(res);

                // generate summary using lang chain 
                const summary = await generatePdfSummary(res);

                console.log(summary);

                const { data = null, message = null } = summary || {};

                if (data) {
                    toast("Saving PDF...", {
                        description: "Hang tight ! we are saving your summary!"
                    })
                    formRef.current?.reset();
                    if (summary?.success) {

                    }
                }


                if (summary?.success) {
                    toast.success("Summary generated successfully!", {
                        // description: summary.data?.summary || "Summary generated"
                    });
                } else {
                    toast.error("Failed to generate summary", {
                        description: summary?.message || "Unknown error occurred"
                    });
                }

            } catch (error) {
                console.error(error);
                toast.error("An error occurred", {
                    description: "Please try again later"
                });
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("An error occurred", {
                description: "Please try again later"
            });
        }
    }

    return (
        <div className='mt-5 flex flex-col gap-8 w-full max-w-2xl mx-auto'>
            <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} ref={formRef} />
        </div>
    )
}



export default UploadForm;