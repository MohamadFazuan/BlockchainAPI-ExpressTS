"use strict";

import pkg_winston from 'winston';
const { createLogger } = pkg_winston
import { loggerConfig } from '../utils/logger';

const logger = createLogger(loggerConfig());

export async function ok(values: any, res: any) {
    var data = {
        status: 200,
        values: values,
    };
    await logger.info("Responding... : " + JSON.stringify(data));
    res.json(data);
    res.end();
}

export async function fail(values: any, res: any) {
    var data = {
        status: values.code,
        error: values.data,
    };
    await logger.info("Responding... : " + JSON.stringify(data));
    res.status(values.code).json(data);
    res.end();
}
