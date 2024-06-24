import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./_styles/globals.scss";
import StoreProvider from "./_store/StoreProvider";
import PageTitle from "./_components/common/PageTitle/PageTitle";
import ActionModal from "./_components/common/ActionModal.tsx/ActionModal";
import type { ProviderProps } from "../types/global";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do",
  description: "Tasks management system",
};

const RootLayout = ({children}: ProviderProps) => (
  <html lang="en">
    <body className={inter.className}>
      <PageTitle />
      <StoreProvider>
        <ActionModal />
        {children}
      </StoreProvider>
    </body>
  </html>
);

export default RootLayout;