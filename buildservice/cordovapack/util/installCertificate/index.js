import p12 from 'p12';
import fs from 'fs-extra-promise';
import download from '../download';

async function installCertificate(url, password) {
    const file = 'temp.p12';
    try {
        await download(url, file);
        await p12(file, password);
    } finally {
        await fs.remove(file);
    }
}

export default installCertificate;
