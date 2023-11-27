import React, {createContext, useState} from "react";
import uuid from 'react-native-uuid';

const PostContext = createContext();

const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState(
        [
            {id: uuid.v4(), category: "Hardware", title: "What is Lorem Ipsum?", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", timestamp: new Date(), isEdited: false, uploadedImageCount: 3 },
            {id: uuid.v4(), category: "Security", title: "The standard Lorem Ipsum passage, used since the 1500s", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", timestamp: new Date(), isEdited: false, uploadedImageCount: 0 },
        ]);

    const categories = [
        'Hardware',
        'Software',
        'Security',
        'Accessories',
        'Marketplace',
        'Reviews',
        'Maintenance',
        'Others',
    ];

    const addPost = (newPost) => {
        setPosts([...posts, {id: uuid.v4(), ...newPost}])
    };

    const updatePost = (postId, updatedPost) => {
        const newState = posts.map(post => {
            if (post.id === postId) {
                return {...post, ...updatedPost};
            }
            return post;
        });
        setPosts(newState);
    };

    const deletePost = (postId) => {
        setPosts(current =>
            current.filter(post => {
                return post.id !== postId;
            }),
        );
    };

    return (
        <PostContext.Provider value = {{ categories, posts, addPost, updatePost, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };