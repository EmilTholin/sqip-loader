var loaderUtils = require("loader-utils");
var validateOptions = require("schema-utils");
var sqip = require("sqip");
var schema = require("./options.json");

// https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
function encodeSvgDataUri(svg) {
  var uriPayload = encodeURIComponent(svg)
    .replace(/%0A/g, "")
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'");

  return "data:image/svg+xml," + uriPayload;
}

module.exports = function(contentBuffer) {
  if (this.cacheable) {
    this.cacheable(true);
  }

  var options = loaderUtils.getOptions(this) || {};

  validateOptions(schema, options, "SQIP Loader");

  var content = contentBuffer.toString("utf8");
  var filePath = this.resourcePath;
  var contentIsUrlExport = /^module.exports = "data:(.*)base64,(.*)/.test(content);
  var contentIsFileExport = /^module.exports = (.*)/.test(content);
  var src = "";

  if (contentIsUrlExport) {
    src = content.match(/^module.exports = (.*)/)[1];
    if (options.skipPreviewIfBase64) {
      return 'module.exports = { "src": ' + src + ', "preview": "" };';
    }
  } else {
    if (!contentIsFileExport) {
      var fileLoader = require("file-loader");
      content = fileLoader.call(this, contentBuffer);
    }
    src = content.match(/^module.exports = (.*);/)[1];
  }

  var numberOfPrimitives = "numberOfPrimitives" in options ? parseInt(options.numberOfPrimitives, 10) : 20;
  var mode = "mode" in options ? parseInt(options.mode, 10) : 0;
  var blur = "blur" in options ? parseInt(options.blur, 10) : 12;
  var sqipResult = sqip({
    filename: filePath,
    numberOfPrimitives: numberOfPrimitives,
    mode: mode,
    blur: blur
  });
  var encodedSvgDataUri = encodeSvgDataUri(sqipResult.final_svg);
  var dimensions = JSON.stringify(sqipResult.img_dimensions)

  return 'module.exports = { "src": ' + src + ' , "preview": "' + encodedSvgDataUri + '", "dimensions": ' + dimensions + ' };';
};

module.exports.raw = true;
