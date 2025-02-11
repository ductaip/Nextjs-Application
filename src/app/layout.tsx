import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
import accountApi from "@/apis/account";
import { AccountResType } from "@/schemaValidations/account.schema";

const inter = Inter({subsets: ['vietnamese']})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies() 
  const sessionToken = cookieStore.get('sessionToken')
  let user: AccountResType['data'] | null = null
  if(sessionToken) {
    const data = await accountApi.MeFromServer(sessionToken.value)
    user = data.payload.data
  }

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
            <Header user={user} />
            <AppProvider initialSessionToken={sessionToken?.value || ''} user={user}>
              {children}
            </AppProvider>
          </ThemeProvider>     
          <Toaster />
      </body> 
    </html>
  ) 
}
