const Api = {
    get: async (url) => {
        const response = await fetch(url);
        const [resp] = await Promise.all([response]);
        return await resp.json();
    },
    post: async (url, body, headers) => { },
    put: async (url, body, headers) => { },
    delete: async (url, headers) => { },
    posts: {
        getPosts: async () => {
            const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
            const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
            const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

            const postsJson = await posts.json();
            const photosJson = await photos.json();

            const postsAndPhotos = postsJson.map((post, index) => {
                return { ...post, cover: photosJson[index].url }
            })

            return postsAndPhotos;
        },
    },
}

export default Api;
