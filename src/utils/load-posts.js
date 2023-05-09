import Api from './Api';

export const loadPosts = async () => await Api.posts.getPosts();
