import './index.css';
// import TVMazeAPI from './modules/TVMazeAPI';
import PageManager from './modules/pageManager';
import { addComments, loadComments } from './modules/involvementAPI';

const pageManager = new PageManager();

const appManager = async () => {
  await pageManager.getShows();
  await pageManager.paintToHomePage();
};

appManager();
// pageManager.addCard();


//////////////////////
const form = document.getElementById('comment-form');

loadComments();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addComments();
  loadComments();
  form.reset();
});