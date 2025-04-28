import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../shared/Colors'
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowRight02FreeIcon,
  ArrowRight02FreeIcons,
} from "@hugeicons/core-free-icons";

export default function GenerateRecipeCard() {
  return (
    <LinearGradient 
    colors={[Colors.BLUE, Colors.PRIMARY]}
    style={{
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
    }}>
      <Text style={{
        fontSize: 23,
        fontWeight: "bold",
        color: Colors.WHITE,
      }}>Need meal ideas?</Text>

      <Text style={{
        color: Colors.WHITE,
        fontSize: 18,
        opacity: 0.8,
        marginTop: 7,
      }}>Let our AI generate personalized recipes just for you.</Text>
      <TouchableOpacity style={{
        padding: 12,
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderRadius: 8,
        width: 190,
        display: "flex",
        alignItems: "center",
        gap: 7,
        flexDirection: "row",
      }}>
        <Text style={{
          fontSize: 18,
          color: Colors.PRIMARY,
        }}>Generate with AI</Text>
        <HugeiconsIcon icon={ArrowRight02FreeIcons} color={Colors.PRIMARY}/>
      </TouchableOpacity>
    </LinearGradient>
  )
}