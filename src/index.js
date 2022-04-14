import './index.css';
// import TVMazeAPI from './modules/TVMazeAPI';
import PageManager from './modules/pageManager';
import { addComments, loadComments } from './modules/involvementAPI';

const pageManager = new PageManager();

const appManager = async () => {
  await pageManager.getShows();
  await pageManager.paintToHomePage();
  // await loadComments();
};

appManager();
