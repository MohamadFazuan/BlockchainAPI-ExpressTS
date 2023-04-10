import Web3 from 'web3';
import { createLogger } from 'winston';
import dotenv from 'dotenv';
dotenv.config();
import * as axios from 'axios';
import { logConfig } from '../utils/logger';

const log = createLogger(logConfig('blockchainAppsApi.ts')!)

const web3 = new Web3(process.env.PRIVATE_NODE_URL ?? '');

const getPeerCount = async (req: any, res: any) => {
    log.info('getPeerCount requested');
    web3.eth.net.getPeerCount().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({ status: 400, message: err })
    })
}

export default { getPeerCount }