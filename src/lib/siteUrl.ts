import { url } from "inspector"

export function getSiteUrl(){
// my url

    if(process.env.SITE_URL) return process.env.SITE_URL

    // backup url
if(process.env.VERCEL_PROJECT_PRODUCTION_URL){
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
}
throw new Error('SITE URL IS NOT SET')
}