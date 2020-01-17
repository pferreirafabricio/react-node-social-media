export const createPost = (userId, token, post) => {
    //console.log("Cheguei no createPost do apiPost")
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => console.log(err));
};

export const getPosts = (page) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`, {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
};

export const singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
};

export const postsByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
};

export const deletePost = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        })
};

export const updatePost = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
}

export const like = (postId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ postId, userId })
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
}

export const unlike = (postId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ postId, userId })
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
};

export const comment = (postId, userId, comment, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ postId, userId, comment })
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
}

export const uncomment = (postId, userId, comment, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ postId, userId, comment })
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err))
}