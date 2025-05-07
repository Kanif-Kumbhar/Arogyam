import { View, Text, TouchableOpacity, Modal, StyleSheet,Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import Colors from '../../shared/Colors'
import Prompt from '../../shared/Prompt'
import { GenerateRecipeAI} from "../../services/AiModel";
import Loader from "./../../components/shared/Loader";
import { api } from "../../convex/_generated/api";
import { useMutation } from 'convex/react';
import { UserContext } from '../../context/UserContext';
import { useRouter } from "expo-router";

export default function RecipeOptionList({ recipeOption }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const router = useRouter();

  const onRecipeOptionSelect = async (recipe) => {
    setLoading(true);
    const PROMPT =
      "Recipe Name: " +
      recipe?.recipeName +
      " Description: " +
      recipe?.description +
      Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;

    try {
      // const result = await GenerateRecipeAI(PROMPT);
      // const extratedJSON = result.choices[0].message.content
      //   .replace("```json", "")
      //   .replace("```", "");
      // const parsedJSON = JSON.parse(extratedJSON);

      // ✅ Generate recipe image directly here

      // You can continue with saving to DB or navigating to detail screen here
      // const saveRecipeResult = await CreateRecipe({
      //   imageUrl: parsedJSON?.imageUrl,
      //   jsonData: parsedJSON,
      //   recipeName: recipe?.recipeName,
      //   uid: user?._id,
      // });

      const saveRecipeResult = "jn79xbdyf2yx6vyrfp66718c5h7fda7f"; // For testing purpose
      router.push({
        pathname: "/recipe-detail",
        params: { recipeId: saveRecipeResult },
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const LoaderModal = ({ visible }) => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <Loader />
        </View>
      </Modal>
    );
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Select Recipe
      </Text>
      <View>
        {recipeOption.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onRecipeOptionSelect(item)}
            style={{
              padding: 15,
              borderWidth: 0.2,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item?.recipeName}
            </Text>
            <Text
              style={{
                color: Colors.GRAY,
              }}
            >
              {item?.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoaderModal visible={loading} />

      <View>
        <LoaderModal visible={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
}
})