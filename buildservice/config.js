export default {
    db: {
        uri: 'mongodb://localhost/cordovapack',
        options: {
            // user: 'admin',
            // pass: 'admin',
        },
    },
    server: {
        baseUrl: 'http://1.1.11.85:3001',
        upload: 'http://1.1.11.85:3001/upload',
        download: 'http://1.1.1.11.85:3001/download',
        downloadIpaBase: 'https://dev.bokesoft.com/erpmobile/',
        checkUpdate: 'https://dev.bokesoft.com/erpmobile/checkupdate/',
    },
};
