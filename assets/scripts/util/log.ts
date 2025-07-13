export class Logger {
    private static colors = {
        reset: '\x1b[0m',
        error: '\x1b[31m',
        warn: '\x1b[33m',
        info: '\x1b[36m',
        debug: '\x1b[32m'
    };

    static error(message: any, ...args: any[]) {
        this.log('ERROR', this.colors.error, message, ...args);
    }

    static warn(message: any, ...args: any[]) {
        this.log('WARN', this.colors.warn, message, ...args);
    }

    static info(message: any, ...args: any[]) {
        this.log('INFO', this.colors.info, message, ...args);
    }

    static debug(message: any, ...args: any[]) {
        this.log('DEBUG', this.colors.debug, message, ...args);
    }

    private static log(level: string, color: string, message: any, ...args: any[]) {
        const timestamp = new Date().toISOString();
        console.log(
            `${color}[${timestamp}] [${level}]${this.colors.reset} ${message}`,
            ...args
        );
    }
}
