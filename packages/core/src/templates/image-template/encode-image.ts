/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { IConfig } from '../../config';

export interface IImage {
    alt: string;
    title?: string;
    src: string;
}
export const encodeImage = (cfg: IConfig, data: IImage): string => {
    return `![${encodeURIComponent(data.alt)}](${data.src}${data.title ? ` "${encodeURIComponent(data.title)}"` : ''})`;
};
