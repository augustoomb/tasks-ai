'use server'
 
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'

export async function getCookie(key: string) {
    const cookieStore = await cookies();
    const hasCookie = await cookieStore.has(key)

    if (!hasCookie) {
        return null
    } 
    const assistantId: RequestCookie | undefined = await cookieStore.get(key);

    return assistantId?.value;
}

export async function setCookie(key: string, value: string) {
    cookies().set(key, value, { path: '/' })
}

export async function deleteCookie(key: string) {
    cookies().set(key, '', { expires: new Date(0) });
    cookies().delete(key)
}
