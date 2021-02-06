// リチャード・ダステンフェルドのアルゴリズムでシャッフル
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length; 1 < i; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [newArray[randomIndex], newArray[i - 1]] = [
      newArray[i - 1],
      newArray[randomIndex],
    ];
  }
  return newArray;
}
