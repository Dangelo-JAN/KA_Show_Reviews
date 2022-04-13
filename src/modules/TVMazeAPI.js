export default class TVMazeAPI {
  static APISource = 'https://api.tvmaze.com/search/shows?q=simpsons';

  static getSimpsons = async () => {
    const response = await fetch(this.APISource);
    const values = await response.json();
    return values;
  }
}