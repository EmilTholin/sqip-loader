module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-0"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: "sqip-loader",
            options: {
              // numberOfPrimitives: 20,
              // mode: 0,
              // blur: 12,
              // skipPreviewIfBase64: false
            }
          },
          {
            loader: "url-loader",
            options: {
              limit: 8000
            }
          }
        ]
      }
    ]
  }
};
