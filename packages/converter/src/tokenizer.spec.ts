/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { expect } from 'chai';
import { fromMarkdown } from 'mdast-util-from-markdown';
import 'mocha';
import { Parent } from 'unist';
import { fromMarkdown as testFromMarkdown } from './from-markdown-extension';
import { liesmichExtension } from './tokenizer';

/**
 * @param tree
 */
function doesContainLiesmich(tree: Parent): boolean {
    if (tree.type === 'liesmich') {
        return true;
    }
    for (const child of tree.children) {
        if (child.type.startsWith('liesmich')) {
            return true;
        }
        if ('children' in child && doesContainLiesmich(child as Parent)) {
            return true;
        }
    }
    return false;
}
// tslint:disable:no-unused-expression
describe('tokenizer.ts', (): void => {
    describe('Tokenizer', (): void => {
        describe('parse without leading or trailing line breaks', (): void => {
            it('should work with consecutive blocks', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }} \n {{lm:other }} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    "type": "root",
                    "children": [
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "text",
                                    "value": "test ",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 1,
                                            "offset": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6,
                                            "offset": 5
                                        }
                                    }
                                },
                                {
                                    "type": "liesmich",
                                    "value": "{{LM:path?key=none }}",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 6,
                                            "offset": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27,
                                            "offset": 26
                                        }
                                    },
                                    "scheme": "LM",
                                    "query": {
                                        "key": "none"
                                    },
                                    "host": "path"
                                },
                                {
                                    "type": "text",
                                    "value": "\n",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 28,
                                            "offset": 27
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 1,
                                            "offset": 28
                                        }
                                    }
                                },
                                {
                                    "type": "liesmich",
                                    "value": "{{lm:other }}",
                                    "position": {
                                        "start": {
                                            "line": 2,
                                            "column": 2,
                                            "offset": 29
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 15,
                                            "offset": 42
                                        }
                                    },
                                    "scheme": "lm",
                                    "host": "other"
                                },
                                {
                                    "type": "text",
                                    "value": " a",
                                    "position": {
                                        "start": {
                                            "line": 2,
                                            "column": 15,
                                            "offset": 42
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 17,
                                            "offset": 44
                                        }
                                    }
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 1,
                                    "column": 1,
                                    "offset": 0
                                },
                                "end": {
                                    "line": 2,
                                    "column": 17,
                                    "offset": 44
                                }
                            }
                        }
                    ],
                    "position": {
                        "start": {
                            "line": 1,
                            "column": 1,
                            "offset": 0
                        },
                        "end": {
                            "line": 2,
                            "column": 17,
                            "offset": 44
                        }
                    }
                });
            });
            it('should work with consecutive blocks with double new line between', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }}\n\n{{lm:other }} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    "type": "root",
                    "children": [
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "text",
                                    "value": "test ",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 1,
                                            "offset": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6,
                                            "offset": 5
                                        }
                                    }
                                },
                                {
                                    "type": "liesmich",
                                    "value": "{{LM:path?key=none }}",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 6,
                                            "offset": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27,
                                            "offset": 26
                                        }
                                    },
                                    "scheme": "LM",
                                    "query": {
                                        "key": "none"
                                    },
                                    "host": "path"
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 1,
                                    "column": 1,
                                    "offset": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27,
                                    "offset": 26
                                }
                            }
                        },
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "liesmich",
                                    "value": "{{lm:other }}",
                                    "position": {
                                        "start": {
                                            "line": 3,
                                            "column": 1,
                                            "offset": 28
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 14,
                                            "offset": 41
                                        }
                                    },
                                    "scheme": "lm",
                                    "host": "other"
                                },
                                {
                                    "type": "text",
                                    "value": " a",
                                    "position": {
                                        "start": {
                                            "line": 3,
                                            "column": 14,
                                            "offset": 41
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 16,
                                            "offset": 43
                                        }
                                    }
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 3,
                                    "column": 1,
                                    "offset": 28
                                },
                                "end": {
                                    "line": 3,
                                    "column": 16,
                                    "offset": 43
                                }
                            }
                        }
                    ],
                    "position": {
                        "start": {
                            "line": 1,
                            "column": 1,
                            "offset": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 16,
                            "offset": 43
                        }
                    }
                });
            });
            it('should work as standalone block', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }}\n\n{{lm:other }}\n\na', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    "type": "root",
                    "children": [
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "text",
                                    "value": "test ",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 1,
                                            "offset": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6,
                                            "offset": 5
                                        }
                                    }
                                },
                                {
                                    "type": "liesmich",
                                    "value": "{{LM:path?key=none }}",
                                    "position": {
                                        "start": {
                                            "line": 1,
                                            "column": 6,
                                            "offset": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27,
                                            "offset": 26
                                        }
                                    },
                                    "scheme": "LM",
                                    "query": {
                                        "key": "none"
                                    },
                                    "host": "path"
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 1,
                                    "column": 1,
                                    "offset": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27,
                                    "offset": 26
                                }
                            }
                        },
                        {
                            "type": "liesmich",
                            "value": "{{lm:other }}",
                            "position": {
                                "start": {
                                    "line": 3,
                                    "column": 1,
                                    "offset": 28
                                },
                                "end": {
                                    "line": 3,
                                    "column": 14,
                                    "offset": 41
                                }
                            },
                            "scheme": "lm",
                            "host": "other"
                        },
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "text",
                                    "value": "a",
                                    "position": {
                                        "start": {
                                            "line": 5,
                                            "column": 1,
                                            "offset": 43
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 2,
                                            "offset": 44
                                        }
                                    }
                                }
                            ],
                            "position": {
                                "start": {
                                    "line": 5,
                                    "column": 1,
                                    "offset": 43
                                },
                                "end": {
                                    "line": 5,
                                    "column": 2,
                                    "offset": 44
                                }
                            }
                        }
                    ],
                    "position": {
                        "start": {
                            "line": 1,
                            "column": 1,
                            "offset": 0
                        },
                        "end": {
                            "line": 5,
                            "column": 2,
                            "offset": 44
                        }
                    }
                });
            });
            it('should work with inline blocks', (): void => {
                const out = fromMarkdown('test {{LM:path?key=none }} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(out).to.deep.equal({
                    children: [
                        {
                            children: [
                                {
                                    position: {
                                        end: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                        start: {
                                            column: 1,
                                            line: 1,
                                            offset: 0,
                                        },
                                    },
                                    type: 'text',
                                    value: 'test ',
                                },
                                {
                                    host: 'path',
                                    position: {
                                        end: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                            offset: 5,
                                        },
                                    },
                                    query: {
                                        key: 'none',
                                    },
                                    scheme: 'LM',
                                    type: 'liesmich',
                                    value: '{{LM:path?key=none }}',
                                },
                                {
                                    position: {
                                        end: {
                                            column: 29,
                                            line: 1,
                                            offset: 28,
                                        },
                                        start: {
                                            column: 27,
                                            line: 1,
                                            offset: 26,
                                        },
                                    },
                                    type: 'text',
                                    value: ' a',
                                },
                            ],
                            position: {
                                end: {
                                    column: 29,
                                    line: 1,
                                    offset: 28,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                    offset: 0,
                                },
                            },
                            type: 'paragraph',
                        },
                    ],
                    position: {
                        end: {
                            column: 29,
                            line: 1,
                            offset: 28,
                        },
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0,
                        },
                    },
                    type: 'root',
                });
            });

            it('should not parse with line break', (): void => {
                const out = fromMarkdown('test {{ \nLM:path?key=none }}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(doesContainLiesmich(out)).to.equal(false);
            });
            it('should not parse with line break', (): void => {
                const out = fromMarkdown('test {{ LM:pa\nth?key=none }}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(doesContainLiesmich(out)).to.equal(false);
            });
            it('should not parse with with spaced leading brackets', (): void => {
                const out = fromMarkdown('test { { LM:pa\nth?key=none }}} a', {
                    extensions: [liesmichExtension],
                    mdastExtensions: [testFromMarkdown],
                });
                expect(doesContainLiesmich(out)).to.equal(false);
            });
        });
    });
});
