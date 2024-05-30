# README

# アプリケーション名
Chronicle

# アプリケーション概要
カレンダーに予定を記載し、自由に管理できる。また追加実装により家計簿やtodoリストなどを記入できる(現在実装中)
iphoneなどの携帯端末にも対応している。

# URL
http://52.198.221.75/

# テスト用アカウント
ID:friday

PASS:4285

nickname:yukimaru

パスワード:6454yuki

# 利用方法
## カレンダー作成
月ごとのカレンダーを自由に作成できる。予定の保存や編集、削除にも対応。

## 予定管理
画面下部に予定一覧が表示されている。大きさもユーザーによって変更でき、予定一覧から編集や削除も可能。また一覧自体も非表示にできる。

# アプリケーション作成の背景
予定管理や日々の記録付けなど多種多様な記録帳を兼ね備えたアプリケーションを作成することで、誰かの人生を記録できるアプリケーションを作成したいと考え作成した。
記録を見返したときに自身の成長の様子や自分の足跡を視覚化できれば、その人の人生にとっての年代記が出来上がると考えた。

# 機能の動画
https://github.com/yukimaru93/chronicle_step/assets/167279940/d6127e14-f65c-4126-b4f9-206b9ddddfe9

# 実装予定の機能
## 家計簿記録機能
日々の消費を記録し、振り返ることができる機能。(可能であればAIによる画像認識を採用したい)

## todoリスト作成機能
一日の目標やその日のタスクをまとめて、記録できる機能。

## ユーザーより声が上がった機能の追加
現在アプリを活用してもらっているユーザーから声をいただき、その機能の実装を行う。

# データベース設計
## calendars テーブル

| Column              | Type       | Options                        |
| ------------------- | ---------- | ------------------------------ |
| user                | references | null: false, foreign_key: true |
| date                | date       | null: false |
| content             | text       | null: false |
 
### Association

- belongs_to :user


## users テーブル

| Column             | Type    | Options     |
| ------------------ | ------- | ----------- |
| email              | string  | null: false, unique: true |
| encrypted_password | string  | null: false |
| name               | string  | null: false |
| nickname           | string  | null: false |


### Association

- has_many :calendars


# 開発環境
フロントエンド(Ruby,Javascript,React,HTML,CSS)

※RailsのESbuildを使用し、Reactを導入

※Reactのバージョンは18、React内のCSSはstyled-componentを使用

バックエンド(RubyonRails)

インフラ(AWS)

テキストエディタ(VSCode)

タスク管理(Github)

# 工夫したポイント	
スクール内で学習したRubyonRailsに加え、学習中に独学で習得をしていたReactを活用したコンポーネントの受け渡しをアプリケーションに組み込んだ。

カレンダー自体は他のAPIを活用すればかなり簡単に作成ができるが、あえてReactでのデータの受け渡しにすることで自身でAPI構築まですることができた。

作成途中より数名のテストユーザーに協力していただき、機能の追加実装案や修正箇所等を共有していただくことができた。実際ユーザーに活用していただくことで責任感ももってアプリケーション作成に臨めた。

作成時には当初webpackerを使用していたが、Rails7との相性が悪く、アプリケーションをESbuildで再作成した。バージョンに対応して使う技術を変化させることにも力を入れた。

# 改善点
カレンダー機能以外の実装に取り組み、他のカレンダーアプリケーションとの差を明確につくる。
データの受け渡しスピードを上げることができるように再レンダリングやstate管理を見直す。

# 制作時間
約３週間


