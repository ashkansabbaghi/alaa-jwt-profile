export default defineNuxtRouteMiddleware((to, from) => {
    refreshCookie("token")
    const isToken = !!useCookie('token').value
    console.log(isToken);
    
    
    if (to.path !== "/" && !isToken) {
        return navigateTo("/login");
    }
    if (to.path === "/login" && isToken) {
        return navigateTo("/profile/ashkan")
    }
})
