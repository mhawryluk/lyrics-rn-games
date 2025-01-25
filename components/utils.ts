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

export function arraysEqual<T>(a: T[], b: T[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
