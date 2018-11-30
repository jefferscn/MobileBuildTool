import multer from 'multer';
import fs from 'fs';
import path from 'path';
var upload = multer({ dest: 'uploads/' });
// const baseUrl = "http://1.1.8.34:3001/download?id=";
const baseUrl = "./download?id=";
export default function bind(app, mongoose) {
    const FileRecordSchema = new mongoose.Schema({
        filename: String,
        mimetype: String,
        path: String
    });
    const FileRecord = mongoose.model('FileRecord', FileRecordSchema);

    app.post('/upload', upload.single('file'), async (req, res) => {
        var fr = new FileRecord();
        fr.filename = req.file.originalname;
        fr.mimetype = req.file.mimetype;
        fr.path = req.file.path;
        try {
            await fr.save();
            var result = {
                success: true,
                filename: fr.filename,
                id: fr.id,
                url: `${baseUrl}${fr.id}`
            }
            res.json(result).end();
        } catch (ex) {
            res.json({
                success:false,
                message:ex.message
            })
        }
    });
    app.get('/download', async (req, res) => {
        var fr = await FileRecord.findById(req.query.id);
        if (fr) {
            var file = path.resolve(__dirname, fr.path);
            var filename = fr.filename;
            var mimetype = fr.mimetype;
            var newFileName = encodeURIComponent(filename);
            res.setHeader('Content-Disposition', 'inline;filename*=UTF-8\'\'' + newFileName);
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
            return;
        }
        res.status(404).end();
    })
    app.get('/download/:id', async (req, res) => {
        var fr = await FileRecord.findById(req.params.id);
        if (fr) {
            var file = path.resolve(__dirname, fr.path);
            var filename = fr.filename;
            var mimetype = fr.mimetype;
            var newFileName = encodeURIComponent(filename);
            res.setHeader('Content-Disposition', 'inline;filename*=UTF-8\'\'' + newFileName);
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
            return;
        }
        res.status(404).end();
    })

}