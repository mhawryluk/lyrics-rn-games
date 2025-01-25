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
              color="#D08E54"
              size={20}
            />
          </Pressable>
        </Link>

        <Text className="text-[#D08E54] text-xl font-bold">Cryptogram</Text>

        <Pressable className="p-2 items-center opacity-0">
          <Ionicons
            name="menu"
            className="text-white"
            color="#D08E54"
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

  for (var i = copy.length - 1; i > 0; i--) {
    let j: number | undefined;
    while (j === undefined || copy[j] === copy[i]) {
      j = Math.floor(Math.random() * i);
    }

    const temp = copy[i];
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
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>([
    -1, -1,
  ]);
  const selectedLetter = lyrics[selectedIndex[0]]
    ? lyrics[selectedIndex[0]][selectedIndex[1]]
    : undefined;
  const [answers, setAnswers] = useState<Record<string, string | undefined>>(
    {}
  );

  return (
    <View className="h-[92%] justify-between gap-4">
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
                      setSelectedIndex([i, j]);
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
        usedLetters={Object.keys(answers).filter(
          (letter) => answers[letter] !== undefined
        )}
        onLetterClick={(letter) => {
          if (selectedLetter) {
            setAnswers((answers) => ({
              ...answers,
              [selectedLetter]: letter === " " ? undefined : letter,
            }));
            if (letter !== " ") {
              setSelectedIndex(([i, j]) => {
                let [newI, newJ] =
                  j + 1 < lyrics[i].length ? [i, j + 1] : [i + 1, 0];

                while (
                  newI < lyrics.length &&
                  (encoding[lyrics[newI][newJ]] === undefined ||
                    answers[lyrics[newI][newJ]] !== undefined)
                ) {
                  [newI, newJ] =
                    newJ + 1 < lyrics[newI].length
                      ? [newI, newJ + 1]
                      : [newI + 1, 0];
                }

                return [newI, newJ];
              });
            }
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
            "bg-[#D08E54] p-3 text-2xl font-mono font-bold rounded-md",
            selected ? "" : "bg-[#d08e5480]"
          )}
        >
          {letter?.toUpperCase() ?? ""}
        </Text>
        <Text className="p-3 text-2xl font-mono font-bold">
          {code?.toUpperCase()}
        </Text>
      </View>
    </Pressable>
  );
}

function Keyboard({
  usedLetters,
  onLetterClick,
}: {
  usedLetters: string[];
  onLetterClick: (letter: string) => void;
}) {
  const letters = ["qwertyuiop", "asdfghjkl", "zxcvbnm "];
  return (
    <View className="bg-[#D08E54] rounded-lg p-4">
      {letters.map((row, i) => (
        <View
          key={`row_${row}_${i}`}
          className="flex-row self-stretch justify-center"
        >
          {row.split("").map((letter, j) => (
            <Pressable
              key={`letter_${letter}_${j}`}
              onPress={() => onLetterClick(letter)}
            >
              <Text
                className={cs(
                  "font-extrabold text-white p-3 text-2xl",
                  usedLetters.includes(letter) ? "opacity-50" : ""
                )}
              >
                {letter.toUpperCase() === " " ? "🧹" : letter.toUpperCase()}
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
