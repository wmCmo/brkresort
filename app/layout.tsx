import type { Metadata, Viewport } from "next";
import { Kanit, Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-kanit'
});

export const viewport: Viewport = {
  themeColor: '#5EA500'
};

const TITLE = "Baan Rai Khun Yaa Resort";
const DESC = "Cozy Wooden Cottage - Stunning Riverside View in Kanchanaburi";

export const metadata: Metadata = {
  title: { default: TITLE, template: `%s | ${TITLE}` },
  description: DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${kanit.variable} h-full antialiased font-sans bg-background`}
    >
      <ThemeProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </ThemeProvider>
    </html>
  );
}
