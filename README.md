# README


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

