export const getAuthToken = () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        return token
    }
    else {
        return null
    }
}

export const getRefreshToken = () => {
    const token = localStorage.getItem("refreshToken")
    if (token) {
        return token
    }
    else {
        return null
    }

}

export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token)
}

export const setRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token)
}

export const redirectToLogin = () => {
    window.location.replace("/login")
}

export const clearAuth = () => {
    localStorage.clear()
}