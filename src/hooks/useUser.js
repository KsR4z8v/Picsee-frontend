import crypto from 'crypto-js'

const useUser = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        sign: async (callback, credentials) => {
            try {
                const resp = await fetch(url + 'auth/sign', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(credentials)
                })
                const data = await resp.json()
                if (resp.ok) {
                    callback(data)
                } else {
                    //console.log(data.error);
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
        updatePassword: async (callback, password, hash) => {
            try {
                const token = crypto.AES.decrypt(hash, import.meta.env.VITE_SECRET_HASH).toString(crypto.enc.Utf8)
                const resp = await fetch(url + 'auth/resetPass', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', 'auth': token },
                    body: JSON.stringify({ password })
                })
                if (resp.status !== 204) {
                    return callback(undefined, 'Error al actualziar la contraseña')
                }
                callback(undefined)
            } catch (error) {
                console.log(error.message);
                callback(undefined, error.message)
            }
        },
        recoverPassword: async (callback, email) => {
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
        }

    }
}

export default useUser