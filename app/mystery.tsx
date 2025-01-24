import { Link } from "expo-router";
import { useState } from "react";
import cs from "classnames";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";

export default function Mystery() {
  return (
    <View>
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link
          href="/"
          asChild
          className="bg-[#2E364B] p-2 rounded-xl items-center opacity-50"
        >
          <Pressable>
            <Text className="text-xl text-white font-bold">Back</Text>
          </Pressable>
        </Link>

        <Text className="text-[#AE7268] text-2xl font-bold">
          Mystery Lyrics
        </Text>

        <Link
          href="/"
          asChild
          className="bg-[#AE7268] p-2 rounded-xl items-center opacity-50"
        >
          <Pressable>
            <Text className="text-xl text-white font-bold">Options</Text>
          </Pressable>
        </Link>
      </View>

      <MysteryLyricsGame />
    </View>
  );
}

function MysteryLyricsGame() {
  const [guessedWords, setGuessedWords] = useState(new Set());
  const [input, setInput] = useState("");

  const allWords = new Set(
    mysteryLyrics
      .map((word) => word.toLowerCase().replaceAll(/[']/g, "").trim())
      .filter((word) => word)
  );

  return (
    <View className="gap-4 justify-end">
      <View className="flex-row items-center gap-4 py-2">
        <TextInput
          className="bg-[#2E364B] opacity-50 rounded-lg h-10 flex-1 p-2 text-white"
          onChangeText={(text) => {
            const guess = text.toLowerCase().trim().replaceAll(/[']/g, "");

            if (!guessedWords.has(guess) && allWords.has(guess)) {
              setGuessedWords(new Set(guessedWords).add(guess));
              setInput("");
            } else {
              setInput(text);
            }
          }}
          value={input}
        />
        <Text className="text-[#AE7268] text-2xl font-bold">
          {
            mysteryLyrics.filter((word) => guessedWords.has(word.toLowerCase()))
              .length
          }
          /{mysteryLyrics.length}
        </Text>
      </View>
      <ScrollView className="h-[85%]">
        <View className="flex-row flex-wrap gap-2">
          {mysteryLyrics.map((word, i) =>
            word.trim() !== "" ? (
              <WordTile
                word={word.trim()}
                guessed={guessedWords.has(word.toLowerCase())}
                key={i}
              />
            ) : null
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function WordTile({ word, guessed }: { word: string; guessed: boolean }) {
  return (
    <Text
      className={cs(
        "p-2 text-md rounded-lg justify-center items-center font-mono font-bold",
        guessed ? "opacity-100 text-[#AE7268]" : "bg-[#AE7268] opacity-50"
      )}
    >
      {guessed ? word : " ".repeat(word.length)}
    </Text>
  );
}

const mysteryLyrics = `
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
  .replaceAll(/[,\.\(\)]/g, "")
  .split(/\s/);
