import { Metadata } from "next";
import { Roboto } from "next/font/google";

import { BaseLayout } from "~/modules/common/layouts";
import { RootProviders } from "~/modules/common/providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Desafio técnico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.variable} suppressHydrationWarning>
      <body>
        <RootProviders>
          <BaseLayout>{children}</BaseLayout>
        </RootProviders>
      </body>
    </html>
  );
}
