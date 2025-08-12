"use client";

import React, { useRef, useState } from 'react'
import UploadFormInput from './upload-form-input'
import { z } from "zod";
import { useUploadThing } from '@/utils/uploading';
import { toast } from "sonner"
import { generatePdfSummary, generatePdfText, storePdfSummaryAction } from '@/actions/upload-actions';
import { useRouter } from 'next/navigation';
import { formatFileNameAsTitle } from '@/utils/format-utils';

const schema = z.object({
    file: z.instanceof(File, { message: "Invalid File" }).refine((file) => file.size <= 20 * 1024 * 1024, {
        message: "File Size must be less than 20MB "
    }).refine((file) => file.type.startsWith('application/pdf'), "File Must be a PDF")
});



const UploadForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
        setIsLoading(true);

        try {
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

            const uploadResponse: any = await startUpload([file]);
            console.log(uploadResponse, "upload response");
            if (!uploadResponse) {
                toast("Something went wrong", {
                    description: "Please use a different file",
                    className: "bg-red-100 text-red-800 border border-red-400"
                })
                setIsLoading(false);
                return
            }
            toast("📃 Processing PDF", {
                description: "Hang tight ! Our AI is reading through your document ! ⭐"
            });

            const uploadFileUrl = uploadResponse[0].serverData.fileUrl;
            console.log(uploadFileUrl);


            try {
                toast(" ✅ Uploading PDF", {
                    description: "We are uploading your pdf"
                });

                let storeResult: any;
                formRef.current?.reset();

                const formattedFileName = formatFileNameAsTitle(file.name);

                const result = await generatePdfText({ fileUrl: uploadFileUrl });
                const summaryResult = await generatePdfSummary({
                    pdfText: result?.data?.pdfText ?? ' ',
                    fileName: formattedFileName,
                });

                toast("📃 Saving PDf summary ", {
                    description: "Hang tight ! we are saving your summary!"
                })

                const { data = null, success, message = null } = summaryResult || {};
                if (data?.summary) {
                    storeResult = await storePdfSummaryAction({
                        fileUrl: uploadFileUrl,
                        summary: data.summary,
                        title: data.title,
                        fileName: formattedFileName,
                    });

                    toast("✨ Summary Generated !", {
                        description: "your PDF has been successfully summarized and saved "
                    })
                }
                router.push(`/summaries/${storeResult.id}`)

                formRef.current?.reset();


                if (success) {
                    toast.success("Summary generated successfully!", {
                        description: message || "Summary generated"
                    });
                } else {
                    toast.error("Failed to generate summary", {
                        description: message || "Unknown error occurred"
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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='mt-5 flex flex-col gap-8 w-full max-w-2xl mx-auto'>
            <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} ref={formRef} />
        </div>
    )
}



export default UploadForm;