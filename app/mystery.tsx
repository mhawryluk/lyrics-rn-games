import Colors from '@/components/Colors';
import { SongCard } from '@/components/SongCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import cs from 'classnames';
import { Link } from 'expo-router';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import * as DropdownMenu from 'zeego/dropdown-menu';

const songTitle = 'Holy Ground';
export default function Mystery() {
  const [guessedWords, setGuessedWords] = useState(new Set<string>());
  const [mysteryLyrics, setMysteryLyrics] = useState<string[][] | null>(
    defaultMysteryLyrics
      .split('\n\n')
      .map((verse: string) =>
        verse.split(/\s/).filter((word) => word.trim() !== ''),
      ),
  );
  const [songCardShowing, setSongCardShowing] = useState(false);

  // useEffect(() => {
  //   fetch(
  //     `https://lyrics.lewdhutao.my.eu.org/musixmatch/lyrics-search?title=${songTitle.replaceAll(
  //       /\s/g,
  //       "%20"
  //     )}&artist=taylor%20swift`
  //   )
  //     .then((r) => r.json())
  //     .then((json) => {
  //       console.log(json);
  //       setMysteryLyrics(
  //         (json["lyrics"] ?? defaultMysteryLyrics)
  //           .split("\n\n")
  //           .map((verse: string) => verse.split(/\s/))
  //       );
  //     });
  // }, []);

  const allWords = useMemo(
    () =>
      new Set(
        (mysteryLyrics ?? [[]])
          .flatMap((verse) => verse.map(transformWord))
          .filter((word) => word && word.trim() !== ''),
      ),
    [mysteryLyrics],
  );

  useEffect(() => {
    if ([...allWords.values()].every((word) => guessedWords.has(word))) {
      setSongCardShowing(true);
    }
  }, [guessedWords, allWords]);

  return (
    <View>
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link href="/" asChild className="p-2 items-center">
          <Pressable>
            <Ionicons
              name="chevron-back"
              className="text-white"
              color={Colors.green}
              size={20}
            />
          </Pressable>
        </Link>

        <Text className="text-pw-green text-xl font-bold">Mystery Lyrics</Text>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Ionicons
              name="menu"
              className="text-white"
              color={Colors.green}
              size={24}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              key="reset"
              onSelect={() => setGuessedWords(new Set())}
            >
              <DropdownMenu.ItemTitle>Reset</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              key="give_up"
              onSelect={() => setGuessedWords(new Set(allWords))}
            >
              <DropdownMenu.ItemTitle>Give up</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>

      <MysteryLyricsGame
        guessedWords={guessedWords}
        setGuessedWords={setGuessedWords}
        mysteryLyrics={mysteryLyrics}
        allWords={allWords}
      />

      {songCardShowing && (
        <SongCard
          title={songTitle}
          closeCallback={() => setSongCardShowing(false)}
          colorOverlay={Colors.green}
          artworkUrl="https://s.mxmcdn.net/images-storage/albums2/1/5/2/8/0/5/58508251_350_350.jpg"
        />
      )}
    </View>
  );
}

function transformWord(word: string) {
  return word
    .toLowerCase()
    .replaceAll(/[',\.\(\)]/g, '')
    .trim();
}

function MysteryLyricsGame({
  guessedWords,
  setGuessedWords,
  mysteryLyrics,
  allWords,
}: {
  guessedWords: Set<string>;
  setGuessedWords: Dispatch<SetStateAction<Set<string>>>;
  mysteryLyrics: string[][] | null;
  allWords: Set<string>;
}) {
  const [input, setInput] = useState('');

  if (mysteryLyrics === null) {
    return (
      <View className="justify-center self-stretch">
        <Text className="text-pw-green text-2xl font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="gap-4 justify-end">
      <View className="flex-row items-center justify-between py-2">
        <TextInput
          className="border-pw-green border-2 opacity-50 rounded-lg h-12 max-w-[70%] flex-1 p-2 text-pw-green font-bold"
          onChangeText={(text) => {
            const guess = transformWord(text);

            if (!guessedWords.has(guess) && allWords.has(guess)) {
              setGuessedWords(new Set(guessedWords).add(guess));
              setInput('');
            } else {
              setInput(text);
            }
          }}
          value={input}
        />
        <Text className="text-pw-green text-2xl font-bold">
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
            <View
              key={`${verse}_${
                // biome-ignore lint/suspicious/noArrayIndexKey:
                i
              }`}
              className="flex-row flex-wrap gap-1"
            >
              {verse.map((word, i) =>
                word.trim() !== '' ? (
                  <WordTile
                    word={word.trim()}
                    guessed={guessedWords.has(transformWord(word))}
                    // biome-ignore lint/suspicious/noArrayIndexKey:
                    key={i}
                  />
                ) : null,
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
    <View className="relativ overflow-hidden rounded-lg">
      <Text
        className={cs(
          'px-2 py-1 text-xl justify-center items-center font-mono font-bold',
          guessed ? 'opacity-100 text-pw-green' : 'opacity-50',
        )}
      >
        {guessed ? word : ' '.repeat(word.length)}
      </Text>

      <Animated.View
        style={{
          backgroundColor: Colors.greenLight,
          height: '100%',
          position: 'absolute',
          right: 0,
          top: 0,
          width: guessed ? 0 : '100%',
          transitionProperty: 'width',
          transitionTimingFunction: 'ease-in-out',
          transitionDuration: '0.8s',
          zIndex: 2,
        }}
      />
    </View>
  );
}

const defaultMysteryLyrics = `\
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
`;
