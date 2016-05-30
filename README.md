# fixture-cases-extract

> Extract test target files from each case directories

## Install

```sh
npm i fixture-cases-extract
```

## Usage

```js
var path = require('path')
var fixtureCasesExtract = require('fixture-cases-extract'),

fixtureCasesExtract({
  basePath: path.join(__dirname, 'fixtures')
  fileMap: {
    actual: 'actual.json',
    expected: 'expected.json',
    options: 'options.json'
  }
})
.forEach(function (testCase) {
  // Mocha tes like
  it('should process' + testCase.name, function(){
    // ...
  })
})
```
