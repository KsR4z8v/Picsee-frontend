const usePosts = () => {
    const url = import.meta.env.VITE_API_URL

    return {
        get: async (callback, querys) => {

            try {
                let q = []
                for (const i in querys) {
                    if (querys[i]) {
                        q.push(`${i}=${querys[i]}`)
                    }
                }
                const token = window.sessionStorage.getItem('session') ? JSON.parse(window.sessionStorage.getItem('session')).token : undefined

                const resp = await fetch(url + `post${q.length > 0 ? '?' + q.join('&') : ''}`, { headers: token ? { auth: token } : {} });
                const data = await resp.json()
                if (resp.ok) {
                    callback(data)
                } else {
                    console.log(data);
                }

            } catch (error) {
                callback(undefined, error.message)
            }
        }
        ,
        like: async (callback, postId) => {
            try {
                const token = JSON.parse(window.sessionStorage.getItem('session'))?.token
                const resp = await fetch(url + `post/${postId}/like`, { method: 'POST', headers: { auth: token } })
                if (resp.status != 429 && resp.status != 204) {
                    callback(undefined, 'No pudimos guardar tu like')
                }
            } catch (error) {
                callback(error.message)
            }
        },
        upload: async (callback, files) => {
            try {
                const form = new FormData()
                const tags = []
                for (let i = 0; i < files.length; i++) {
                    form.append('photos', files[i])
                    tags.push(files[i].tags)
                }

                form.append('tags', JSON.stringify(tags))

                const token = JSON.parse(window.sessionStorage.getItem('session')).token
                const resp = await fetch(url + 'post', {
                    method: 'POST',
                    headers: { 'auth': token },
                    body: form
                })
                const data = await resp.json()
                /*   if (resp.ok) {
                      return callback(data.images)
                  } */
                if (data.error.code === 13) {
                    callback(undefined, 'Ups algo ha salido mal')
                }

            } catch (e) {
                callback(e.message)
            }

        }
    }
}


export default usePosts