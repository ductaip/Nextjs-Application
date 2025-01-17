import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({subsets: ['vietnamese']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>  
      <body
        className={`${inter.className} container`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>     
          <Toaster />
      </body> 
    </html>
  ) 
}
