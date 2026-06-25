# 🥗 You are what you eat

AIチャット（ChatGPT / Claude / Gemini など）と組み合わせて使う、**完全プライベート**な栄養管理ビューアです。データはすべて手元（ブラウザの localStorage / data.json）に保存され、外部サーバーには一切送信されません。

**バージョン** v3.3 / **データ形式** schema v1.3

## 使い方

- **Web 版（PWA）**: <https://chodky.github.io/you-are-what-you-eat/> をブラウザで開く。iPhone は Safari の「共有 → ホーム画面に追加」でアプリとして使えます。
- **ローカル版**: `viewer.html` をダウンロードしてダブルクリックするだけ。単一 HTML ファイル・外部リソースなしで、file:// のままオフラインで動作します。

初回起動時のオンボーディングで「🧪 まずサンプル投入で試す」を選ぶと、30日分のデモデータでダッシュボード・履歴・体組成グラフを試せます。

## 構成

| ファイル | 役割 |
|---|---|
| `viewer.html` | アプリ本体（単一 HTML） |
| `index.html` | `viewer.html` へのリダイレクト |
| `manifest.json` / `sw.js` / 各アイコン | PWA 用 |

## ライセンス

[MIT](LICENSE)
