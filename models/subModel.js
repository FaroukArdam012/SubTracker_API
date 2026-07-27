import mongoose from "mongoose";
const subSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,"The subscription name must be passed"],
        trim: true,
        minLength:[2,'name characters must be higher than 2'],
        maxLength:100
    },
    price:{
        type: Number,
        required:[true,"A price of the subscription must be added"],
        min:[1, 'Price must be higher than 0'],
    },
    currency:{
        type: String,
        enum:['USD','EUR','GBP','NGN'],
        default:'NGN',

    },
    frequency:{
        type: String,
        enum:['daily', 'weekly','monthly', 'yearly'],

    },
    categories:{
        type: String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics', 'others'],
        required:[true,"A category must be entered"]
    },
    paymentMethod:{
        type:String,
        required:[true,'A payment method must be stated'],
        trim:true,
        minLength:[3, 'character must be greater than 3'],
        maxLength:25,

    },
    status:{
        type: String,
        enum:['active', 'cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required: true,
        validate: {
            validator:(value)=>value< new Date,
            message:'Start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
    
        validate: {
            validator:function(value){
                return value> this.startDate;
            },
            message: "Renewal date must be after the start date"

        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        index: true
    }


},{timestamps: true});
// auto-calculate renewal date if missing
subSchema.pre('save', function () {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
});





const Subscription= mongoose.model("Subscription", subSchema);
export default Subscription;