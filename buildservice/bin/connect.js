import mongoose from 'mongoose';
mongoose.Promise = Promise;
function connect(url, opt) {
    mongoose.connect(url, opt)
        .then(
            () => {
                console.log('Database connect success.');
            },
            (err) => {
                console.error()`Mongoose connections error: ${err}`;
                process.exit(1);
            }
        )
}
export default connect;
