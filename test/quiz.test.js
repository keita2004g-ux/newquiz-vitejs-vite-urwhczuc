import test from 'node:test'
import assert from 'node:assert/strict'
import { questions, start, choose, next, isFinished } from '../src/quiz.js'

test('問題は、選択肢が 3 つで、正解の番号がその中にある', () => {
  assert.ok(questions.length > 0)
  for (const q of questions) {
    assert.equal(q.choices.length, 3, q.text)
    assert.equal(new Set(q.choices).size, 3, q.text)
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 3, q.text)
  }
})

const list = [
  { text: 'a', choices: ['x', 'y', 'z'], answer: 1 },
  { text: 'b', choices: ['x', 'y', 'z'], answer: 0 },
]

test('正解を選ぶと点が入り、不正解では入らない', () => {
  assert.deepEqual(choose(start(), 1, list), { index: 0, selected: 1, score: 1 })
  assert.deepEqual(choose(start(), 2, list), { index: 0, selected: 2, score: 0 })
})

test('選び直しても、答えと点は変わらない', () => {
  const wrong = choose(start(), 2, list)
  assert.deepEqual(choose(wrong, 1, list), wrong)
  const right = choose(start(), 1, list)
  assert.deepEqual(choose(right, 1, list), right)
})

test('選ぶ前は、次の問題へ進まない', () => {
  assert.deepEqual(next(start(), list), start())
})

test('最後の問題のあとは終わりになり、それ以上は変わらない', () => {
  let quiz = start()
  quiz = next(choose(quiz, 1, list), list)
  assert.deepEqual(quiz, { index: 1, selected: null, score: 1 })
  assert.equal(isFinished(quiz, list), false)
  quiz = next(choose(quiz, 0, list), list)
  assert.deepEqual(quiz, { index: 2, selected: null, score: 2 })
  assert.equal(isFinished(quiz, list), true)
  assert.deepEqual(choose(quiz, 0, list), quiz)
  assert.deepEqual(next(quiz, list), quiz)
})

test('もとの状態を書き換えない', () => {
  const quiz = start()
  choose(quiz, 1, list)
  assert.deepEqual(quiz, start())
})
