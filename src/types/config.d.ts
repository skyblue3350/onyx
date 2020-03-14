export interface Organization {
    name: string
    api: string
    accessToken: string
    interval: number
}

export interface Stream {
    name: string
    query: string
    icon: string
    color: string
    notification: true
    organizationName: string
}