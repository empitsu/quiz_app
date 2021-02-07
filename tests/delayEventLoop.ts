import { act } from "react-dom/test-utils";

/**
 * イベントループを遅らせる。
 * useEffectの中で実行している関数のcallを待つ場合などで使用する。
 */
export const delayEventLoop = async (): Promise<void> => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
  });
};
