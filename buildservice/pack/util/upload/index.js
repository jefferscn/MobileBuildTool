import request from 'request';
import fs from 'fs';
function upload(url, filePath, contentType) {
    return new Promise((resolve, reject) => {
        const formData = {
            file: {
                value: fs.createReadStream(filePath),
                options:{},
            },
        };
        if(contentType){
            formData.file.options.contentType = contentType;
        }
        request.post({url:url, formData: formData}, (err, httpResponse, body) => {
            if(err){
                reject(err);
            }
            let data = body;
            if(typeof body === 'string'){
                data = JSON.parse(body);
            }
            resolve(data);
        });
    })
}
export default upload;
