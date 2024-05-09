export const local = {
    set: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value || ''))
    },
    get: (key: string) => {
        let json = localStorage.getItem(key);
        return JSON.parse(json as string);
    },
    remove: (key: string) => {
        localStorage.removeItem(key)
    },
    clear: () => {
        localStorage.clear()
    }
}
export const sesison = {
    set: (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    get: (key: string) => {
        return JSON.parse(sessionStorage.getItem(key) || '{}')
    },
    remove: (key: string) => {
        sessionStorage.removeItem(key)
    },
    clear: () => {
        sessionStorage.clear()
    }
}