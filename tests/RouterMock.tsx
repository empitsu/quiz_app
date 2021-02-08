import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/router";
import { ReactNode } from "react";

export function RouterMock({
  router,
  children,
}: {
  router: NextRouter;
  children: ReactNode;
}) {
  const mockRouter: NextRouter = {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isReady: false,
  };

  // Router.router = mockRouter;

  return (
    <RouterContext.Provider value={{ ...mockRouter, ...router }}>
      {children}
    </RouterContext.Provider>
  );
}
