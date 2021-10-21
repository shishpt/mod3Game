/* The 404 site is currently not used since there is not a server handling the web requests
  so it's only possible to navigate from the root, 
  although this would be useful when adding a server handled route sometime in the future
*/
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
