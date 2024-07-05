import { NextResponse } from 'next/server';

export function middleware(request) {
    const currentPath = request.nextUrl.pathname;
    console.log(`Current Path: ${currentPath}`);
    console.log("Middleware running");

    const authToken = request.cookies.get("authToken")?.value;
    
    // Define paths where logged-in users should not access
    const loggedInUserNotAccessPaths = currentPath === "/";

    if (loggedInUserNotAccessPaths) {
        if (authToken) {
            return NextResponse.redirect(new URL("/instructions", request.url));
        }
    } else {
        if (!authToken) {
            return NextResponse.redirect(new URL("http://localhost:3000", request.url));
        }
    }

    console.log(`Auth Token: ${authToken}`);
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/instructions'],
};
