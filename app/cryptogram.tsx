import { SongCard } from '@/components/SongCard';
import { shuffleArray } from '@/components/utils';
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
import { Pressable, ScrollView, Text, View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

const songTitle = 'gold rush';

export default function Cryptogram() {
  const [answers, setAnswers] = useState<Record<string, string | undefined>>(
    {},
  );
  const [songCardShowing, setSongCardShowing] = useState(false);
  const allCodeLetters = useMemo(
    () => [
      ...new Set(
        lyrics.flatMap((word) =>
          word
            .split('')
            .map((letter) => encoding[letter])
            .filter((letter) => letter !== undefined),
        ),
      ),
    ],
    [],
  );

  useEffect(() => {
    if (checkIfWon(answers, correctAnswer, allCodeLetters)) {
      setSongCardShowing(true);
    }
  }, [answers, allCodeLetters]);

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

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Ionicons
              name="menu"
              className="text-white"
              color="#D08E54"
              size={20}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item key="reset" onSelect={() => setAnswers({})}>
              <DropdownMenu.ItemTitle>Reset</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              key="give_up"
              onSelect={() =>
                setAnswers(
                  Object.fromEntries(
                    allCodeLetters.map((letter) => [
                      letter,
                      correctAnswer[letter],
                    ]),
                  ),
                )
              }
            >
              <DropdownMenu.ItemTitle>Give up</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>

      <CryptogramGame answers={answers} setAnswers={setAnswers} />

      {songCardShowing && (
        <SongCard
          title={songTitle}
          closeCallback={() => setSongCardShowing(false)}
          colorOverlay="#D08E54"
          artworkUrl="https://s.mxmcdn.net/images-storage/albums2/3/3/9/0/5/3/52350933_350_350.jpg"
        />
      )}
    </View>
  );
}

function CryptogramGame({
  answers,
  setAnswers,
}: {
  answers: Record<string, string | undefined>;
  setAnswers: Dispatch<SetStateAction<Record<string, string | undefined>>>;
}) {
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>([
    -1, -1,
  ]);
  const selectedLetter = lyrics[selectedIndex[0]]
    ? lyrics[selectedIndex[0]][selectedIndex[1]]
    : undefined;

  return (
    <View className="h-[92%] justify-between gap-4">
      <ScrollView className="h-full">
        <View className="flex-wrap flex-row gap-6">
          {lyrics.map((word, i) => (
            <View
              key={`word_${word}_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                i
              }`}
              className="flex-row gap-2"
            >
              {word.split('').map((letter, j) =>
                encoding[letter.toLowerCase()] !== undefined ? (
                  <LetterTile
                    key={`${letter}_${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      j
                    }`}
                    letter={
                      answers[encoding[letter.toLowerCase()] as string] ?? ' '
                    }
                    code={encoding[letter.toLowerCase()] as string}
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
                ),
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <Keyboard
        usedLetters={Object.values(answers).filter(
          (letter) => letter !== undefined,
        )}
        onLetterClick={(letter) => {
          if (selectedLetter) {
            setAnswers((answers) => ({
              ...answers,
              [encoding[selectedLetter.toLowerCase()] as string]:
                letter === ' ' ? undefined : letter,
            }));
            if (letter !== ' ') {
              setSelectedIndex(([i, j]) => {
                let [newI, newJ] =
                  j + 1 < lyrics[i].length ? [i, j + 1] : [i + 1, 0];

                while (
                  newI < lyrics.length &&
                  (encoding[lyrics[newI][newJ]] === undefined ||
                    answers[encoding[lyrics[newI][newJ]] as string] !==
                      undefined)
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
            'bg-[#D08E54] p-3 text-2xl font-mono font-bold rounded-md',
            selected ? '' : 'bg-[#d08e5480]',
          )}
        >
          {letter?.toUpperCase() ?? ''}
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
  return (
    <View className="bg-[#D08E54] rounded-lg p-4">
      {keyboardLetters.map((row, i) => (
        <View
          key={`row_${row}_${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            i
          }`}
          className="flex-row self-stretch justify-center"
        >
          {row.split('').map((letter, j) => (
            <Pressable
              key={`letter_${letter}_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                j
              }`}
              onPress={() => onLetterClick(letter)}
            >
              <Text
                className={cs(
                  'font-extrabold text-white p-3 text-2xl',
                  usedLetters.includes(letter.toLowerCase())
                    ? 'opacity-50'
                    : '',
                )}
              >
                {letter.toUpperCase() === ' ' ? '🧹' : letter.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const keyboardLetters = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm '];
const allLetters = 'abcdefghijklmnopqrstuvwxyz';
const shuffled = shuffleArray(allLetters.split(''));
const encoding = Object.fromEntries(
  allLetters
    .split('')
    .map((letter) => [
      letter,
      shuffled[letter.charCodeAt(0) - 'a'.charCodeAt(0)] as string | undefined,
    ]),
);
const correctAnswer = Object.fromEntries(
  Object.keys(encoding).map((letter) => [encoding[letter], letter]),
);

function checkIfWon(
  answer: Record<string, string | undefined>,
  correctAnswer: Record<string, string | undefined>,
  codeInLyrics: string[],
): boolean {
  return codeInLyrics.every(
    (letter) => answer[letter] === correctAnswer[letter],
  );
}

const lyrics = 'I don’t like that falling feels like flying till the bone crush'
  .split(' ')
  .map((word) => word.toLowerCase());
