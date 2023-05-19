import { transports, format } from "winston";

export function loggerConfig() {
    const logConfig = {
        'transports': [
            new transports.Console(),
            new transports.File({
                filename: './logs/integration_hub.debug.log'
            })
        ],
        'format': format.combine(
            format.label(),
            format.colorize(),
            format.timestamp({
                format: 'DD-MM-YYYY HH:mm:ss'
            }),
            format.simple(),
            format.printf((info) => {
                return `${info.timestamp} - BCAPI-EXpressTS:[${info.level}]: ${info.message}`;
            })
        )
    }

    return logConfig;
}

