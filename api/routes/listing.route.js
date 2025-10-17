import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing)
router.post('/test', (req, res) => {
    res.json({ message: "Test route works!" });
});

export default router;