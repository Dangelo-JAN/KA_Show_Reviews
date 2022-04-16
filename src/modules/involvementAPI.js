const likeAPIURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GEEEq0hutMWJ97Wdtxcj/likes';

const createDiv = (commentArr) => {
  const commentList = document.getElementById('comment-list');
  const counter = commentArr.length;
  const commentText = document.getElementById('comments');
  commentText.innerHTML = `Comments (${counter})`;
  commentList.innerHTML = '';
  commentArr.forEach((comment) => {
    const commentContainer = `
      <li class="comment">${comment.creation_date} ${comment.username}: ${comment.comment}</li>
    `;
    commentList.innerHTML += commentContainer;
  });
  return commentArr.length;
};

// Comments
const getComments = async (showID) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GEEEq0hutMWJ97Wdtxcj/comments?item_id=${showID}`);
  const comments = await response.json();
  return comments;
};

const addComments = async (showID, data) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/GEEEq0hutMWJ97Wdtxcj/comments?item_id=${showID}`, {
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
  const response = await fetch(likeAPIURL);
  const likes = await response.json();
  return likes;
};

const addLikes = async (data) => {
  await fetch(likeAPIURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export {
  addComments, loadComments, addLikes, getLikes, createDiv,
};