import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

export type PathfinderContext = {
  goal?: string
  currentPage?: string
  currentPhase?: string
  skills?: string[]
  gaps?: string[]
  progress?: number
  weeklyHours?: number
}

const PATHFINDER_MODEL = 'gemini-3.1-flash-lite'

function describeStreamError(error: unknown) {
  if (error instanceof Error) return `${error.name}: ${error.message}`.slice(0, 500)
  return String(error).slice(0, 500)
}

export function createPathfinderStream(message: string, context: PathfinderContext, abortSignal?: AbortSignal) {
  const system = `You are PathFinder AI, an adaptive learning coach. Give concise, specific, encouraging guidance. Use the learner context when present. Never claim to have changed data unless the app confirms it.\nLearner context: ${JSON.stringify(context)}`
  console.log('[v0] PathFinder Gemini model initialized', { model: PATHFINDER_MODEL, apiKeyConfigured: Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY) })
  let sawTextDelta = false
  return streamText({
model: google(PATHFINDER_MODEL),
    system,
    prompt: message,
    maxOutputTokens: 320,
    abortSignal,
    onChunk({ chunk }) {
      if (chunk.type === 'text-delta' && !sawTextDelta) {
        sawTextDelta = true
        console.log('[v0] PathFinder first text delta received')
      }
    },
    onError({ error }) {
      console.error('[v0] PathFinder AI stream error', describeStreamError(error))
    },
    onFinish({ finishReason, totalUsage }) {
      console.log('[v0] PathFinder stream finished', { finishReason, hasText: sawTextDelta, totalUsage })
    },
  })
}

export function fallbackAnswer(message: string, context: PathfinderContext) {
  const page = context.currentPage ? ` while you are viewing ${context.currentPage}` : ''
  return `I can help you make the next decision${page}. Based on your goal${context.goal ? ` of ${context.goal}` : ''}, choose one small action that closes a current gap, then reflect on the result. Your next step is to open the active lesson and spend 25 focused minutes on it.`
}
