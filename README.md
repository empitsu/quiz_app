![logo](docs/images/logo.png)

# Technologies

- Next.js
- TypeScript
- Firebase Authentication
- Firebase Cloud Firestore
- Jest + Testing Library
- styled-components

# How to Setup

1. [Firebase コンソール](https://console.firebase.google.com/) より Firebase プロジェクトを作成。

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

   `/src/config` ディレクトリに `firebaseConfig.json` というファイルを作成。  
   先程コピーした構成オブジェクトを JSON として貼り付ける。

   イメージ：

   ```json
   {
     "apiKey": "API_KEY",
     "authDomain": "PROJECT_ID.firebaseapp.com",
     "databaseURL": "https://PROJECT_ID.firebaseio.com",
     "projectId": "PROJECT_ID",
     "storageBucket": "PROJECT_ID.appspot.com",
     "messagingSenderId": "SENDER_ID",
     "appId": "APP_ID",
     "measurementId": "G-MEASUREMENT_ID"
   }
   ```

1. Firebase Authentication の有効化

   1. プロジェクトページサイドメニューより「Authentication」セクションを開く。
   2. 「ログイン方法」タブで「メール / パスワード」を有効にして、[保存] をクリック。

    詳細： https://firebase.google.com/docs/auth/web/password-auth?hl=ja

1. Firebase Admin SDK の秘密鍵の入手

   1. プロジェクトページ「プロジェクトの概要」の右の歯車アイコン > 「プロジェクトの設定」 > [サービスアカウント](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) を開く
   1. 「新しい秘密鍵の生成」をクリックし、「キーを生成」をクリックして確定。
   1. キーを含む JSON ファイル保存しておく。

   参考：https://firebase.google.com/docs/admin/setup#node.js_1

1. 秘密鍵をソースコードに設置

   `/src/config` ディレクトリに `firebaseAdminConfig.json` というファイルを作成。  
   先程入手した秘密鍵の内容を JSON として保存。

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

1. ルートディレクトリで npm install

   ```bash
    npm install
   ```

1. ローカルサーバーの起動

   ```bash
    npm run dev
   ```

   起動したら、http://localhost:3000/ をブラウザで開く。

# UI Design

## Color

![logo](docs/images/color_palette.png)


- アクセントカラー：Bright Navy Blue & Maximum Blue Green
- メインカラー： Jet Gray
- ベースカラー：Alice Blue

全体の色相は青系に統一しつつも、アクセントカラーに緑がかった Maximum Blue Green を加えることで地味過ぎないように。

## Shape


イメージカラーの青は寒色であり「清涼感」「堅実」「冷淡」などの印象を与える。  
冷たすぎる印象にならないようロゴの「Q」は正円とし、全体的に丸みを帯びたフォントを使用。

ボタンやテキストフィールドなど UI パーツのデザインも丸みのある形に。

![logo](docs/images/top_screenshot.png)


![logo](docs/images/answer_screenshot.png)



## Usability & Accecibility

- すべての操作がキーボードで操作できるよう、Accessible Rich Internet Applications (ARIA) の仕様に従った属性の付与や、セマンティックなマークアップを意識。
- ユーザーにストレスを与えないようクライアントサイドでのフォームバリデーションも実装。

![logo](docs/images/register_screenshot.png)


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
│   │   ├── api
│   │   │   └── quizzes.ts
│   │   └── index.tsx
│   ├── server
│   ├── styles
│   └── utils
├── tests
│   ├── ducks
│   └── utils
└── types
```

- src
  - components
    - layouts
      - ヘッダ・フッタなどを含むページ間共通のレイアウト
    - pages
      - `src/pages` に対応したコンポーネントを必ず一つ作成。
        そのページ内でしか使わないコンポーネントや関数は配下に設置する。
    - uikit
      - アプリケーション内で文脈問わず使用できる汎用的な UI パーツ。
  - config
    - firebase の構成ファイルや秘密鍵を設置する。
  - contexts
    - useContext で使用する Context や Provider を設置
  - ducks
    - [re-ducks パターン](https://github.com/alexnm/re-ducks) に従って useReducer で使用する model や actions を設置。
  - pages
    - routing に対応するページコンポーネント
    - api
      - [API Routes](https://nextjs.org/docs/api-routes/introduction) を使用したAPIエンドポイント。
  - server
    - API routes（サーバーサイド）でのみ使用する関数やヘルパー
  - styles
    - CSS で使用するテーマの定義や normalize 用のスタイル
  - utils
    - アプリーケーション全体で汎用的に使用できる utility
  - tests
    - Unit Test ファイル
  - types
    - 型定義ファイル

# Highlights

## Unit Test

- BDD の考えをベースに、「何が」「どうなるか」を意識して振る舞い単位でテストケースを記載。

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

- 「テストが書きやすい<==>良い設計」という考えのもと、コンポーネントの責務を適切に分割。
  下層のコンポーネントを mock 化し、期待する props で呼び出されていることを確認するテストを書く。

  - tests/components/pages/AnswerTemplate/index.test.tsx

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

- props drilling が深くなる箇所はテストを書く際のモックの実装負荷が高いため、useContext も活用。

- 複雑な処理は reducer や selector など純粋な関数に押し込めることでテストを書きやすく。

  - tests/ducks/AnswerSortQuiz/reducer.test.ts

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

  - reducer を使用するコンポーネント側では、action を mock 化し期待する引数で呼ばれていることだけをテスト。

    - tests/components/pages/AnswerTemplate/AnswerSortQuiz/index.test.tsx

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

- Firestore はクライアントサイドからも直接アクセスすることもできるが、永続化層に触るコードをクライアントサイドに露出させないためにサーバーサイド（Node.js）に実装。
- Firebase Authentication が生成した JWT Token を http ヘッダに付与し、サーバーサイドで verify することで認証を実装。
- アプリケーションコードが Firebase にできるだけ依存しないように、firebase の package を import する処理は専用の helper に凝集させる。
  - src/utils/firebaseHelpers.ts
  - src/server/firebaseAdminHelpers.ts
- ランダムなクイズ5件を取得する処理はパフォーマンスに配慮し、自動で割り振られるランダムなdocumentIdを活用。最大で2回までのDBアクセスで済むように実装。
  - src/server/quizzes/getFromFirestoreRandomly.ts


## TypeScript

- TypeScript は strict モードで設定。eslint, prettier も導入し安全性の低いコードを強制的に防止。
- もちろん any や as での型キャストは極力使わないように。
- `uikit` の汎用的なコンポーネントは、プリミティブな属性も渡せるよう汎用性の高い構造に。

  - React や styled-components が提供している TypeScript の型エイリアスを活用し、安全性を担保しながらも少ないコードで汎用性をもたせる。
  - e.g. src/components/uikit/Textfield/index.tsx

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

# Issue

* 複雑な処理をしている箇所しかテストが書けていないため、テストケースを増やしてテストカバレッジを上げる。
* ローカルステートとuseContextを混在して使用しているコンポーネントがある。（src/components/pages/AnswerTemplate/index.tsx）  
可読性の向上及び、テストをよりシンプルに書けるようにするために、他のローカルステートもuseContextで管理することを検討したい。
* クイズデータに関する型定義がアプリケーション内にちらばっている。
  メンテナンス性を上げるためにも、クイズデータの配列をuseContext+useReducerで管理し、そのmodelに型を定義してアプリケーション内で使い回せるようにしたい。
* サーバーサイドはAPI Routes + Firebase を使用した簡易的な実装のため、Nest.jsやexpress, fastifyなどのNode.jsフレームワーク、もしくはBlitz, frourioなどのフルスタックフレームワークの使用も検討したい。
