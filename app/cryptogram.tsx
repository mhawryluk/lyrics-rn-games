import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import cs from "classnames";
import { useState } from "react";

export default function Cryptogram() {
  return (
    <View>
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link href="/" asChild className="p-2 items-center">
          <Pressable>
            <Ionicons
              name="chevron-back"
              className="text-white"
              color="#87A6BB"
              size={20}
            />
          </Pressable>
        </Link>

        <Text className="text-[#87A6BB] text-xl font-bold">Cryptogram</Text>

        <Pressable className="p-2 items-center">
          <Ionicons
            name="menu"
            className="text-white"
            color="#87A6BB"
            size={24}
          />
        </Pressable>
      </View>

      <CryptogramGame />
    </View>
  );
}

function shuffleArray(array: unknown[]) {
  const copy = [...array];

  for (var i = copy.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

const allLetters = "abcdefghijklmnopqrstuvwxyz";
const shuffled = shuffleArray(allLetters.split(""));
const encoding = Object.fromEntries(
  allLetters
    .split("")
    .map((letter) => [
      letter,
      shuffled[letter.charCodeAt(0) - "a".charCodeAt(0)] as string | undefined,
    ])
);

function CryptogramGame() {
  const [selectedLetter, setSelectedLetter] = useState<string | undefined>(
    undefined
  );
  const [answers, setAnswers] = useState<Record<string, string | undefined>>(
    {}
  );

  return (
    <View className="h-[90%] justify-between gap-4">
      <ScrollView className="h-full">
        <View className="flex-wrap flex-row gap-6">
          {lyrics.map((word, i) => (
            <View key={`word_${i}`} className="flex-row gap-2">
              {word.split("").map((letter, j) =>
                encoding[letter.toLowerCase()] !== undefined ? (
                  <LetterTile
                    key={j}
                    letter={answers[letter] ?? " "}
                    code={encoding[letter.toLowerCase()]!}
                    selected={selectedLetter === letter}
                    onClick={() => {
                      setSelectedLetter(letter);
                    }}
                  />
                ) : (
                  <Text
                    key={`${j}_${letter}`}
                    className="text-2xl font-mono font-bold"
                  >
                    {letter}
                  </Text>
                )
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <Keyboard
        onLetterClick={(letter) => {
          if (selectedLetter) {
            setAnswers((answers) => ({ ...answers, [selectedLetter]: letter }));
          }
        }}
      />
    </View>
  );
}

function LetterTile({
  letter,
  code,
  selected,
  onClick,
}: {
  letter: string | undefined;
  code: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Pressable onPress={onClick}>
      <View className="justify-center">
        <Text
          className={cs(
            "bg-[#87A6BB] p-3 text-2xl font-mono font-bold rounded-md",
            selected ? "" : "opacity-50"
          )}
        >
          {letter?.toUpperCase() ?? " "}
        </Text>
        <Text className="p-3 text-2xl font-mono font-bold">
          {code?.toUpperCase()}
        </Text>
      </View>
    </Pressable>
  );
}

function Keyboard({
  onLetterClick,
}: {
  onLetterClick: (letter: string) => void;
}) {
  const letters = ["qwertyuiop", "asdfghjkl", "zxcvbnm_"];
  return (
    <View className="bg-[#87A6BB] rounded-lg p-4">
      {letters.map((row) => (
        <View key={row} className="flex-row self-stretch justify-center">
          {row.split("").map((letter) => (
            <Pressable onPress={() => onLetterClick(letter)}>
              <Text
                key={letter}
                className="font-extrabold text-white p-3 text-2xl"
              >
                {letter.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const lyrics = "I don’t like that falling feels like flying till the bone crush"
  .split(" ")
  .map((word) => word.toLowerCase());
