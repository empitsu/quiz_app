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
  
    ```javascript
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


# UIデザインについて

## Color 

* アクセントカラー：Bright Navy Blue & Maximum Blue Green
* メインカラー： Jet Gray
* ベースカラー：Alice Blue

全体の色相は青系に統一しつつも、アクセントカラーに緑がかったMaximum Blue Greenを加えることで地味過ぎないように。

## Shape

イメージカラーの青は寒色であり「清涼感」「堅実」「冷淡」などの印象を与える。  
冷たすぎる印象にならないようロゴの「Q」は正円とし、全体的に丸みを帯びたフォントを使用。

ボタンやテキストフィールドなどUIパーツのデザインも丸みのある形に。

## Usability & Accecibility

* すべての操作がキーボードで操作できるよう、Accessible Rich Internet Applications (ARIA) の仕様に従った属性の付与や、セマンティックなマークアップを意識。
* ユーザーにストレスを与えないようクライアントサイドでのフォームバリデーションも実装。


# Directory structure

```
├── public
│   └── images
├── src
│   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   │   ├── AnswerTemplate
│   │   │   │   ├── AnswerResult
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── AnswerSelectionQuiz
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── AnswerSortQuiz
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── getQuizzes.ts
│   │   │   │   └── index.tsx
│   │   └── uikit
│   ├── config
│   ├── contexts
│   ├── ducks
│   │   └── AnswerTemplate
│   │       ├── actions.ts
│   │       ├── index.ts
│   │       ├── model.ts
│   │       ├── reducer.ts
│   │       └── types.ts
│   ├── pages
│   ├── server
│   ├── styles
│   └── utils
├── tests
│   ├── ducks
│   └── utils
└── types
```

* src
  * components
    * layouts
      * ヘッダ・フッタなどを含むページ間共通のレイアウト
    * pages
      * `src/pages` に対応したコンポーネントを必ず一つ作成。
      そのページ内でしか使わないコンポーネントや関数は配下に設置する。
    * uikit
       * アプリケーション内で文脈問わず使用できる汎用的なUIパーツ。
  * config
       * firebaseの構成ファイルや秘密鍵を設置する。
  * contexts
    * useContextで使用するContextやProviderを設置
  * ducks
    * [re-ducksパターン](https://github.com/alexnm/re-ducks) に従ってuseReducerで使用するmodelやactionsを設置。
  * pages
    * routingに対応するページコンポーネント
  * server
    * api routes（サーバーサイド）でのみ使用する関数やヘルパー
  * styles
    * CSSで使用するテーマの定義やnormalize用のスタイル
  * utils
    * アプリーケーション全体で汎用的に使用できるutility
  * tests
    * Unit Testファイル
  * types
    * 型定義ファイル

# こだわったところ


## Unit Test

* BDDの考えをベースに、「何が」「どうなるか」と意識して振る舞い単位でテストケースを実装。

  ```typescript
  describe("<RegisterSortQuiz />", () => {
    it("should be called when selecting `sortable question`", async () => {
      const { getByText } = render(
        <StyleThemeProvider>
          <RegisterTemplate />
        </StyleThemeProvider>
      );
      fireEvent.click(getByText("並び替え問題"));
      expect(RegisterSortQuiz).toHaveBeenCalledTimes(1);
    });
  });
  ```

* 「テストが書きやすい<==>良い設計」という考えのもと、コンポーネントの責務を適切に分割。
下層のコンポーネントをmock化し、期待するpropsで呼び出されていることを確認するテストを書く。

  * tests/components/pages/AnswerTemplate/index.test.tsx
  ```typescript
  jest.mock(
    "../../../../src/components/pages/AnswerTemplate/AnswerSortQuiz",
    () => {
      return {
        AnswerSortQuiz: jest.fn(() => <></>),
      };
    }
  );

  ...
  it("<AnswerSortQuiz /> should be called when the type of the first quiz is sort", async () => {
    mockGetQuizzes(([
      {
        id: "id1",
        data: sortQuiz,
      },
    ] as unknown) as Documents);
    render(<TestComponent correctAnswersLength={0} currentQuizIndex={0} />);
    await delayEventLoop();
    expect(AnswerSortQuiz).toHaveBeenCalledTimes(1);
    const options: AnswerSortQuizProps["options"] = [
      {
        optionId: 1,
        text: "option1",
      },
    ];
    expect(mocked(AnswerSortQuiz).mock.calls[0][0].options).toEqual(options);
  });
  ```

* props drillingが深くなる箇所はテストを書く際にモックの実装負荷を高いため、useContextも活用。

* 複雑な処理はreducerやselectorに押し込めることでテストを書きやすく。

  * tests/ducks/AnswerSortQuiz/reducer.test.ts
  ```typescript
    it("should remove an option from selected options with popFromSelectedOptions action", () => {
      const result = reducer(
        {
          restOptions: [],
          selectedOptions: [testOption],
        },
        popFromSelectedOptions(testOption)
      );
      expect(result).toEqual({
        restOptions: [testOption],
        selectedOptions: [],
      });
    });
    ```

  * reducerを使用するコンポーネント側では、actionをmock化し期待する引数で呼ばれていることだけをテスト。
  
    * tests/components/pages/AnswerTemplate/AnswerSortQuiz/index.test.tsx
    ```typescript
    const pushToSelectedOptions = jest.spyOn(actions, "pushToSelectedOptions");
    ...
      it("pushToSelectedOptions should be called with the selected option when the option button is clicked", () => {
      const { getByLabelText } = render(
        <StyleThemeProvider>
          <AnswerSortQuiz title="タイトル" options={[testOption]} />
        </StyleThemeProvider>
      );

      fireEvent.click(getByLabelText("選択肢1を選択する"));
      expect(pushToSelectedOptions).toHaveBeenCalledWith(initializedOption);
    });
    ```

## Firebase

* Firestoreはクライアントサイドからも直接アクセスができるが、永続化層に触るコードをクライアントサイドに露出させないためにサーバーサイド（Node.js）に実装。
* Firebase Authenticationが生成したJWT Tokenをhttpヘッダに付与し、サーバーサイドでverifyすることで認証を実装。
* アプリケーションコードがFirebaseにできるだけ依存しないように、firebaseのpackageをimportする処理は、専用のhelperに凝集させる。
  * src/utils/firebaseHelpers.ts
  * src/server/firebaseAdminHelpers.ts

## TypeScript 

* TypeScriptはstrictモードで設定。eslint, prettierも導入し安全性の低いコードを強制的に防止。
* もちろんanyやasでのキャストは極力使わないように。
* uikitの汎用的なコンポーネントは、プリミティブなHTML属性も渡せるよう汎用性の高い構造に。
  * Reactやstyled-componentsが提供しているTypeScriptの型エイリアスを活用し、安全性を担保しながらも少ないコードで汎用性をもたせる。
  * e.g. src/components/uikit/Textfield/index.tsx
    ```typescript
    type Props = StyledComponentInnerOtherProps<typeof StyledTextField> &
      React.InputHTMLAttributes<HTMLInputElement>;

    export const Textfield = React.forwardRef<HTMLInputElement, Props>(
      ({ isFullWidth = false, ...otherProps }, ref) => (
        <StyledTextField
          type="text"
          isFullWidth={isFullWidth}
          ref={ref}
          {...otherProps}
        ></StyledTextField>
      )
    );
    ```
