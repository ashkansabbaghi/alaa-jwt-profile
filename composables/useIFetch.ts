export const useIFetch = async (url: any, isAuth: any, method: any = "GET", body: any) => {
    console.log(url , body);
    
    const token = isAuth ? useCookie('token').value : null;
    const headers: { [key: string]: string } = {};

    if (isAuth && token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const { data, error, status } = await useLazyFetch(url, {
        headers,
        method,
        body
    })

    return { data, error, status }
}
