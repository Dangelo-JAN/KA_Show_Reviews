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
    show.id = showData.id;
    show.innerHTML = `<img class="card-thumbnail" src="${showData.image.medium}" alt="#">
    <div class="primary-info container">
      <span>${showData.name}</span>
      <div class="likes container column">
        <div class="like"></div>
        <span>0 Likes</span>
      </div>
    </div>`
    // <button type="button" class="comment">Comments</button>
    // <button type="button">Reservations</button>;
    //comment button
    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', (e) => {
      console.log('I have been clicked');
      const tvMaze = new TVMazeAPI;
      tvMaze.getShowForPopup(e.parentElement.id);
    })
    // Reservation Button
    const reservationButton = document.createElement('button');
    reservationButton.type = 'button';
    reservationButton.textContent = 'Reservations';
    show.appendChild(commentButton);
    show.appendChild(reservationButton);
    this.gv.showList.appendChild(show);
  }

  getShows = async () => {
    const tvMaze = new TVMazeAPI;
    tvMaze.getAllShowObjects();
  }

  generatePopup = (showData) => {
    console.log(this.gv.popupTitle.innerHTML)
    this.gv.popupTitle = showData.name;
  }
}