const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  const isDevelopment = argv.mode === "development";
  return {
    output: {
      publicPath: "http://localhost:4002/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devtool: isDevelopment ? "source-map" : false,

    devServer: {
      port: 4002,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env.REACT_APP_MUI_LICENSE": JSON.stringify(
          process.env.REACT_APP_MUI_LICENSE,
        ),
      }),
      new ModuleFederationPlugin({
        name: "Todo",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./Todo": "./src/components/todo.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          "@nxg-web/web-platform": {
            singleton: true,
          },
          "@mui/material": { singleton: true, requiredVersion: "*" },
          "@emotion/react": { singleton: true, requiredVersion: "*" },
          "@emotion/styled": { singleton: true, requiredVersion: "*" },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
