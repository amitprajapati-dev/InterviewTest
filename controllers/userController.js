const User = require("../models/userModel.js");
const creditModel = require("../models/creditModel.js");
const debitModel = require("../models/debitModel.js");



// create user...........
module.exports.createUser = async (req,res) => {
    try{
        const {name , id} = req.body;
        
        if(!name || !id ){
            return res.status(404).json({
            success : false,
            message : "Please enter the all the data"
        })

        const user = await User.creat(req.body);

        return res.status(201).json({
            success : true,
            message : "user created successfully"
        });

    }
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

// credit
module.exports.CreditUserWallet = async(req,res) => {
    try{
        const {transactionId, userId} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        }

        if(user.amount <= 0){
            return res.status(403).json({
                success : false,
                message : "User amount must be greater 0"
            })
        }

        if(user.amount > 10000000){
            return res.status(401).json({
                success : false,
                messsage : "invalid amount"
            })
        }

        const transaction  = await creditWallet.findById(transactionId);

        if(!transaction){
            return res.status(404).json({
                success : false,
                message : "transaction not found"
            })
        }

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

// debit 
module.exports.DebitUserWallet = async(req,res) => {
    try{

        const {transactionId, type, balance} = req.body;
        const transaction = await debitModel.findById(transactionId);

        if(transaction > 1){
            return res.json({
                success : false,
                message : "Dublicate transaction"
            })
        }
        
        if(!transaction){
            return res.status(404).json({
                success : false,
                message : "There is no transaction"
            })
        }

        if(balance < 0){
            return res.status(503).json({
                success : false,
                message : "Balance can't be 0"
            })
        }

        if(type === "FAILED"){
            return res.json({
                success : false,
                message : "Failed transacetion can't be modify"
            })
        }

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}



// add balance 


module.exports.addBalance = async (req,res) => {
    try{
        const { id }  req.params;
        const {balance} = req.body;

        const user = await User.findById(id);

         if(!user){
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        }


        if(!balance){
            return res.json({
            success : false,
            message : "Please enter balance"
        })

        const user = await User.findOneAndUpdate({id}, {balance});

        return res.status(201).json({
            success : true,
            message : "balance added successfully"
        });

    }
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}




// transaction history..................

module.exports.seeAllTransaction = async (req,res) => {
    try{
        
        const { id }  req.params;

        const user = await User.findById(id);

         if(!user){
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        }

        const transaction = await creditModel.findById(id);

        if(!transaction){
            return res.status(404).json({
                success : false,
                message : "There is no transaction"
            })
        }

        return res.status(201).json({
            success : true,
            data : transaction
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}






// transaction reverse...

module.exports.transactionReverse = async (req,res) => {
    try{
        
        const { transactionId }  req.params;

        const user = await User.findById(transactionId);

         if(!user){
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        }

        const transaction = await creditModel.findById(id);

        if(!transaction){
            return res.status(404).json({
                success : false,
                message : "There is no transaction"
            })
        }


        if(transaction.type === "REVERSAl"){
            return res.json({
                success : false,
                message : "Transaction can't be reverse twice"
            });
        }

        const reverseTransaction = await creditModel.findByIdAndUpdate({transactionId}, {type : "REVERSAl"});

        return res.status(201).json({
            success : true,
            data : transaction
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}


