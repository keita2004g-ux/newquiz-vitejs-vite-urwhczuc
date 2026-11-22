# クイズ

3 択のクイズアプリ (Svelte 5 + Vite + Tailwind CSS)。

```sh
npm install
npm run dev      # 開発用サーバー
npm test         # 進み方の計算 (src/quiz.js) のテスト
npm run build    # dist/ に出力
```

- `src/quiz.js` — 問題と、選ぶ・次へ進む・終わりの判定。問題を足すときは `questions` に行を足す
- `src/App.svelte` — 画面
