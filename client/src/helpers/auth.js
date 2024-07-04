export const getAuthToken = () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        return token
    }
    else {
        return null
    }
}

export const redirectToLogin = () => {
    window.location.replace("/login")
}

export const clearAuth = () => {
    localStorage.clear()
}