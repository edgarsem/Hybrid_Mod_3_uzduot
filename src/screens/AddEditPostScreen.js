import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, TextInput, Text, useWindowDimensions, Keyboard } from "react-native";
import { styles } from "../styles/StyleSheet";
import AnimatedIconComponent from "../components/AnimatedIconComponent";
import ImagesScrollView from "../components/ImagesScrollView";


function AddEditPostScreen({ navigation, route }) {

    
    const { posts, addPost, updatePost } = useContext(PostContext);
    const isNew = route.params.isNew;

    const foundPost = !isNew ? posts.find(post => post.id === route.params.id) : null;
    
    const [title, setTitle] = useState(foundPost ? foundPost.title : "");
    const [content, setContent] = useState(foundPost ? foundPost.content : "");
    const [uploadedImageCount, setUploadedImageCount] = useState(foundPost ? foundPost.uploadedImageCount : 0);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <AnimatedIconComponent iconName="save" onPress={() => {
                        const newPost = {
                            category: route.params.category,
                            title: title,
                            content: content,
                            timestamp: new Date(),
                            isEdited: !isNew ? false : true,
                            uploadedImageCount: uploadedImageCount
                        };
                        this.onPress;
                        !isNew ? updatePost(route.params.id, newPost) : addPost(newPost);
                        navigation.goBack();
                    }} />
                    <AnimatedIconComponent iconName="closecircleo" onPress={() => navigation.goBack()} />
                </View>
            ),
            
        });
        
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
        
    }, [navigation, title, content, uploadedImageCount]);

    return (
            <View style={{ flex: 1, flexDirection: 'column', borderWidth: 5, borderColor: '#176B87' }}>
                
            <TextInput
                style={[styles.titleStyle, 
                    {marginTop: 10, borderWidth: 2, borderColor: '#89CFF3', borderStyle: 'solid'}]}
                multiline
                placeholder="Write title here..."
                placeholderTextColor="#89CFF3"
                value={title}
                onChangeText={setTitle}
            />
            
            {!isKeyboardVisible && <ImagesScrollView uploadedImageCount={uploadedImageCount} width={windowWidth - 20} />}

            <View style={{flex: 1, marginLeft: 20, marginRight: 20, marginTop: 20, borderWidth: 2, borderColor: '#89CFF3', borderStyle: 'solid'}}>
            <TextInput
                style={{
                    fontSize: 16,
                    color: '#176B87',
                    fontWeight: '600',
                    textAlign: 'justify'
                }}
                multiline
                placeholder="Write text here..."
                placeholderTextColor="#89CFF3"
                value={content}
                onChangeText={setContent}
            />
            </View>
            {!isKeyboardVisible && (
            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20}}>
                <Text style={{
                    fontSize: 16,
                    color: '#176B87',
                    fontWeight: '600',
                    textAlign: 'justify'
                }}>Attachments:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
                    <AnimatedIconComponent iconName="paperclip" onPress={() => setUploadedImageCount(uploadedImageCount + 1)} />
                    <AnimatedIconComponent iconName="close" onPress={() => (uploadedImageCount > 0) ? setUploadedImageCount(uploadedImageCount - 1) : setUploadedImageCount(uploadedImageCount)} />
                </View>
                
            </View>)}
        </View>
    );
}

export default AddEditPostScreen;
