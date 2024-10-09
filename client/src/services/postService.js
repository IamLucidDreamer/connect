import server from "../helpers/apiCall";

export const createPost = async (postData) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/posts/create`, postData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPosts = async () => {
  return new Promise((resolve, reject) => {
    server
      .get(`/posts`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPostDetails = async (postId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/posts/${postId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updatePost = async (postId, postData) => {
  return new Promise((resolve, reject) => {
    server
      .put(`/posts/update/${postId}`, postData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deletePost = async (postId) => {
  return new Promise((resolve, reject) => {
    server
      .delete(`/posts/delete/${postId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const likePost = async (postId) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/posts/like/${postId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const unlikePost = async (postId) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/posts/unlike/${postId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createComment = async (postId, commentData) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/posts/comment/create/${postId}`, commentData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateComment = async (commentId, commentData) => {
  return new Promise((resolve, reject) => {
    server
      .put(`/posts/comment/update/${commentId}`, commentData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteComment = async (commentId) => {
  return new Promise((resolve, reject) => {
    server
      .delete(`/posts/comment/delete/${commentId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getComments = async (postId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/posts/comment/get/${postId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
