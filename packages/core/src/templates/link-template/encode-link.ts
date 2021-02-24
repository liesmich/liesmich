import { IConfig } from "../../config";
export interface IReferenceLink {
    ref: string | number;
    inline?: string;
}
export interface ILink {
    url: string;
    title?: string;
    inline: string;
}
export type Link = ILink
    | IReferenceLink;
export const encodeLink = (cfg: IConfig, link: Link): string => {
    if ('url' in link) {
        return `[${link.inline}](${link.url}${link.title ? ` "${link.title}"` : ''})`
    } else {
        return `${link.inline ? `[${link.inline}]` : ''}[${link.ref}]`
    }
}
