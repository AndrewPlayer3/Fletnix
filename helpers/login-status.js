export default function loginStatus(status, router, do_route) {
    if (status == 'unauthenticated' && do_route) {
        router.push('/login')
        return false
    } else if (status == 'unauthenticated') {
        return false
    } else if (status == 'loading') {
        return false
    }
    return true
}
