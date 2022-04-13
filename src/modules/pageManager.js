import TVMazeAPI from "./TVMazeAPI";
import GlobalVariables from "./global";

export default class PageManager {
  showObjects = [];
  gv = new GlobalVariables;
  // simpsons = {
  //   id: 83, url: 'https://www.tvmaze.com/shows/83/the-simpsons', name: 'The Simpsons', type: 'Animation', language: 'English',
  //   averageRuntime: 30,
  //   dvdCountry: null,
  //   ended: null,
  //   externals: { tvrage: 6190, thetvdb: 71663, imdb: 'tt0096697' },
  //   genres: ['Comedy', 'Family'],
  //   id: 83,
  //   image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/359/898433.jpg', original: 'https://static.tvmaze.com/uploads/images/original_untouched/359/898433.jpg' },
  //   language: "English",
  //   name: "The Simpsons",
  //   network: { id: 4, name: 'FOX', officialSite: 'https://www.fox.com/' },
  //   officialSite: "http://www.fox.com/the-simpsons/full-episodes",
  //   premiered: "1989-12-17",
  //   rating: { average: 8.1 },
  //   runtime: 30,
  //   schedule: { time: '20:00', days: Array(1) },
  //   status: "Running",
  //   summary: "<p><b>The Simpsons</b> is the longest running scripted show in US television history. It captures the adventures of Homer, Marge, Maggie, Bart and Lisa who are living in a fictional town called Springfield.</p>",
  //   type: "Animation",
  //   updated: 1649799994,
  //   url: "https://www.tvmaze.com/shows/83/the-simpsons",
  //   webChannel: null,
  //   weight: 100,
  // }

  addCard = (showData) => {
    const show = document.createElement('div');
    show.classList.add('show', 'container', 'column');
    show.innerHTML = `<img class="card-thumbnail" src="${showData.image.medium}" alt="#">
    <div class="primary-info container">
      <span>${showData.name}</span>
      <div class="likes container column">
        <div class="like"></div>
        <span>0 Likes</span>
      </div>
    </div>
    <button type="button">Comments</button>
    <button type="button">Reservations</button>`;
    this.gv.showList.appendChild(show);
  }

  getShows = async () => {
    const tvMaze = new TVMazeAPI;
    tvMaze.getAllShowObjects();
  }
}