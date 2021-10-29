import { resolve as pathResolve } from 'path';//= require('path').resolve;

export default {
    entry: ['./assets/test.md'],
    output: {
        filename: '[name][hash].json',
        path: pathResolve('./dist'),
    },
    module: {
        rules: [
            {
                // Only apply these loaders to manifest.json.
                test: /\.md$/i,
                // Loaders are applied in reverse order.
                use: [
                    /*
                    (asdf): string => {
                        console.log("aaa");
                        return 'asdf'
                    },*/
                    "json-loader",
                    {
                        loader: pathResolve('./test')
                    }
                ]
            }
        ]
    }
}
