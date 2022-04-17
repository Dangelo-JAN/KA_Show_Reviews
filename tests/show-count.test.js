import * as fs from 'fs';
import Pagemanager from '../src/modules/pageManager';
import { showArray } from './mock-data';

describe('Confirms the number of shows on the Home Page', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('dist/index.html');
  });
  it('counts the number of page elements created after parsing the TVMAZE API data', async () => {
    const pageManager = new Pagemanager();
    pageManager.showObjects = showArray;
    const totalShows = pageManager.paintToHomePage();
    expect(totalShows).toBe(4);
  });
});