import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("404!");
  }

  async getHTML() {
    return `
        <h1> 404 error, page not found </h1>
        <a href="/" class="navLink" data-link>Go back to homepage</a>
    `;
  }
}
