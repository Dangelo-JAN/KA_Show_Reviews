import TVMazeAPI from './TVMazeAPI.js';
import GlobalVariables from './global.js';
import { addComments, loadComments } from './involvementAPI';

export default class PageManager {
  showObjects = [];

  gv = new GlobalVariables();

  refreshComments = (showID) => {

  }

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

    commentButton.addEventListener('click', async () => {
      const thisShow = showData;
      await loadComments(thisShow.id);
      // checking for resource of the popup
      this.gv.popupImage.src = thisShow.image.original;
      this.gv.popupTitle.textContent = thisShow.name;
      this.gv.showDetails1.textContent = `genre: ${thisShow.genres.join()}`;
      this.gv.showDetails2.textContent = thisShow.premiered;
      this.gv.showDetails3.textContent = thisShow.status;
      this.gv.showDetails4.textContent = thisShow.language;
      // Empty the comments and replace with comments for the show
      // remove any listeners on the popup button & replace it with a new listener that adds comments
      // to the show

      const popupContent = document.getElementById('popup-container');
      const oldForm = document.getElementById('comment-form');
      oldForm.remove();

      const newForm = document.createElement('form');
      newForm.classList.add('container', 'column');
      newForm.id = 'comment-form';
      newForm.innerHTML = '<input type="text" class="input-name" placeholder="Your name">      <textarea class="comment-details" placeholder="Leave a comment"></textarea><button type="submit" class="submit" id="submit">Comment</button>';

      newForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log(`I belong to ${showData.name}`);
        console.log(`My show ID is ${showData.id}`);
        console.log(`Submitting username  ${e.target.children[0].value}`);
        console.log(`Submitting comment  ${e.target.children[1].value}`);
        const data = {
          item_id: `${showData.id}`,
          username: `${e.target.children[0].value}`,
          comment: `${e.target.children[1].value}`
        };
        await addComments(showData.id, data);
        await loadComments(showData.id);
        e.target.children[0].value = '';
        e.target.children[1].value = '';
      });
      popupContent.appendChild(newForm);
    });
    // Reservation Button
    const reservationButton = document.createElement('button');
    reservationButton.type = 'button';
    reservationButton.textContent = 'Reservations';
    show.appendChild(commentButton);
    show.appendChild(reservationButton);
    console.log(this.gv.showList);
    this.gv.showList.appendChild(show);
  }

  getShows = async () => {
    const tvMaze = new TVMazeAPI();
    this.showObjects = await tvMaze.getAllShowObjects();
    console.log(this.showObjects);
  }

  generatePopup = (showData) => {
    console.log(this.gv.popupTitle.innerHTML);
    this.gv.popupTitle = showData.name;
  }

  paintToHomePage = () => {
    console.log(this.showObjects);
    this.showObjects.forEach((show) => {
      this.addCard(show);
    });
  }
}