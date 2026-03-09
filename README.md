# AI Hackathon — 論文ダイジェストノート

研究論文を PDF でアップロードし、AI が自動的に内容を解析・要約するフルスタック Web アプリケーションです。

## 技術スタック

| 領域 | 技術 |
|------|------|
| フロントエンド | React 19, Vite 7, TypeScript 5, TanStack Router, Material-UI (MUI) 7 |
| バックエンド | AWS Amplify (Gen 2), AppSync (GraphQL), DynamoDB, Cognito, S3, Lambda |
| AI 解析 | AWS Bedrock (Claude) |
| コード品質 | Biome (lint / format) |
| CI/CD | AWS Amplify Hosting (`amplify.yml`) |

## プロジェクト構造

```
aihackathon/
├── amplify/                        # バックエンド (AWS Amplify Gen 2)
│   ├── auth/
│   │   ├── resource.ts             # Amazon Cognito 設定
│   │   └── pre-sign-up/
│   │       ├── handler.ts          # サインアップ前バリデーション Lambda
│   │       └── resource.ts
│   ├── data/
│   │   └── resource.ts             # GraphQL スキーマ & DynamoDB テーブル定義
│   ├── functions/
│   │   └── scolarDigest/
│   │       ├── handler.ts          # DynamoDB ストリームトリガー Lambda
│   │       ├── pdfAnalitics.ts     # Bedrock (Claude) による PDF 解析ロジック
│   │       └── resource.ts
│   ├── storage/
│   │   └── resource.ts             # S3 バケットのアクセス権限設定
│   └── backend.ts                  # バックエンドリソースのエントリーポイント
│
├── src/                            # フロントエンド
│   ├── main.tsx                    # React アプリのエントリーポイント
│   ├── amplify.ts                  # Amplify クライアント初期化
│   ├── routes/                     # TanStack Router ファイルベースルート
│   │   ├── __root.tsx              # ルートレイアウト (AppBar + Outlet)
│   │   ├── index.tsx               # ホーム (論文一覧 / アップロード)
│   │   ├── about.tsx               # About ページ
│   │   ├── login/
│   │   │   └── index.tsx           # ログインページ (Cognito Authenticator)
│   │   └── scalar/
│   │       └── $scalarId.tsx       # 論文詳細ページ
│   ├── component/
│   │   ├── layout/
│   │   │   └── AppBar.tsx          # ナビゲーションバー
│   │   └── scalarList/
│   │       ├── ResearchHub.tsx         # 論文一覧 & アップロードUI
│   │       ├── ResearchPaperCard.tsx   # 論文カードコンポーネント
│   │       └── ResponsiveComponents.tsx # レスポンシブグリッド
│   ├── hooks/
│   │   ├── useUser.ts              # 認証状態管理フック
│   │   ├── useScolar.ts            # 論文データ取得フック
│   │   └── useBreakpoint.ts        # レスポンシブ対応フック
│   └── types/
│       ├── research.ts             # 論文関連の型定義
│       └── index.ts                # GraphQL 認証モード型
│
├── public/                         # 静的アセット
├── index.html                      # HTML エントリーポイント
├── vite.config.ts                  # Vite ビルド設定
├── biome.json                      # Biome lint / format 設定
├── amplify.yml                     # Amplify Hosting CI/CD パイプライン定義
└── tsconfig.json                   # TypeScript 設定
```

## アーキテクチャ概要

```
[ユーザー]
    │
    ▼
[フロントエンド (React + Vite)]
    │  PDF アップロード
    ▼
[S3] ─── INSERT イベント ──▶ [DynamoDB Stream]
    │                                │
    ▼                                ▼
[AppSync (GraphQL)]          [Lambda: scolarDigest]
    │                                │
    ▼                                ▼
[DynamoDB]              [AWS Bedrock (Claude)]
  Scalar テーブル          PDF 解析 (タイトル・著者・要旨・新規性など)
  ScalarShare テーブル            │
                                  │ 解析結果を DynamoDB に書き戻し
                                  ▼
                           [DynamoDB: Scalar レコード更新]
```

### データモデル

| テーブル | 説明 | 認可 |
|---------|------|------|
| `Scalar` | ユーザーがアップロードした論文 | オーナーのみ読み書き可 |
| `ScalarShare` | 公開共有された論文 | ゲスト読み取り / 認証ユーザー全操作 |

**主なフィールド**: `id`, `owner`, `title`, `authors`, `abstract`, `imageUrl`, `publishedDate`, `scolarDataKey` (S3パス), `novelty`, `originality`, `challenges`, `relatedResearch`

### S3 ストレージ構造

```
scolar/
└── {uuid}.pdf         # アップロードされた論文 PDF (上限 4.3 MB)
scolarPicture/
└── {imageName}        # 論文カバー画像
```

## 主なページ・機能

| ルート | ページ | 機能 |
|-------|-------|------|
| `/` | ホーム (ResearchHub) | 論文一覧表示・PDF アップロード |
| `/login` | ログイン | Cognito メール認証 |
| `/scalar/:id` | 論文詳細 | AI 解析結果の表示 |
| `/about` | About | アプリ説明 |

## 開発コマンド

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動 (フロントエンド + Amplify サンドボックス)
npm run start:dev

# フロントエンドのみ起動
npm run dev

# Amplify バックエンド サンドボックス起動 (単独)
npm run sandbox

# プロダクションビルド
npm run build

# ビルド成果物のプレビュー
npm run preview

# Lint チェック
npm run lint

# Lint 自動修正
npm run lint:fix

# フォーマットチェック
npm run format

# フォーマット自動修正
npm run format:fix

# Lint & フォーマット一括チェック
npm run check

# Lint & フォーマット一括修正
npm run check:fix
```

## デプロイ

AWS Amplify Hosting を使用しています。`amplify.yml` に CI/CD パイプラインが定義されており、リポジトリへのプッシュで自動的にバックエンド (CDK) とフロントエンド (Vite) がビルド・デプロイされます。

詳細は [Amplify ドキュメント](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) を参照してください。

## セキュリティ

[CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) を参照してください。

## ライセンス

MIT-0 ライセンスの下で提供されています。詳細は LICENSE ファイルを参照してください。