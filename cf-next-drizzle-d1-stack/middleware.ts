import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Auth } from "@auth/core";
import type { Session } from "@auth/core/types";
import type { JWT } from "@auth/core/jwt";
import type { AdapterUser } from "@auth/core/adapters";
import { getAuthConfig } from "@/app/api/[[...route]]/route"; // 認証設定をインポート

type AuthUser = {
	session: Session;
	token?: JWT;
	user?: AdapterUser;
};

export async function getServerSession(req: NextRequest) {
	const config = getAuthConfig();
	config.secret ??= process.env.AUTH_SECRET;
	config.basePath ??= "/api/auth";
	config.trustHost = true;
	const origin = process.env.NEXTAUTH_URL ?? req.nextUrl.origin;
	const request = new Request(`${origin}${config.basePath}/session`, {
		headers: { cookie: req.headers.get("cookie") ?? "" },
	});

	let authUser: AuthUser = {} as AuthUser;

	const response = (await Auth(request, {
		...config,
		callbacks: {
			...config.callbacks,
			async session(...args) {
				authUser = args[0];
				const session =
					(await config.callbacks?.session?.(...args)) ?? args[0].session;
				const user = args[0].user ?? args[0].token;
				return { user, ...session } satisfies Session;
			},
		},
	})) as Response;

	const session = (await response.json()) as Session | null;

	return session?.user ? authUser : null;
}

export async function middleware(request: NextRequest) {
	const session = await getServerSession(request);

	// ルートパスの処理
	if (request.nextUrl.pathname === "/") {
		if (session) {
			// 認証済みの場合、ダッシュボードにリダイレクト
			return NextResponse.redirect(new URL("/dashboard", request.url));
		} else {
			// 未認証の場合、ホームページを表示（デフォルトの動作）
			return NextResponse.next();
		}
	}

	// 保護されたルートのリスト
	const protectedRoutes = ["/dashboard", "/profile", "/settings"];

	if (
		!session &&
		protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
	) {
		// 未認証で保護されたルートにアクセスした場合、サインインページにリダイレクト
		const signInUrl = new URL("/auth", request.url);
		signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
