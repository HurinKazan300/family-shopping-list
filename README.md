# わが家の買い物メモ

家族で共有する買い物メモ（スマホのブラウザで動くアプリ）。

- レシートを「カメラで撮る」か「写真フォルダから選ぶ」と、買ったものがリストに入る（リストにあるものは個数を足し、ないものは新しく追加）
- 項目名の右に個数と −／＋ ボタン
- タグ（野菜・果物・日用品など）で分けて表示・絞り込み
- 検索
- 家族はアカウント不要。招待リンクを開くだけで同じリストを使える

使っている無料サービス:

| 役割 | サービス |
|---|---|
| アプリを置く場所 | GitHub Pages |
| 家族でリストを共有 | Firebase（Firestore・匿名ログイン） |
| レシートの読み取り | Gemini API（無料枠） |

## 準備の手順（最初の1回だけ）

### 1. Firebase のプロジェクトを作る
1. https://console.firebase.google.com を開き、Google アカウントでログインする
2. 「プロジェクトを作成」→ 名前は `family-shopping` など → Google アナリティクスは**オフ**でよい
3. 左のメニュー「構築」→「Authentication」→「始める」→「ログイン方法」タブで **「匿名」を有効にして保存**
4. 左のメニュー「構築」→「Firestore Database」→「データベースを作成」
   - ロケーション: **asia-northeast1（東京）**
   - 「本番環境モード」で開始
5. Firestore の「ルール」タブを開き、中身をすべて消して、このフォルダの `firestore.rules` の内容を貼りつけて「公開」

### 2. アプリに Firebase の設定を入れる
1. Firebase の画面左上の歯車 →「プロジェクトの設定」→ 下の「マイアプリ」で **`</>`（ウェブ）** を押す
2. アプリの名前（例: `shopping-web`）を入れて登録（Hosting のチェックは不要）
3. 表示される `firebaseConfig = { ... }` の中身を、このフォルダの `config.js` の `FIREBASE_CONFIG` に貼りかえる
   - この値はアプリを動かすための住所のようなもので、公開されても大丈夫です（データは手順1-5のルールで守られます）

### 3. GitHub Pages で公開する
1. `family-shopping-list` という**公開（Public）**リポジトリを作り、このフォルダのファイルを push する
   （無料の GitHub Pages は公開リポジトリだけで使えるため）
2. リポジトリの「Settings」→「Pages」→ Branch を `main`、フォルダを `/ (root)` にして Save
3. 1〜2分で `https://hurinkazan300.github.io/family-shopping-list/` で開けるようになる
4. Firebase に戻り「Authentication」→「設定」→「承認済みドメイン」→「ドメインを追加」で **`hurinkazan300.github.io`** を追加

### 4. レシート読み取りのキーを作る
1. https://aistudio.google.com/apikey を開き、Google アカウントでログイン
2. 「API キーを作成」→ できた文字列をコピー（今は `AQ.` で始まるキーが作られる。以前の `AIza` で始まるキーも使える）
3. アプリを開き、右上の歯車 →「レシート読み取りのキー」に貼って保存（家族全員のスマホで使えるようになる）

> 無料枠には1日の回数制限があります（家族で使う分には十分）。また、無料枠で送った写真は Google のサービス改善に使われることがあります。

### 5. 家族を招待する
1. アプリで「新しいリストを作る」
2. 右上の歯車 →「LINEなどで送る」で招待リンクを家族に送る
3. 家族はリンクを開くだけで使える

### 6. ホーム画面に置く（Galaxy・Pixel 共通、Chrome の場合）
アプリを開いて Chrome 右上の「︙」→「ホーム画面に追加」（または「アプリをインストール」）。
アプリのように1タップで開けるようになる。

## GitHub から「Secrets detected（Google API Key）」の警告が来たら
`config.js` の Firebase の `apiKey` を見つけたという自動の警告。Firebase のウェブ用キーは公開前提のもので、
アプリを動かすためにブラウザへ必ず送られるため、消しても隠せない（消すとアプリが動かなくなる）。
代わりに、キーを使える場所をこのアプリだけに制限しておく:

1. https://console.cloud.google.com/apis/credentials?project=family-shopping-486c7 →「Browser key (auto created by Firebase)」
2. アプリケーションの制限:「ウェブサイト」→ `https://hurinkazan300.github.io/*` と `https://family-shopping-486c7.firebaseapp.com/*` を追加して保存
3. GitHub の警告は「Close as」→「Won't fix」（理由: 公開前提の Firebase キー・ウェブサイト制限済み）で閉じる

リストのデータは `firestore.rules` で守られている（招待リンクの ID を知らないと読めない）。
Gemini のキーはリポジトリには入れず、アプリの設定から入れる（家族のリストの中に保存される）。

## 注意
- 招待リンクを知っている人は誰でもリストを見たり書いたりできる。家族以外には送らない。
- レシート読み取りのキーは家族のリストの中に保存される（リポジトリには入らない）。
