export default function loginStatus(status, router) {
    if (status == "unauthenticated") {
        router.push('/login');
        return false
    }
    if (status == "loading") {
        return false 
    }
    return true
}