// prettier-ignore
module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true,
        "jest/globals": true
    },
    extends: [
        "plugin:vue/recommended",
        "airbnb-base",
        "plugin:jest/recommended"
    ],
    plugins: [
        "vue",
        "jest"
    ],
    rules: {
        "arrow-parens": "off",
        "generator-star-spacing": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": "off",
        "implicit-arrow-linebreak": "off",
        "indent": ["error", 4, {"SwitchCase": 1}],
        "linebreak-style": 0,
        "max-len": ["error", {"code": 140}],
        "no-param-reassign": "off",
        "no-plusplus": "off",
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/html-indent": ["error", 4],
        "operator-linebreak": "off",
    }
}
