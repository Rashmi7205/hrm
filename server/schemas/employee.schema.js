import mongoose ,{Schema} from 'mongoose';

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    dept_name: { type: String, required: true },
    date_of_joining: { type: Date, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    passport_no: { type: String },
    passport_exp_date: { type: Date,},
    dob: { type: Date, required: true },
    documents: { type: [String], },
    bank_info: { type: [mongoose.Schema.Types.ObjectId], ref: 'BankInfo',},
    experience: {type:[
        {
            company_name: String, 
            designation: String,
            from: Date,
            to: Date,
            desc:String
        }
    ]},
    leaves: { type: [mongoose.Schema.Types.ObjectId], ref: 'Leave' },
  },{timestamps:true});


  const BankInfoSchema = new Schema({
    name_of_bank: { type: String, required: true },
    pan_no: { type: String,},
    ifsc_no: { type: String, required: true },
  },{timestamps:true});
  
export const BankInfo = mongoose.model('BankInfo', BankInfoSchema);
export default mongoose.model('Employee', EmployeeSchema);
  