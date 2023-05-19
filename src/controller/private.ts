import { Response, Request } from 'express';
import Web3 from 'web3';
import { createLogger } from 'winston';
import { config } from 'dotenv';
config();
import { ok, fail } from '../utils/result';
import { loggerConfig } from '../utils/logger';

const web3 = new Web3(process.env.PRIVATE_NODE_URL ?? '');

const log = createLogger(loggerConfig());

//NON-TRANSACTION
const getPeerCount = async (req: Request, res: Response) => {
    log.info('getPeerCount requested');
    try {
        web3.eth.net.getPeerCount().then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getBlockNumber = async (req: Request, res: Response) => {
    log.info('getBlockNumber requested');
    try {
        web3.eth.getBlockNumber().then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getBalance = async (req: Request, res: Response) => {
    log.info('getBalance requested');

    const { body } = req;

    try {
        web3.eth.getBalance(body.address).then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getTransactionReceipt = async (req: Request, res: Response) => {
    log.info('getTransactioReceipt requested');

    const { body } = req;

    try {
        web3.eth.getTransactionReceipt(body.trxhash).then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getTransactionCount = async (req: Request, res: Response) => {
    log.info('getTransactionCount requested');

    const { body } = req;

    try {
        web3.eth.getTransactionCount(body.trxhash).then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getChainId = async (req: Request, res: Response) => {
    log.info('getChainID requested');

    try {
        web3.eth.getChainId().then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getEstimateGas = async (req: Request, res: Response) => {
    log.info('getEstimateGas requested');

    const { body } = req;

    try {
        web3.eth.estimateGas(body).then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}

const getTransactionByHash = async (req: Request, res: Response) => {
    log.info('getTransactionReceipt requested');

    const { body } = req;

    try {
        web3.eth.getTransaction(body.hash).then((result) => {
            ok(result, res);
        }).catch((err) => {
            fail(err, res);
        })
    } catch (error) {
        fail(error, res);
    }
}


//TRANSACTION
const call = async (req: Request, res: Response) => {
    log.info('call requested');

    const { body } = req;

    try {
        var contract = new web3.eth.Contract(body.abi, body.contractAddress);

        var params = JSON.stringify(body.param);
        // using call method
        var userMethod = "contract.methods." + body.method +
            "(" + params.substring(1, params.length - 1) + ")" + ".call()";

        const call = await eval(userMethod);
        ok(call, res);
    } catch (error) {
        fail(error, res);
    }
}

const encodeABISC = async (req: Request, res: Response) => {
    log.info('encodeABISC');

    const { body } = req;

    try {
        var contract = new web3.eth.Contract(body.abi, body.contractAddress);

        var userMethod = "contract.deploy({ data: '" + '0x' + body.bytecode + "'," + 'arguments: ' + JSON.stringify(body.argument) + '}).encodeABI()';

        var userEncodeAbi = await eval(userMethod);
        ok(userEncodeAbi, res);
    } catch (error) {
        fail(error, res);
    }
}

const encodeABIFunctionSC = async (req: Request, res: Response) => {
    log.info('encodeABIFunctionSC');

    const { body } = req;

    try {
        var contract = new web3.eth.Contract(req.body.abi, req.body.contractAddress);
        var params = JSON.stringify(req.body.param);

        var userMethod = 'contract.methods.' + req.body.method + '(' + params.substring(1, params.length - 1) + ')' + '.encodeABI()';
        // console.log('userMethod : ', userMethod)
        var userEncodeAbi = await eval(userMethod);

        ok(userEncodeAbi, res);
    } catch (error) {
        fail(error, res);
    }
}

const sendSignedTransaction = async (req: Request, res: Response) => {
    log.info('sendSignedTransaction requested');

    const { body } = req;

    try {
        web3.eth.sendSignedTransaction(body.serializeTx).then((result) => {
            ok(result, res);
        });
    } catch (error) {
        fail(error, res);
    }
}

const sendEther = async (req: Request, res: Response) => {
    log.info('sendEther requested');

    const { body } = req;

    try {
        web3.eth.sendTransaction({
            to: body.to,
            from: body.from,
            value: web3.utils.toWei(body.value, "ether")
        }).then((result) => {
            ok(result, res);
        });
    } catch (error) {
        fail(error, res);
    }
}


export default { getPeerCount, getBlockNumber, getBalance, getTransactionReceipt, getTransactionCount, getChainId, getEstimateGas, getTransactionByHash, call, sendSignedTransaction, sendEther }