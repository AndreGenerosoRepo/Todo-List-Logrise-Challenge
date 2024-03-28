import React from "react";

import { ToDosProvider } from "./ToDos";

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IAppProviderProps) => (
  <ToDosProvider>{children}</ToDosProvider>
);

export default AppProvider;
