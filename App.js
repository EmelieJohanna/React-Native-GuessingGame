import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [numberGuess, setNumberGuess] = useState("");
  const [result, setResult] = useState("");
  const [gameNotStarted, setGameNotStarted] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  function randomNumberFunction() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNumber);
    console.log("RandomNumber: ", randomNumber);
  }

  function handlePress() {
    randomNumberFunction();
    setGameNotStarted(false);
    setGameEnded(false);
    setResult("");
  }

  function validateGuess() {
    const guess = parseInt(numberGuess, 10);
    console.log("User guess: ", numberGuess, guess);
    if (isNaN(guess)) {
      setResult("Please enter a valid number!");
      return;
    }

    if (guess < randomNumber) {
      setResult(`${guess} was too low!`);
    } else if (guess > randomNumber) {
      setResult(`${guess} was too high!`);
    } else {
      setResult(`Congratulations! ${guess} was the correct answer!`);
      setGameEnded(true);
    }
    setNumberGuess("");
  }

  return (
    <LinearGradient style={styles.gradient} colors={["#3194f4", "#5571ec"]}>
      <View style={styles.container}>
        <View
          style={
            gameNotStarted
              ? styles.startLogoContainer
              : styles.gameLogoContainer
          }
        >
          <Image
            style={gameNotStarted ? styles.image1 : styles.image2}
            source={require("./app/assets/Guessing-game-balloon-transparent.png")}
          />

          <Text style={styles.logo}>Guess the number 1-100</Text>
        </View>
        {gameNotStarted ? (
          <>
            <Text style={styles.text}>
              Hello! I challenge you to guess the number I am thinking of!
              Between 1-100
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.button}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Start game</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {!gameEnded ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Type a number..."
                  placeholderTextColor="white"
                  value={numberGuess}
                  onChangeText={setNumberGuess}
                  keyboardType="numeric"
                  selectionColor="white"
                />
                <TouchableOpacity
                  onPress={validateGuess}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.resultText}>{result}</Text>
              </>
            ) : (
              <>
                <Text style={styles.resultText}>{result}</Text>
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                  <Text style={styles.buttonText}>Play again?</Text>
                </TouchableOpacity>
              </>
            )}
            <StatusBar style="auto" />
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
  },
  startLogoContainer: {
    top: 0,
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  gameLogoContainer: {
    top: 0,
    position: "absolute",
    alignItems: "center",
    marginTop: 120,
  },
  logo: {
    height: 60,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 30,
    color: "#FFF1E7",
    textShadowColor: "#063970",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  image1: {
    objectFit: "center",
    resizeMode: "contain",
  },
  image2: {
    objectFit: "center",
    width: "300%",
    height: "300%",
    resizeMode: "contain",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    fontSize: "16px",
  },
  resultText: {
    color: "white",
    textAlign: "center",
    textShadowColor: "#063970",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
    width: "100%",
    color: "white",
    backgroundColor: "#5D99FF",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    height: 60,
    width: "100%",
    backgroundColor: "#EC401F",
    paddingVertical: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#D5391C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
