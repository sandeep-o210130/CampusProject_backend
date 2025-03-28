const mongoose = require("mongoose")


const walletSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
        balance:{
            type:Number,
            required:true,
            default:0,
        },
        transactions:[
            {
                transactionType:{
                    type:String,
                    enum:['CREDIT','DEBIT'],
                    required:true,
                },
                amount:{
                    type:Number,
                    required:true,
                },
                description:{
                    type:String,
                    required:true,
                },
                date:{
                    type:Date,
                    default:Date.now,
                }
            }
        ]
    },

    {
        timestamps:true,
    }
);

const Wallet = mongoose.model("Wallet",walletSchema);

module.exports = Wallet;