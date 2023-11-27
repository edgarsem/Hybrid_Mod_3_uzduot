import React, { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import { FlatList, View, Text, Pressable } from "react-native";
import { styles } from "../styles/StyleSheet";

function CategoryScreen({ navigation }) {

    const { categories, posts } = useContext(PostContext);

    const getPostAmountPerCategory = (category) => {
        return posts.filter(item => item.category === category).length;
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => ( 
                <Pressable 
                    onPress={() => 
                        navigation.navigate('Posts', { category: item })
                    }
                >
                    <View style={styles.buttonCategoryContainer}>
                        <Text style={styles.titleStyle}>{item}</Text>
                        <Text style={styles.categoryScreenPostCountStyle}>
                            {getPostAmountPerCategory(item)}
                        </Text>
                    </View>
                </Pressable>
            )}
        />
        </View>
    );
};

export default CategoryScreen;

