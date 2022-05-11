const express = require("express")
const Product = require('../models/Product')
const { body, validationResult } = require('express-validator');
const authuser = require('../middleware/auth');
const Sell = require('../models/sells')
const router = express.Router()

router.post(
    "/createsells",
    authuser,
    [
        body("name", "Enter a valid company name").isLength({ min: 3 }),
        body("phone", "Enter a 10 character ").isLength({ min: 10 }),
        body("email", "Enter a valid email").isEmail(),
        body("address", "Enter a valid Address ").isLength({ min: 3 }),
        body("productname", "Enter a valid product name ").isLength({ min: 3 }),
        body("qwt", "Enter a valid qwantity ").isLength({ max: 10 }),

    ],
    async (req, res) => {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Create a new product
            let sells = await Sell({
                name: req.body.companyName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                productname: req.body.productname,
                qwt:req.body.qwt,
            });
            sells.save();
            // res.json(product)
            res.json({ sells });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
module.exports = router;