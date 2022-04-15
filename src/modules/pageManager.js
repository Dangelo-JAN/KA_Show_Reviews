import TVMazeAPI from './TVMazeAPI.js';
import GlobalVariables from './global.js';
import { addComments, getLikes, loadComments, addLikes } from './involvementAPI';

export default class PageManager {
  showObjects = [];
  likeObjects = [];

  gv = new GlobalVariables();

  refreshComments = (showID) => {

  }

  createLike = async (showData, Like) => {
    if (likes.item_id == showData.id.toString()) {
      totalLikes = likes.likes;
    }
  }

  togglePopup = () => {
    this.gv.header.classList.toggle('hide');
    this.gv.showSection.classList.toggle('hide');
    this.gv.footer.classList.toggle('hide');
    this.gv.popupSection.classList.toggle('hide');
  }

  setCloseListener = () => {
    const closebutton = document.getElementById('close');
    closebutton.addEventListener('click', () => {
      this.togglePopup()
    });
  }

  addCard = async (showData, likeObjects) => {
    let totalLikes;
    const stuff = likeObjects.forEach(likes => {
      if (likes.item_id === showData.id.toString()) {
        console.log('match' + likes.item_id);
        totalLikes = likes.likes;
      }
    });
    const show = document.createElement('div');
    show.classList.add('show', 'container', 'column');
    show.id = showData.id;
    show.innerHTML = `<img class="card-thumbnail" src="${showData.image.medium}" alt="#">
    <div class="primary-info container">
      <span>${showData.name}</span>
      <div class="likes container column">
        <div class="like"></div>
        <span>${totalLikes} likes</span>
      </div>
    </div>`;
    let counter = totalLikes;
    show.children[1].children[1].children[0].addEventListener('click', async (e) => {
      const thisShow = showData;
      const data = { item_id: `${thisShow.id}` };
      counter += 1;
      await addLikes(data);
      e.target.parentElement.children[1].innerHTML = `${counter} likes`
    })
    // const showDetails = document.createElement('div');
    // showDetails.classList.add('primary-info', 'container');
    // const showTitle = document.createElement('span');
    // showTitle.textContent = `${showData.name}`;
    // showDetails.appendChild(showTitle);
    // const likeContainer = document.createElement('div');
    // likeContainer.classList.add('likes', 'container', 'column');
    // const likeButton = document.createE

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
      this.togglePopup();
      // popupSection.classList.toggle('visible');
    });
    // Reservation Button
    const reservationButton = document.createElement('button');
    reservationButton.type = 'button';
    reservationButton.textContent = 'Reservations';
    show.appendChild(commentButton);
    show.appendChild(reservationButton);
    this.gv.showList.appendChild(show);
    console.log(totalLikes);
    return totalLikes
  }

  getShows = async () => {
    const tvMaze = new TVMazeAPI();
    const totalLikes = [];
    const likeArr = await getLikes().then(likes => {
      likes.forEach(like => totalLikes.push(like));
    });
    this.likeObjects = await totalLikes;
    this.showObjects = await tvMaze.getAllShowObjects();
  }

  generatePopup = (showData) => {
    this.gv.popupTitle = showData.name;
  }

  paintToHomePage = () => {
    this.showObjects.forEach((show) => {
      this.addCard(show, this.likeObjects);
    });
    let allshows = document.querySelectorAll('.show');
    let showCounter = document.getElementById('shows-link');
    showCounter.innerHTML = `Shows (${allshows.length})`;
    console.log(allshows.length);
    return allshows.length;
  }
}