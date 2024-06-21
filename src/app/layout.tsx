import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./_styles/globals.scss";
import PageTitle from "./_components/common/PageTitle/PageTitle";
import StoreProvider from "./_store/StoreProvider";
import ActionModal from "./_components/common/ActionModal.tsx/ActionModal";
import type { LayoutProps } from "../types/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo List",
  description: "Tasks management system",
};

const RootLayout = ({children}: LayoutProps) => (
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