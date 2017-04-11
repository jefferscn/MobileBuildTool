import pack from './pack.ios';
const fakeData = {
    projectId: '001',
    version: '0.0.1',
    project: {
        id: '001',
        name: '大洋小蜜蜂',
        desc: '{简介}',
        ios: {
            svn: {
                url: 'http://1.1.2.17:8000/svn/yes/yes-mobile-pack/IOS/%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85%E9%9B%86/%E5%A4%A7%E6%B4%8B%E7%94%B5%E6%9C%BA/yesapp/',
                userName: 'zhouzy',
                password: 'zhouzy',
            },
            mobileProvision: '{todo}',
        },
    },
};
pack(fakeData);
