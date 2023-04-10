import { Router } from 'express';
import controller from '../controller/thorshammer';

const router = Router();

router.get('/', (req: any, res: any) => {
    return res.json({message: "Hello World"});
});

router.get('/getPeerCount', controller.getPeerCount);

export = router;