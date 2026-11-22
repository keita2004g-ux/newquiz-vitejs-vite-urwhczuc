<script>
  import './app.css'
  import { questions, start, choose, next, isFinished } from './quiz.js'

  let quiz = $state(start())
  let question = $derived(questions[quiz.index])
  let answered = $derived(quiz.selected !== null)
  let correct = $derived(answered && quiz.selected === question.answer)

  // 選んだあとの選択肢の色。正解は緑、選んだ不正解は赤
  function choiceClass(i) {
    if (!answered) return 'border-slate-300 bg-white hover:bg-sky-50'
    if (i === question.answer) return 'border-green-600 bg-green-100'
    if (i === quiz.selected) return 'border-red-600 bg-red-100'
    return 'border-slate-200 bg-white text-slate-400'
  }
</script>

<main class="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-4 text-slate-900">
  <header class="flex items-center justify-between rounded bg-sky-700 px-4 py-3 text-white">
    <h1 class="text-lg font-bold">クイズ</h1>
    {#if !isFinished(quiz)}
      <p>{quiz.index + 1} / {questions.length} 問目　正解 {quiz.score}</p>
    {/if}
  </header>

  {#if isFinished(quiz)}
    <section class="flex flex-col items-center gap-4">
      <h2 class="text-xl font-bold">結果</h2>
      <p class="text-2xl">{questions.length} 問中 {quiz.score} 問正解</p>
      <button class="rounded bg-sky-700 px-6 py-3 text-white hover:bg-sky-800" onclick={() => (quiz = start())}>
        もう一度
      </button>
    </section>
  {:else}
    <h2 class="text-xl font-bold">{question.text}</h2>

    <div class="flex flex-col gap-3">
      {#each question.choices as choice, i (choice)}
        <button
          class="rounded border-2 px-4 py-3 text-left {choiceClass(i)}"
          disabled={answered}
          onclick={() => (quiz = choose(quiz, i))}
        >
          {choice}
          {#if answered && i === question.answer}<span class="float-right">○ 正解</span>{/if}
          {#if answered && i === quiz.selected && !correct}<span class="float-right">× あなたの答え</span>{/if}
        </button>
      {/each}
    </div>

    <p class="min-h-8 text-lg font-bold" aria-live="polite">
      {#if answered}{correct ? '正解！' : '不正解…'}{/if}
    </p>

    {#if answered}
      <button class="self-end rounded bg-sky-700 px-6 py-3 text-white hover:bg-sky-800" onclick={() => (quiz = next(quiz))}>
        {quiz.index + 1 < questions.length ? '次の問題へ' : '結果を見る'}
      </button>
    {/if}
  {/if}
</main>
