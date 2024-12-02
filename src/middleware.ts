import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const auth = request.cookies.get("Authentication");

    if (!auth && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (auth && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Exclui arquivos estáticos
};
