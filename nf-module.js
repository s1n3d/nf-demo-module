import path from 'path';
import { api as nfApi, config } from '@nfjs/core';

const meta = {
    require: {
        after: '@nfjs/back'
    }
};

const __dirname = path.join(path.dirname(decodeURI(new URL(import.meta.url).pathname))).replace(/^\\([A-Z]:\\)/, "$1");
let menu = await nfApi.loadJSON(__dirname+'/menu.json');

async function init() {}

export {
    init,
    meta,
    menu
};