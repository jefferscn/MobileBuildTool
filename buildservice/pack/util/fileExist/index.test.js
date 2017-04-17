import fileExist from './index';
fileExist('log/58ef424b65fa56de3457f58c.log')
    .then((d) => {
        console.log(d);
    })
    .catch((d) => {
        console.log(d);
    });
