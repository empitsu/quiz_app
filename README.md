# 技術スタック

- Next.js
- TypeScript
- Firebase Authentication
- Firebase Cloud Firestore
- Jest + Testing Library
- styled-components


# セットアップ手順

1. [Firebaseコンソール](https://console.firebase.google.com/) よりFirebaseプロジェクトを作成。

  参考：https://firebase.google.com/docs/web/setup#create-firebase-project
  
1. ウェブアプリの追加
  1. 「プロジェクトの概要」ページで「アプリを追加」をクリック。
  1. ウェブアイコン（</>）を選択してアプリの追加を行う。

  参考：https://firebase.google.com/docs/web/setup#node.js-apps

1. 構成ファイルの入手

  「プロジェクトの概要」の右の歯車アイコン > 「プロジェクトの設定」 > 「マイアプリ」 > 「Firebase SDK snippet」 より「構成」を選択。  
  以下のようなオブジェクトをコピー。
  
  ```bash
   // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    var firebaseConfig = {
      apiKey: "API_KEY",
      authDomain: "PROJECT_ID.firebaseapp.com",
      databaseURL: "https://PROJECT_ID.firebaseio.com",
      projectId: "PROJECT_ID",
      storageBucket: "PROJECT_ID.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID",
      measurementId: "G-MEASUREMENT_ID",
    };
  ```
  
  参考: https://firebase.google.com/docs/web/setup#node.js-apps

1. 構成ファイルをソースコードに設置

  /src/configディレクトリに `firebaseConfig.json` というファイルを作成。  
  先程コピーした構成オブジェクトをJSONとして貼り付ける。

  イメージ：
  ```json
  {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID",
  }
  ```
  
1. Firebase Authenticationの有効化

  1. プロジェクトページサイドメニューより「Authentication」セクションを開く。
  2. 「ログイン方法」タブで「メール / パスワード」を有効にして、[保存] をクリック。

  詳細： https://firebase.google.com/docs/auth/web/password-auth?hl=ja

1. Firebase Admin SDKの秘密鍵の入手

  1. プロジェクトページ「プロジェクトの概要」の右の歯車アイコン > 「プロジェクトの設定」 > [サービスアカウント](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) を開く
  1. 「新しい秘密鍵の生成」をクリックし、「キーを生成」をクリックして確定。
  1. キーを含む JSON ファイル保存しておく。

  参考：https://firebase.google.com/docs/admin/setup#node.js_1

1. 秘密鍵をソースコードに設置

  /src/configディレクトリに `firebaseAdminConfig.json` というファイルを作成。  
  先程入手した秘密鍵の内容をJSONとして保存。
  
  
  イメージ：
  ```json
  {
    "type": "service_account",
    "project_id": "xxxxx",
    "private_key_id": "xxxxxx",
    "private_key": "-----BEGIN PRIVATE KEY-----  your private key",
    "client_email": "xxxx",
    "client_id": "xxx",
    "auth_uri": "xxxx",
    "token_uri": "xxx",
    "auth_provider_x509_cert_url": "xxxx",
    "client_x509_cert_url": "xxxx"
  }
  ```
    
1. ルートディレクトリでnpm install

  ```bash
   npm install
  ```

1. ローカルサーバーの起動

  ```bash
   npm run dev
  ```

起動したら、http://localhost:3000/ をブラウザで開く。
