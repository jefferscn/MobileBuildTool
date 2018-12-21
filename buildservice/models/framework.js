import mongoose from 'mongoose';
const frameworkSchema = new mongoose.Schema({
    name: String,
    desc: String,
    url:String
  },{
    toJSON:{
        virtuals:true
    }
});

const Framework = mongoose.model('Framework', frameworkSchema);
export default Framework;
export {
    frameworkSchema,
    Framework,
};

