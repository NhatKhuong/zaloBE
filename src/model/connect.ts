import mongoose from 'mongoose';

const connectDB = ()=>{
    mongoose.connect(process.env.db as string).then(e=>{
        console.log('success');        
    }).catch(e=>{
        console.log('fail');
    });
}
export default connectDB