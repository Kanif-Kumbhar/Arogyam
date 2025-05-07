import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../shared/Colors';

export default function RecipeIngredients({recipeDetail}) {
  const ingredients = (recipeDetail?.jsonData)?.ingredients;

  return (
    <View style={{
        marginTop: 15,
       
    }}>
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
            }}>Ingredients</Text>
            <Text style={{
                fontSize: 20,
                fontWeight: "400",
            }}>{ingredients?.length}</Text>
        </View>

      <FlatList 
        data={ingredients}
        renderItem={({item, index}) => (
            <View style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                }}>
                    <Text style={{
                        padding: 4,
                        fontSize: 23,
                        backgroundColor: Colors.SECONDARY,
                        borderRadius: 99
                    }}>{item?.icon}</Text>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '500'
                    }}>{item?.ingredientName}</Text>
                </View>
                <Text style={{
                    fontSize: 16,
                    color: Colors.GRAY,
                }}>{item?.quantity}</Text>
            </View>
        )}
      />
    </View>
  )
}