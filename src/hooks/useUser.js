import crypto from 'crypto-js'

const useUser = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        sign: async (callback, credentials, platform = false) => {
            try {
                const resp = await fetch(url + `auth/${platform ? 'platform' : 'sign'}`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(credentials)
                })
                const data = await resp.json()
                if (resp.ok) {
                    callback(data)
                } else {
                    if (data.error.code === 17) {
                        callback(undefined, 'Lo sentimos, pero no encontramos ninguna cuenta con ese nombre de usuario o correo electrónico.')
                    }
                    if (data.error.code === 14) {
                        callback(undefined, 'Contraseña incorrecta')
                    }
                }

            } catch (error) {
                callback(undefined, error.message)
            }
        },
        resetPassword: async (callback, password, hash) => {
            try {
                const token = crypto.AES.decrypt(hash, import.meta.env.VITE_SECRET_HASH).toString(crypto.enc.Utf8)
                const resp = await fetch(url + 'auth/resetPass', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', 'auth': token },
                    body: JSON.stringify({ password })
                })
                if (resp.status !== 204) {
                    return callback(undefined, 'Error al actualizar la contraseña.')
                }
                callback(undefined)
            } catch (error) {
                callback(undefined, error.message)
            }
        }, updatePassword: async (callback, data) => {
            try {
                const session = window.sessionStorage.getItem('session')
                const token = session ? JSON.parse(session).token : import.meta.env.VITE_API_ACCESS_TOKEN
                const resp = await fetch(url + 'user/password', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', 'auth': token },
                    body: JSON.stringify(data)
                })

                if (resp.status !== 204) {
                    const dataRes = await resp.json()
                    return callback(undefined, dataRes.error.message)
                }
                callback(undefined)
            } catch (error) {
                callback(undefined, error.message)
            }
        },
        recoverPasswordLink: async (callback, email) => {
            try {
                const resp = await fetch(url + 'auth/recoverPass', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', },
                    body: JSON.stringify({ email })
                })
                if (resp.status !== 204) {
                    return callback(undefined, 'Ups no se pudo enviar el correo de recuperacion')
                }
                callback(undefined)
            } catch (error) {
                callback(undefined, error.message)
            }
        },
        create: async (callback, userData) => {
            try {
                const resp = await fetch(url + 'user', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    callback(data)
                } else {
                    if (data.error.code === 10) {
                        return callback(undefined, `El ${data.error.message} ya esta en uso`)
                    }
                    callback(undefined, data.error.details)
                }
            } catch (error) {
                callback(undefined, error.message)
            }
        },
        getUser: async (username, cb) => {
            try {
                const session = window.sessionStorage.getItem('session')
                const token = session ? JSON.parse(session).token : import.meta.env.VITE_API_ACCESS_TOKEN
                const resp = await fetch(`${url}user/${username}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: { 'auth': token },
                    credentials: 'include'
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    cb(data)
                } else {
                    if (data.error.code === 10) {
                        return cb(undefined, `El ${data.error.message} ya esta en uso`)
                    }
                    if (data.error.code === 17) {
                        return cb(undefined, `El usuario no fue encontrado.`)
                    }
                    cb(undefined, data.error)

                }

            } catch (error) {
                cb(undefined, error.message)
            }
        }
        , async updateUserInfo(cb, userData) {
            try {
                const session = window.sessionStorage.getItem('session')
                const token = session ? JSON.parse(session).token : undefined
                const dataKeys = Object.keys(userData)
                const formData = new FormData()
                if (userData.socialLinks) {
                    const links = userData.socialLinks.split(',')
                    for (let j = 0; j < links.length; j++) {
                        formData.append('socialLinks', links[j])
                    }
                    formData.append('socialLinks', ' ')
                    delete userData.socialLinks
                }
                for (let i = 0; i < dataKeys.length; i++) {

                    const key = dataKeys[i]
                    if (userData[key]) {
                        formData.append(key, userData[key])
                    }

                }

                const resp = await fetch(url + 'user', {
                    method: 'PATCH',
                    mode: 'cors',
                    headers: { 'auth': token },
                    body: formData
                })
                if (resp.status !== 204) {
                    return cb(undefined, 'Error al actualizar los datos del usuario.')
                }
                cb('ok')
            } catch (error) {
                cb(undefined, error.message)
            }

        }

    }
}

export default useUser