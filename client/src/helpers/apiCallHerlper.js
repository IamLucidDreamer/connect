import axios from "axios"


export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.post('/auth/refresh-token', { refreshToken })
    const { accessToken } = response.data
    return accessToken
  } catch (error) {
    console.error('Error refreshing token', error)
    localStorage.clear()
    window.location.reload()
    return null
  }
}
