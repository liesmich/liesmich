const { readFileSync, writeFileSync } = require('fs-extra');
const glob = require('glob');
const packages = glob.sync('./packages/*/package.json');
const outObject = {};
const rows = [['Name', 'Version']];
packages.forEach((package) => {
    const content = JSON.parse(readFileSync(package));
    rows.push([content.name, content.version]);
});
outObject.package_table = rows;
writeFileSync('./temp_readme.json', JSON.stringify(outObject));
