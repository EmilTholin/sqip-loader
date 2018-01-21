import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { src, preview } from "!!sqip-loader?numberOfPrimitives=20!./images/bridesmaid.png";
import homer from "./images/homer.gif";
import hercules from "./images/hercules.jpg";
import mountain from "./images/mountain.jpg";

class Img extends Component {
  state = { imageLoaded: false };

  setImageLoaded = () => {
    var delay = 500 + Math.random() * 1500;
    setTimeout(() => this.setState({ imageLoaded: true }), delay);
  };

  render() {
    return (
      <div className="image-wrapper">
        <img src={this.props.preview} />
        <img
          src={this.props.src}
          className={`image ${this.state.imageLoaded && `loaded`}`}
          onLoad={this.setImageLoaded}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Img src={src} preview={preview} />
    <Img {...homer} />
    <Img {...hercules} />
    <Img {...mountain} />
  </div>,
  document.getElementById("app")
);
