export default defineEventHandler (async (event )=>{
    const {cookie} = await readBody(event)
    setCookie(event , "user" , cookie)
    return 200
})