export function shuffleArray(array: unknown[]) {
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
