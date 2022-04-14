import TVMazeAPI from './TVMazeAPI.js';
import GlobalVariables from './global.js';

export default class PageManager {
  showObjects = [];

  gv = new GlobalVariables();

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
    </div>`;

    // comment button
    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', (e) => {
      const thisShow = showData;

      // checking for resource of the popup
      this.gv.popupImage.src = thisShow.image.original;
      this.gv.popupTitle.textContent = thisShow.name;
      this.gv.showDetails1.textContent = `genre: ${thisShow.genres.join()}`;
      this.gv.showDetails2.textContent = thisShow.premiered;
      this.gv.showDetails3.textContent = thisShow.status;
      this.gv.showDetails4.textContent = thisShow.language;
      


      console.log(thisShow);
      const tvMaze = new TVMazeAPI();
      tvMaze.getShowForPopup(e.parentElement.id);
    });
    // Reservation Button
    const reservationButton = document.createElement('button');
    reservationButton.type = 'button';
    reservationButton.textContent = 'Reservations';
    show.appendChild(commentButton);
    show.appendChild(reservationButton);
    this.gv.showList.appendChild(show);
  }

  getShows = async () => {
    const tvMaze = new TVMazeAPI();
    this.showObjects = await tvMaze.getAllShowObjects();
    console.log(this.showObjects);
  }

  generatePopup = (showData) => {
    console.log(this.gv.popupTitle.innerHTML)
    this.gv.popupTitle = showData.name;
  }

  paintToHomePage = () => {
    this.showObjects.forEach((show) => {
      this.addCard(show);
    });
  }
}