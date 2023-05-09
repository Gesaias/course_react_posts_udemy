import Api from '../../utils/Api';

export const loadPosts = async () => await Api.posts.getPosts();
