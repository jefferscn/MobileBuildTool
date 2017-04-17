import winston from 'winston';
import moment from 'moment';
function Logger(fileName) {
    return new winston.Logger({
        transports: [
            new (winston.transports.File)({
                filename: fileName,
                timestamp: () => {
                    return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
                },
                formatter: function(options) {
                    return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
                        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
                }
            })
        ]
    });
}
export default Logger;