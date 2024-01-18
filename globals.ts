export let data: Array<Record<string, unknown>> = []
export let subscribers: string[] = []

export function setData(newData: Array<Record<string, unknown>>) {
    data = newData
}