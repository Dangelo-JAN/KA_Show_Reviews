export default class TVMazeAPI {
  APISource = 'https://api.tvmaze.com/shows/';

  // Simpsons: 83, Silicon Valley: 143, Game of Thrones: 82, Lost: 123, Two and a Half Men: 130,
  // Big Bang Theory: 66
  allShowNames = [{ id: '83' }, { id: '143' }, { id: '82' }, { id: '123' }, { id: '130' }, { id: '66' }];

  allShowObjects = [];

  getShowForCards = async (showID) => {
    const response = await fetch(this.APISource + showID);
    const showData = await response.json();
    return showData;
  }

  getAllShowObjects = async () => {
    const arrayOfPromises = [];
    this.allShowNames.forEach((showName) => {
      arrayOfPromises.push(this.getShowForCards(showName.id));
    });
    const arrayOfShows = Promise.all(arrayOfPromises);
    return arrayOfShows;
  }
}