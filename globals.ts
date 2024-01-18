import { logger } from "./utils/logger"

export let data: Array<Record<string, unknown>> = []
export let subscribers: string[] = []

const originalPush = subscribers.push
subscribers.push = function(...items: string[]): number {
    let length = this.length
    items.forEach(item => {
        let domain = item.split(/\w[\/?#]/)[0]
        domain = item.substring(0, domain.length+1)
        logger.info('REGISTERING DOMAIN - ',domain)
        if (!this.includes(domain)) {
            originalPush.call(this, domain)
            length++
            logger.info('DOMAIN REGISTERED')
        } else {
            logger.info('DOMAIN ALREADY REGISTERED')
        }
    })

    return length
}

export function setData(newData: Array<Record<string, unknown>>) {
    data = newData
}