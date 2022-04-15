import * as fs from 'fs';
import * as involvementAPI from '../src/modules/involvementAPI';
import { commentData } from './mock-data';

describe('Confirms the number of comments of the shows in the popup', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('dist/index.html');
    const commentList = document.getElementById('comment-list');
  });
  it('counts the number of comments elements from the involvement API data', async () => {
    const totalComments = involvementAPI.createDiv(commentData);
    expect(totalComments).toBe(3);
  });
});