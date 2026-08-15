import { createPathfinderStream, fallbackAnswer, type PathfinderContext } from '@/lib/ai/provider'

export async function POST(request: Request) {
  let body: { message?: unknown; context?: PathfinderContext } = {}
  try { body = await request.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) return Response.json({ error: 'Message is required.' }, { status: 400 })
  const context = body.context ?? {}
  if (process.env.AI_GATEWAY_API_KEY) {
    try { return (await createPathfinderStream(message, context)).toTextStreamResponse() } catch { /* local fallback below */ }
  }
  return new Response(fallbackAnswer(message, context), { headers: { 'content-type': 'text/plain; charset=utf-8', 'x-pathfinder-mode': 'local-fallback' } })
}
