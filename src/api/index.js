import qs from "qs";

export const DOMAIN = 'http://localhost:3001'


class ApiCall {
    constructor(domain) {
        this.domain = domain
    }

    async perform(url, data, config) {
        const req =  await fetch(`${this.domain}${url}`, {
            ...config,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return await req.json()
    }


    async get(path, searchParams = {}) {
        return await this.perform(`${path}?${qs.stringify(searchParams)}`)
    }

    async post(path, payload) {
        return await this.perform(path, payload, {
            method: "POST"
        })

    }

    async put(path, payload) {
        return await this.perform(path, payload, {
            method: "PUT"
        })
    }

    async delete(path) {
        return await this.perform(path, {
            method: "DELETE"
        })
    }

}

export default new ApiCall(DOMAIN)

