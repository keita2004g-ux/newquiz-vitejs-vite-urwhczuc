// クイズの問題と、進み方の計算。画面 (App.svelte) からは、ここの関数だけを使う。

// answer は、正解の選択肢の番号 (0 から数える)
export const questions = [
  { text: '日本で一番高い山は？', choices: ['北岳', '富士山', '奥穂高岳'], answer: 1 },
  { text: '水の化学式は？', choices: ['H₂O', 'CO₂', 'O₂'], answer: 0 },
  { text: '太陽系で一番大きい惑星は？', choices: ['土星', '地球', '木星'], answer: 2 },
  { text: '1時間は何秒？', choices: ['360秒', '3600秒', '6000秒'], answer: 1 },
  { text: '2月が29日まである年を何という？', choices: ['うるう年', '平年', '厄年'], answer: 0 },
]

// 最初の状態。index: 何問目か、selected: 選んだ選択肢 (まだなら null)、score: 正解した数
export function start() {
  return { index: 0, selected: null, score: 0 }
}

export function isFinished(quiz, list = questions) {
  return quiz.index >= list.length
}

// 選択肢を選ぶ。すでに選んだあとと、全問終わったあとは何も変えない
export function choose(quiz, choice, list = questions) {
  if (isFinished(quiz, list) || quiz.selected !== null) return quiz
  const correct = choice === list[quiz.index].answer
  return { ...quiz, selected: choice, score: quiz.score + (correct ? 1 : 0) }
}

// 次の問題へ進む。選ぶ前は進まない
export function next(quiz, list = questions) {
  if (isFinished(quiz, list) || quiz.selected === null) return quiz
  return { ...quiz, index: quiz.index + 1, selected: null }
}
