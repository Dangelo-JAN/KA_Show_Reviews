import * as fs from 'fs';
import Pagemanager from '../src/modules/pageManager';
import { likeArray, showArray } from './mock-data';

describe('Confirms the number of the likes form the shows', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('dist/index.html');
  });
  it('counts the number of likes from the API data', async () => {
    const showData = showArray[0];
    const pageManager = new Pagemanager();
    pageManager.likeObjects = likeArray;
    const totalLikes = await pageManager.addCard(showData, likeArray);
    expect(totalLikes).toBe(3);
  });
});