import { currentUser } from '@clerk/nextjs/server';
import { UploadThingError } from 'uploadthing/server';
// import type { FileRouter } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: '32MB' } })
        .middleware(async ({ req }) => {
            // Get current authenticated user
            const user = await currentUser();
            if (!user) throw new UploadThingError('Unauthorized');

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // console.log('Upload completed for user:', metadata.userId);

            // You can store file info in database here if needed
            // return { userId: metadata.userId, file };
            return {
                userId: metadata.userId,
                fileUrl: file.ufsUrl,     
                fileName: file.name,   
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
