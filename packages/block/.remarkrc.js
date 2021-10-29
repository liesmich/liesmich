module.exports = {
    "settings": {
        "bullet": "*",
        "ruleRepetition": 3,
        "fences": true,
        data: {
            "pkg.name": "test",
            "title": "test"
        }
    },
    "plugins": [
        "remark-toc",
        "remark-parse",
        "remark-gfm",
        ["remark-git-contributors", "level-community"],
        "remark-license",
        "remark-variables"
    ]
}
