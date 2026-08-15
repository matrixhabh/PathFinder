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

export function createPathfinderStream(message: string, context: PathfinderContext) {
  const system = `You are PathFinder AI, an adaptive learning coach. Give concise, specific, encouraging guidance. Use the learner context when present. Never claim to have changed data unless the app confirms it.\nLearner context: ${JSON.stringify(context)}`
  return streamText({
    model: 'openai/gpt-4o-mini',
    system,
    prompt: message,
    maxOutputTokens: 320,
  })
}

export function fallbackAnswer(message: string, context: PathfinderContext) {
  const page = context.currentPage ? ` while you are viewing ${context.currentPage}` : ''
  return `I can help you make the next decision${page}. Based on your goal${context.goal ? ` of ${context.goal}` : ''}, choose one small action that closes a current gap, then reflect on the result. Your next step is to open the active lesson and spend 25 focused minutes on it.`
}
