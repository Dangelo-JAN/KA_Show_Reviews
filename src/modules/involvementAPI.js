import GlobalVariables from './global';

const commentsAPI_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GEEEq0hutMWJ97Wdtxcj';
const commentList = document.getElementById('comment-list');
const likes = document.getElementsByClassName('like');
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

const createLikes = (showID, counterLikes) => {
  likes.innerHTML = `
    <span>${counterLikes.like}</span>
  `
}
// Comments
const getComments = async (showID) => {
  const response = await fetch(commentsAPI_URL + `/comments?item_id=${showID}`);
  const comments = await response.json();
  return comments;
};

const addComments = async (showID, data) => {
  let response;
  console.log(data);
  response = await fetch(commentsAPI_URL + `/comments?item_id=${showID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const loadComments = async (showID) => {
  await getComments(showID).then((comments) => {
    createDiv(comments);
  });
};

// Likes methods
const getLikes = async () => {
  const response = await fetch(commentsAPI_URL + `/likes`);
  const likes = await response.json();
  console.log(likes);
  return likes;
};

const addLikes = async (data) => {
  let response;
  console.log(data);
  response = await fetch(commentsAPI_URL + `/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const loadLikes = async () => {
  await getLikes().then((likes) => {
    createLikes();
  });
};

export { addComments, loadComments, addLikes, getLikes };