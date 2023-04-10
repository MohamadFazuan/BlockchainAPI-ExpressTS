import { transports, format } from "winston";

export function logConfig(params: any) {
    const logConfig = {
        'transports': [
            new transports.Console(),
            new transports.File({
                filename: './logs/integration_hub.debug.log'
            })
        ],
        'format': format.combine(
            format.label(),
            format.timestamp({
                format: 'DD-MM-YYYY HH:mm:ss'
            }),
            format.simple(),
            format.printf((info) => {
                return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
            })
        )
    }
}

