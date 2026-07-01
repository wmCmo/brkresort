import type { Metadata, Viewport } from "next";
import { Alice, Kanit, Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MobileNav from "@/components/MobileNav";
import SessionProvider from "@/providers/SessionProvider";
import Nav from "@/components/Nav";
import ChangeTheme from "@/components/ChangeTheme";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const alice = Alice({
  subsets: ['latin'],
  variable: '--font-alice',
  weight: ["400"],
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
  icons: "/ui/logo.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${kanit.variable} ${alice.variable} h-full antialiased font-sans bg-background`}
    >
      <ThemeProvider>
        <SessionProvider>
          <QueryProvider>
            <body className="min-h-full flex flex-col items-center">
              <Nav />
              <MobileNav />
              {children}
              <div className="fixed bottom-4 left-4 z-20">
                <ChangeTheme />
              </div>
              <Footer />
              {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
            </body>
          </QueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
