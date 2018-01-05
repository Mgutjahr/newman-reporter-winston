# Newman winston reporter
A newman reporter that logs test results using [winston](https://www.npmjs.com/package/winston). 

Assertion errors are logged with log-level `error`

Passed assertions are logged with log-level `info`

## Install
Currently, the pagacke needs to be installed from GitHub: 
```
npm install --save https://github.com/Mgutjahr/newman-reporter-winston/tarball/master
```

## Configure 
Simply add `winston` as reporter. You can configure the winston reporter using the `reporter.winston` object. 

```js
newman.run({
    collection: "your-collection.json",
    reporters: 'winston',
    reporter: {
      winston: { // any options under winston are passed to winston's Logger constructor 
        level: 'info'
      }
    }
})
```
