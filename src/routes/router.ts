import { Router } from 'express';
import controller from '../controller/private';

const router = Router();

router.get('/', (req: any, res: any) => {
    return res.json({ message: "Hello World" });
});

router.get('/getPeerCount', controller.getPeerCount);
router.get('/getBlockNumber', controller.getBlockNumber);
router.get('/getChainId', controller.getChainId);
router.post('/getBalance', controller.getBalance);
router.post('/getTransactionReceipt', controller.getTransactionReceipt);
router.post('/getTransactionCount', controller.getTransactionCount);
router.post('/getEstimateGas', controller.getEstimateGas);
router.post('/getTrasanctionByHash', controller.getTransactionByHash);
router.post('/call', controller.call);
router.post('/sendEther', controller.sendEther);
router.post('/sendRawTransaction', controller.sendSignedTransaction);

export = router;