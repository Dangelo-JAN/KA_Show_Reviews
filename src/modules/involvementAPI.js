import GlobalVariables from './global';

const commentsAPI_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GEEEq0hutMWJ97Wdtxcj';
const commentList = document.getElementById('comment-list');
const vg = new GlobalVariables();

const createDiv = (comment) => {
  commentList.innerHTML = '';
  const sortedComments = comment.sort((a, b) => b.comment - a.comment);
  sortedComments.forEach((comment) => {
    const commentContainer = `
      <li class="score-text">${comment.user}: ${comment.comment}</li>
    `;
    commentList.innerHTML += commentContainer;
  });
};
// Comments
const getComments = async () => {
  const response = await fetch(commentsAPI_URL);
  const comments = await response.json();
  return comments.result;
};

const addComments = async () => {
  const response = fetch(commentsAPI_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: vg.inputField.value,
      comment: vg.commentField.value,
    }),
  });

  const status = await response.json();
  return status;
};

const loadComments = () => {
  getComments().then((comments) => {
    createDiv(comments);
  });
};

export { addComments, loadComments };