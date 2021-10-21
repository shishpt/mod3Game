// A class that is referenced by other views to set params for that view, the abstractView is called in all the other views
export default class {
  constructor(params) {
    this.params = params;
  }
  // Method to set the page title
  setTitle(title) {
    document.title = title;
  }
}
