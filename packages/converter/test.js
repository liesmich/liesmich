// A loader to transform a partial manifest.json file into a complete

const { join } = require("path");

async function importMod(path) {
    return new Promise((resolve, reject) => {
        this.importModule(path, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
}
async function loadMod(path) {
    return new Promise((resolve, reject) => {
        this.loadModule(path, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
}
async function walkTree(cur) {
    if ('children' in cur) {
        for (const child of cur.children) {
            await walkTree.bind(this)(child);
        }
    }
    if (cur.type === 'image') {
        const resolved = await this.importModule(cur.url + "?format=webp");
        cur.url = resolved['default'].src;
        cur.srcSet = resolved['default'].srcSet;
        cur.images = resolved['default'].images;
        //this.emitWarning('ju' + JSON.stringify(resolved['default'].src));
    }
    return cur;
}
// manifest.json file by adding entries from an NPM package.json.
module.exports = function (source) {
    const done = this.async();
    const emitWarning = this.emitWarning;
    if (this.resourcePath.endsWith('/test3.md')) {
        done(null, source);
        return;
    }
    const data = JSON.parse(source);
    this.emitFile(`[context]/kk.${data.hash}.json`, source, {});
    this.emitWarning("KK" + data);
    walkTree.bind(this)(data)
        .then((res) => {
            done(null, JSON.stringify(res));
        })
        .catch(done);

    //this.emitWarning(new Error('kk' + this.resourcePath));
    /*this.loadModule('./test.png?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048', (err, res) => {
        if (err) {
            done(err);
        } else {
            this.emitWarning(new Error(res));
            done(null, source);
        }
    });*/
};
