import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { NextRequest } from "next/server"

const handler = toNextJsHandler(auth)

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin") || request.nextUrl.origin
  if (process.env.NODE_ENV !== "production") {
    process.env.BETTER_AUTH_URL = origin
  }
  return handler.GET(request)
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") || request.nextUrl.origin
  if (process.env.NODE_ENV !== "production") {
    process.env.BETTER_AUTH_URL = origin
  }
  return handler.POST(request)
}
