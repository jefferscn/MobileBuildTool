import svn from './svn';

const dayang = {
    svnUrl: 'http://1.1.2.17:8000/svn/yes/yes-mobile-pack/IOS/%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85%E9%9B%86/%E5%A4%A7%E6%B4%8B%E7%94%B5%E6%9C%BA/yesapp/',
    svnUsername: 'zhouzy',
    svnPassword: 'zhouzy',
    version: '1.0.0',
};
const ke = {
    svnUrl: 'http://1.1.2.17:8000/svn/yes/yes-mobile-pack/IOS/yesapp/',
    svnUsername: 'zhouzy',
    svnPassword: 'zhouzy',
    version: '1.0.0',
};
const { svnUrl, svnUsername, svnPassword } = dayang;
svn.get(svnUrl, svnUsername, svnPassword);
