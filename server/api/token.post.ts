export default defineEventHandler (async (event )=>{
    const {cookie} = await readBody(event)
    setCookie(event , "token" , cookie)
    return 200
})