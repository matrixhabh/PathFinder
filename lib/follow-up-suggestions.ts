export type FollowUpContext = { goal?: string; currentPage?: string; currentPhase?: string; skills?: unknown; gaps?: unknown; progress?: unknown; weeklyHours?: unknown }

function hasAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term))
}

export function generateFollowUpSuggestions(message: string, response: string, context: FollowUpContext) {
  const input = `${message} ${response} ${context.currentPage ?? ''} ${context.currentPhase ?? ''}`.toLowerCase()
  if (hasAny(input, ['react', 'component', 'jsx'])) return ['Give me a React learning path', 'What should I learn after React?', 'Give me a React project']
  if (hasAny(input, ['sql', 'database', 'query', 'join'])) return ['What SQL topics should I learn first?', 'Give me a 30-minute SQL plan', 'How does SQL help with AI?']
  if (hasAny(input, ['javascript', ' js ', 'typescript', 'struggling', 'stuck'])) return ['Give me a JS practice plan', 'What concept should I fix first?', 'Give me a small JS project']
  if (hasAny(input, ['skip', 'prerequisite', 'module'])) return ['What will I miss if I skip it?', 'Is there a faster way to learn it?', 'Test my prerequisites']
  if (hasAny(input, ['project', 'portfolio', 'build'])) return ['Suggest a portfolio project', 'Break this project into steps', 'How should I show this in my portfolio?']
  if (hasAny(input, ['focus', 'next', 'roadmap', 'path'])) return ['What should I practice this week?', 'Explain my biggest skill gap', 'Turn this into a 30-minute plan']
  return [`Apply this to ${context.goal ?? 'my goal'}`, 'Give me a concrete next step', 'What should I explore next?']
}

export const defaultFollowUps = ['What should I focus on next?', 'Explain my biggest skill gap', 'Give me a 30-minute plan']
