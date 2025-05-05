import { View, Text, Platform, TextInput, StyleSheet, Modal } from "react-native";
import React,{ useState, useContext }  from 'react'
import Colors from './../../shared/Colors';
import Button from "../../components/shared/Button";
import  {GenerateRecipeAI} from "../../services/AiModel";
import Prompt from "../../shared/Prompt";
import { UserContext } from "./../../context/UserContext";
import Loader from "./../../components/shared/Loader";
import RecipeOptionList from "../../components/recipe/RecipeOptionList";

export default function GenerateAiRecipe() {

    const { user } = useContext(UserContext);
    const [input, setInput] = useState()
    const [loading, setLoading] = useState(false)
    const [recipeOption, setRecipeOption] = useState([])
    const userData = {
        foodType : user?.foodType,
        medicalCondition : user?.medicalCondition,
    }

    const GenerateRecipeOption = async() => {
        console.log("Clicked");
        
        setLoading(true)
        try{
            const PROMPT = userData + input +  Prompt.GENERATE_RECIPE_OPTION_PROMPT;
            const result = await GenerateRecipeAI(PROMPT)
            const extratedJSON = result.choices[0].message.content.replace('```json', "").replace('```',"");
            const parsedJSON = JSON.parse(extratedJSON);
            setRecipeOption(parsedJSON);
        }catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

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
        padding: 20,
        paddingTop: Platform.OS == "ios" && 40,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        AI Recipe Generator
      </Text>
      <Text
        style={{
          marginTop: 1,
          color: Colors.GRAY,
          fontSize: 16,
        }}
      >
        Geenrate Personalized recipe using AI
      </Text>
      <TextInput
        style={styles.textArea}
        onChangeText={(value) => setInput(value)}
        placeholder="Enter your ingredient or recipe name"
      />

      <View
        style={{
          marginTop: 15,
        }}
      >
        <LoaderModal visible={loading} />
        <Button onPress={GenerateRecipeOption} title={"Generate Recipe"} />
      </View>

      {recipeOption.length > 0 &&<RecipeOptionList recipeOption={recipeOption}/>}
    </View>
  );
}

const styles = StyleSheet.create({
    textArea: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        marginTop: 15,
        height: 100,
        textAlignVertical: "top",
        backgroundColor: Colors.WHITE,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
}
})