import { subscribers } from "../globals"

export function publish(type: string, data: unknown) {
    const promises = []
    for (let i=0;i<subscribers.length;i++) {
        promises.push(fetch(`${subscribers[i]}/webhook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type,
                data
            })
        }))
        Promise.all(promises)
    }
}