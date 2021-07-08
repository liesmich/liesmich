import Markdownit from 'markdown-it';
import Token from 'markdown-it/lib/token';

export const parse = (data: string): Token[] => {
    return new Markdownit().parse(data, undefined);
}
