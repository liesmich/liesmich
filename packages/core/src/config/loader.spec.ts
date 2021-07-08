/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { expect } from 'chai';
import fs from 'fs/promises';
import 'mocha';
import { resolve } from 'path';
import Sinon from 'sinon';
import { CircularExtensionError, loadConfig } from './loader';

describe('templates/encoder', (): void => {
    let sandbox: Sinon.SinonSandbox;
    let fsReadStub: Sinon.SinonStub;
    before((): void => {
        sandbox = Sinon.createSandbox();
        fsReadStub = sandbox.stub(fs, 'readFile');
    });
    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('encoder', (): void => {
        it('should work without line breaks', async (): Promise<void> => {
            fsReadStub.withArgs(resolve('./path/1.json')).resolves(JSON.stringify({ a: true }));
            const result2: any = await loadConfig('./path/1.json');
            expect(result2).to.deep.equal({
                a: true,
                extends: [
                    "path\\1.json"
                ]
            });
            expect(fsReadStub.callCount).to.equal(1);
        });
        it('should work without line breaks', async (): Promise<void> => {
            fsReadStub.withArgs(resolve('./path/1.json')).resolves(JSON.stringify({ extends: ['./b.json'], a: false }));
            fsReadStub.withArgs(resolve('./path/b.json')).resolves(JSON.stringify({ a: true }));
            const result2: any = await loadConfig('./path/1.json');
            expect(result2).to.deep.equal({
                a: false,
                extends: [
                    "path\\1.json",
                    "path\\b.json"
                ]
            });
            expect(fsReadStub.callCount).to.equal(2, 'two config files were called');
        });
        it('should merge multiple extension files without line breaks', async (): Promise<void> => {
            fsReadStub.withArgs(resolve('./path/1.json')).resolves(JSON.stringify({ extends: ['./b.json', './z.json'], a: false }));
            fsReadStub.withArgs(resolve('./path/b.json')).resolves(JSON.stringify({ a: true }));
            fsReadStub.withArgs(resolve('./path/z.json')).resolves(JSON.stringify({ k: 2 }));
            const result2: any = await loadConfig('./path/1.json');
            expect(result2).to.deep.equal({
                a: false,
                extends: [
                    "path\\1.json",
                    "path\\b.json",
                    "path\\z.json"
                ],
                k: 2,
            });
            expect(fsReadStub.callCount).to.equal(3, 'three config files were called');
        });
        it('should extend single provided config', async (): Promise<void> => {
            fsReadStub.withArgs(resolve('./path/1.json')).resolves(JSON.stringify({ extends: './2.json', a: false }));
            fsReadStub.withArgs(resolve('./path/2.json')).resolves(JSON.stringify({ b: 5 }));
            const result2: any = await loadConfig('./path/1.json');
            expect(result2).to.deep.equal({
                a: false,
                b: 5,
                extends: [
                    "path\\1.json",
                    "path\\2.json"
                ],
            });
            expect(fsReadStub.callCount).to.equal(2, 'three config files were called');
        });
        it('should detect circular config files', (): Promise<void> => {
            fsReadStub.withArgs(resolve('./path/1.json')).resolves(JSON.stringify({ extends: ['./b.json'], a: false }));
            fsReadStub.withArgs(resolve('./path/b.json')).resolves(JSON.stringify({ extends: ['./1.json'], a: true }));

            return loadConfig('./path/1.json')
                .then((): void => {

                })
                .catch((err: any): void => {
                    expect(err).to.be.instanceOf(CircularExtensionError);
                })
        });
    });
});
