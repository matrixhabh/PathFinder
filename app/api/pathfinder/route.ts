import { createPathfinderStream, type PathfinderContext } from '@/lib/ai/provider'

export async function POST(request: Request) {
  console.log('[v0] PathFinder request received')
  let body: { message?: unknown; context?: PathfinderContext } = {}
  try { body = await request.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) return Response.json({ error: 'Message is required.' }, { status: 400 })
  const apiKeyConfigured = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
  console.log('[v0] GOOGLE_GENERATIVE_AI_API_KEY configured:', apiKeyConfigured)
  console.log('[v0] PathFinder selected Gemini model: gemini-3.1-flash-lite')
  if (!apiKeyConfigured) return Response.json({ error: 'Gemini API is not configured. Add GOOGLE_GENERATIVE_AI_API_KEY to the server environment.' }, { status: 503 })
  try {
    console.log('[v0] PathFinder Gemini request started')
    const result = await createPathfinderStream(message, body.context ?? {}, request.signal)
    console.log('[v0] PathFinder stream response created')
    return result.toTextStreamResponse({ headers: { 'x-pathfinder-protocol': 'ai-sdk-text-stream' } })
  } catch (error) {
    console.error('[v0] PathFinder Gemini provider error', error instanceof Error ? error.message : 'Unknown Gemini provider error')
    return Response.json({ error: 'The AI provider could not complete this request. Please try again.' }, { status: 502 })
  }
}
