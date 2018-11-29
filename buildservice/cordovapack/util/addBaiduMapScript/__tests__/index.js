import path from 'path';
import addBaiduMapScript from '../index';

const htmlPath = path.resolve(__dirname, './index.html');
const pluginList = ['a', 'b', 'c'];

describe('add baidu map script', () => {
    it('empty plugin will not add script', () => {
        expect.assertions(1);
        return addBaiduMapScript(htmlPath, pluginList).then((r) => {
            expect(r).toBe(3);
        });
    });
});
