class Logger {
    log(message: unknown[]) {
        console.log(...message)
    }
    info(...message: unknown[]) {
        this.log(message)
    }
    error(...message: unknown[]) {
        this.log(message)
    }
    warn(...message: unknown[]) {
        this.log(message)
    }
}

export const logger = new Logger()