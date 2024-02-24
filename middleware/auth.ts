export default defineNuxtRouteMiddleware((to, from) => {
    refreshCookie("token")
    const isToken = !!useCookie('token').value
    const user : any = useCookie('user').value
    
    if (to.path !== "/" && !isToken) {
        return navigateTo("/login")
    }
    if (to.path === "/login" && isToken) {
        return navigateTo(`/profile/${user?.id}`)
    }
})
