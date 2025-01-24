import { Link } from "expo-router";
import { useMemo, useState } from "react";
import cs from "classnames";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Mystery() {
  return (
    <View>
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link href="/" asChild className="p-2 items-center">
          <Pressable>
            <Ionicons
              name="chevron-back"
              className="text-white"
              color="#144E52"
              size={20}
            />
          </Pressable>
        </Link>

        <Text className="text-[#144E52] text-xl font-bold">Mystery Lyrics</Text>

        <Pressable className="p-2 items-center">
          <Ionicons
            name="menu"
            className="text-white"
            color="#144E52"
            size={24}
          />
        </Pressable>
      </View>

      <MysteryLyricsGame />
    </View>
  );
}

function transformWord(word: string) {
  return word
    .toLowerCase()
    .replaceAll(/[',\.\(\)]/g, "")
    .trim();
}

function MysteryLyricsGame() {
  const [guessedWords, setGuessedWords] = useState(new Set());
  const [input, setInput] = useState("");

  const allWords = useMemo(
    () =>
      new Set(
        mysteryLyrics
          .flatMap((verse) => verse.map(transformWord))
          .filter((word) => word)
      ),
    [mysteryLyrics]
  );

  return (
    <View className="gap-4 justify-end">
      <View className="flex-row items-center justify-between py-2">
        <TextInput
          className="border-[#144E52] border-2 opacity-50 rounded-lg h-12 max-w-[70%] flex-1 p-2 text-[#144E52] font-bold"
          onChangeText={(text) => {
            const guess = transformWord(text);

            if (!guessedWords.has(guess) && allWords.has(guess)) {
              setGuessedWords(new Set(guessedWords).add(guess));
              setInput("");
            } else {
              setInput(text);
            }
          }}
          value={input}
        />
        <Text className="text-[#144E52] text-2xl font-bold">
          {
            mysteryLyrics
              .flat()
              .filter((word) => guessedWords.has(transformWord(word))).length
          }
          /{mysteryLyrics.reduce((acc, x) => acc + x.length, 0)}
        </Text>
      </View>
      <ScrollView className="h-[85%]">
        <View className="gap-10">
          {mysteryLyrics.map((verse, i) => (
            <View key={`${verse}_${i}`} className="flex-row flex-wrap gap-1">
              {verse.map((word, i) =>
                word.trim() !== "" ? (
                  <WordTile
                    word={word.trim()}
                    guessed={guessedWords.has(transformWord(word))}
                    key={i}
                  />
                ) : null
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function WordTile({ word, guessed }: { word: string; guessed: boolean }) {
  return (
    <Text
      className={cs(
        "px-2 py-1 text-xl justify-center items-center font-mono font-bold rounded-lg",
        guessed ? "opacity-100 text-[#144E52]" : "bg-[#144E52] opacity-50"
      )}
    >
      {guessed ? word : " ".repeat(word.length)}
    </Text>
  );
}

const mysteryLyrics = `\
I was reminiscing just the other day
While having coffee all alone and Lord, it took me away
Back to a first glance feeling on New York time
Back when you fit my poems like a perfect rhyme

Took off faster than a green light, go
Yeah, you skip the conversation when you already know
I left a note on the door with a joke we'd made
And that was the first day

And darling, it was good
Never looking down
And right there where we stood
Was holy ground

Spinning like a girl in a brand new dress
We had this big wide city all to ourselves
We blocked the noise with the sound of 'I need you'
And for the first time I had something to lose

And I guess we fell apart in the usual way
And the story's got dust on every page
But sometimes I wonder how you think about it now
And I see your face in every crowd

'Cause darling, it was good
Never looking down
And right there where we stood
Was holy ground

Tonight I'm gonna dance
For all that we've been through
But I don't wanna dance
If I'm not dancing with you

Tonight I'm gonna dance
Like you were in this room
But I don't wanna dance
If I'm not dancing with you

It was good
Never looking down
And right there where we stood
Was holy ground

Tonight I'm gonna dance
For all that we've been through
But I don't wanna dance
If I'm not dancing with you

Tonight I'm gonna dance
Like you were in this room
But I don't wanna dance
If I'm not dancing with you
`
  .split("\n\n")
  .map((verse) => verse.split(/\s/));
