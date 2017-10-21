[![npm][npm]][npm-url]
# SQIP Loader
Loads images and exports tiny SQIP previews as image/svg+xml URL-encoded data

## Prerequisites
* You need to have [Golang installed][golang-url].
* You need to have [Primitive installed][primitive-url].

## Install
```bash
npm install --save-dev sqip-loader
```

## Usage
The `sqip-loader` loads your image and exports the url of the image as `src` and the image/svg+xml URL-encoded data as `preview`.

```js
import { src, preview } from './image.png';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'sqip-loader',
            options: {
	      numberOfPrimitives: 20
	    }
          }
        ]
      }
    ]
  }
}
```
It can also be used in conjunction with [url-loader][url-loader] or [file-loader][file-loader].

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'sqip-loader',
            options: {
	      numberOfPrimitives: 20
	    }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

## Options
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`numberOfPrimitives`**|`{Number}`|`20`|SQIP works by first approximating the image with a certain number of shapes, specified by `numberOfPrimitives`, and then adding a blur effect to it. Larger values will generate sharper previews, but will also increase the size|
|**`skipPreviewIfBase64`**|`{Boolean}`|`false`|If set to `true`, will not generate a preview if the image already is base64 encoded. Useful when the inlined base64 representation is enough, and you don't want to bloat your files with unused previews|

[npm]: https://img.shields.io/npm/v/sqip-loader.svg
[npm-url]: https://npmjs.com/package/sqip-loader
[golang-url]: https://golang.org/doc/install
[primitive-url]: https://github.com/fogleman/primitive
[file-loader]: https://github.com/webpack-contrib/file-loader
[url-loader]: https://github.com/webpack-contrib/url-loader
