import GlobalVariables from './global';

const commentsAPI_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GEEEq0hutMWJ97Wdtxcj';
const commentList = document.getElementById('comment-list');
const vg = new GlobalVariables();

const createDiv = (commentArr) => {
  commentList.innerHTML = '';
  commentArr.forEach((comment) => {
    const commentContainer = `
      <li class="comment">${comment.creation_date} ${comment.username}: ${comment.comment}</li>
    `;
    commentList.innerHTML += commentContainer;
  });
};
// Comments
const getComments = async () => {
  const response = await fetch(commentsAPI_URL + '/comments?item_id=GoT');
  const comments = await response.json();
  console.log(comments);
  return comments;
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

const loadComments = async () => {
  await getComments().then((comments) => {
    createDiv(comments);
  });
};

export { addComments, loadComments };