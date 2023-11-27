import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, Text, useWindowDimensions, Animated, ScrollView } from "react-native";
import { styles } from "../styles/StyleSheet";
import AnimatedIconComponent from "../components/AnimatedIconComponent";
import ImageScrollView from "../components/ImagesScrollView";

function PostScreen({ navigation, route }) {

    const { width: windowWidth } = useWindowDimensions();

    const { posts, deletePost } = useContext(PostContext);
    
    const post = posts.find(post => {return post.id === route.params.id;});

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <AnimatedIconComponent iconName="edit" onPress={() => 
                        navigation.navigate('Edit Post', { id: post.id, isNew: false, category: post.category })} 
                    />
                    <AnimatedIconComponent iconName="delete" onPress={() => {
                        deletePost(post.id);
                        navigation.goBack();}}
                    />
            </View>
            )
        });
    }, [navigation]);


    return (
        <View style={[styles.container, {flexDirection: 'column'}]}>
            <Text style={[styles.titleStyle, {marginTop: 10, marginBottom: 10}]}>
                {post.title}
            </Text>
            <ImageScrollView uploadedImageCount={post.uploadedImageCount} width={windowWidth - 20}/>
            <ScrollView>
                <Text style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    alignSelf: 'flex-start',
                    fontSize: 16,
                    color: '#176B87',
                    fontWeight: '600',
                    textAlign: 'justify'
                }}>
                    {post.content}
                </Text>
            </ScrollView>
        </View>
      );

  }

  export default PostScreen;