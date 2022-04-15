import './index.css';
// import TVMazeAPI from './modules/TVMazeAPI';
import PageManager from './modules/pageManager';
import { getLikes } from './modules/involvementAPI';
import { addComments, loadComments } from './modules/involvementAPI';

const pageManager = new PageManager();

const appManager = async () => {
  pageManager.setCloseListener();
  await pageManager.getShows();
  await pageManager.paintToHomePage();
  // await loadComments();
};

appManager();
