import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const privatePaths = ['/me']
const authPaths = ['/login', '/register']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const sessionToken = request.cookies.get('sessionToken')?.value
    
    console.log(pathname)
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me'],
}