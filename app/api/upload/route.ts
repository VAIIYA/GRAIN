import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (
                pathname,
                /* clientPayload */
            ) => {
                // Here you can check for user session/auth
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // This will run on your server after the file is uploaded
                console.log('blob upload completed', blob, tokenPayload);

                try {
                    // Here you would typically update your database
                    // Since we are using server actions in the component, 
                    // we might just handle the DB update there after the client gets the URL.
                } catch (error) {
                    throw new Error('Could not update user');
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The error quickly helps you debug but don't expose sensitive errors in production
        );
    }
}
