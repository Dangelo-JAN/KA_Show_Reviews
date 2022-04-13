import PageManager from "./pageManager";

export default class TVMazeAPI {
  APISource = 'https://api.tvmaze.com/shows/';
  // Simpsons: 83, Silicon Valley: 143, Game of Thrones: 82, Lost: 123, Two and a Half Men: 130, Big Bang Theory: 66
  allShowNames = [{ id: '83' }, { id: '143' }, { id: '82' }, { id: '123' }, { id: '130' }, { id: '66' }];
  allShowObjects = [];

  getShow = async (showID) => {
    const pgmanager = new PageManager;
    const response = await fetch(this.APISource + showID);
    const value = await response.json();
    const showData = await value;
    pgmanager.addCard(showData);
  }

  getAllShowObjects = async () => {
    const arrayOfShows = [];
    await this.allShowNames.forEach((showName) => {
      this.getShow(showName.id);
    });
    return arrayOfShows;
  }
}