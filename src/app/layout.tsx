import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";

const inter = Inter({subsets: ['vietnamese']})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies() 
  const sessionToken = cookieStore.get('sessionToken')

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
            <AppProvider initialSessionToken={sessionToken?.value || ''}>
              {children}
            </AppProvider>
          </ThemeProvider>     
          <Toaster />
      </body> 
    </html>
  ) 
}
