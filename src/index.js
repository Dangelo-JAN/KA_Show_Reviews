import './index.css';
// import TVMazeAPI from './modules/TVMazeAPI';
import PageManager from './modules/pageManager';
import { addComments, loadComments } from './modules/involvementAPI';

const pageManager = new PageManager();

const appManager = async () => {
  await pageManager.getShows();
  await pageManager.paintToHomePage();
  await loadComments();
};

appManager();
// pageManager.addCard();


//////////////////////
const form = document.getElementById('comment-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // addComments();
  loadComments();
  form.reset();
});