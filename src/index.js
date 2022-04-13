import './index.css';
import TVMazeAPI from './modules/TVMazeAPI';
const simpsonsData = async () => {
  const data = await TVMazeAPI.getSimpsons();
  const show = await data[0];
  return show.show.image.medium;
}

const test = simpsonsData();
const firstImage = document.querySelector('.card-thumbnail');

test.then(value => firstImage.src = `${value}`);