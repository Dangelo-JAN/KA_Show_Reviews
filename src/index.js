import './index.css';
// import TVMazeAPI from './modules/TVMazeAPI';
import PageManager from './modules/pageManager';

const pageManager = new PageManager;
pageManager.getShows();
pageManager.addCard();