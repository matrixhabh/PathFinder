export type SkillStatus = 'strong' | 'building' | 'gap'

export type Skill = {
  name: string
  category: string
  score: number
  target: number
  status: SkillStatus
  color: 'indigo' | 'teal' | 'amber' | 'rose'
}

export type RoadmapPhase = {
  id: string
  title: string
  subtitle: string
  duration: string
  progress: number
  status: 'current' | 'next' | 'upcoming'
  skills: string[]
  resources: { title: string; type: string; duration: string }[]
}

export const learner = {
  name: 'Alex Morgan',
  role: 'Product Designer',
  goal: 'Transition into AI Product Design',
  avatar: 'AM',
  streak: 12,
  weeklyGoal: 68,
  completedLessons: 24,
  totalLessons: 42,
  nextAction: 'Complete the AI prototyping sprint',
}

export const skills: Skill[] = [
  { name: 'Product Strategy', category: 'Foundation', score: 82, target: 85, status: 'strong', color: 'indigo' },
  { name: 'UX Research', category: 'Foundation', score: 91, target: 85, status: 'strong', color: 'teal' },
  { name: 'AI Product Thinking', category: 'AI fluency', score: 58, target: 82, status: 'building', color: 'amber' },
  { name: 'Prompt Engineering', category: 'AI fluency', score: 41, target: 76, status: 'gap', color: 'rose' },
  { name: 'Rapid Prototyping', category: 'Execution', score: 65, target: 80, status: 'building', color: 'indigo' },
  { name: 'Data Storytelling', category: 'Execution', score: 47, target: 74, status: 'gap', color: 'rose' },
]

export const roadmap: RoadmapPhase[] = [
  {
    id: '01', title: 'AI Product Foundations', subtitle: 'Build your mental models', duration: '2 weeks', progress: 100, status: 'current',
    skills: ['AI product patterns', 'Model capabilities', 'Responsible AI'],
    resources: [{ title: 'The AI Product Playbook', type: 'Guide', duration: '18 min' }, { title: 'Map an AI opportunity', type: 'Project', duration: '45 min' }],
  },
  {
    id: '02', title: 'Prototyping with AI', subtitle: 'Turn ideas into experiences', duration: '3 weeks', progress: 42, status: 'current',
    skills: ['Prompt engineering', 'AI UX patterns', 'Rapid prototyping'],
    resources: [{ title: 'Prompt patterns for designers', type: 'Lesson', duration: '12 min' }, { title: 'Build your first AI flow', type: 'Project', duration: '60 min' }],
  },
  {
    id: '03', title: 'Measure & Ship', subtitle: 'Create impact with confidence', duration: '2 weeks', progress: 0, status: 'next',
    skills: ['AI metrics', 'Experiment design', 'Data storytelling'],
    resources: [{ title: 'Choosing AI product metrics', type: 'Guide', duration: '20 min' }, { title: 'Ship a case study', type: 'Project', duration: '90 min' }],
  },
]

export const todayFocus = [
  { title: 'Prompt patterns for designers', kind: 'Lesson', time: '12 min', complete: true },
  { title: 'Build your first AI flow', kind: 'Hands-on project', time: '60 min', complete: false },
  { title: 'Reflect: where did the model surprise you?', kind: 'Reflection', time: '5 min', complete: false },
]

export const recommendations = [
  { title: 'Build your first AI flow', reason: 'Closes your highest-impact gap', match: 94, tag: 'Best next step', tone: 'indigo' },
  { title: 'Prompt patterns for designers', reason: 'Strengthens your AI fluency', match: 88, tag: '15 min lesson', tone: 'teal' },
  { title: 'Choosing AI product metrics', reason: 'Prepares your next roadmap phase', match: 76, tag: 'Coming next', tone: 'amber' },
]

export const demoReplies = [
  'Based on your recent work, I would focus on prompt engineering next. It is the smallest gap between your current profile and the AI Product Designer role.',
  'You are 42% through Prototyping with AI. Your fastest win is the AI flow project: it reinforces prompting and rapid prototyping in one focused session.',
  'Your roadmap adapts when you show mastery. Finish the flow project and the next assessment will swap in a harder evaluation of AI UX patterns.',
]

export function getAdaptiveResult(answer: string) {
  const confident = answer.toLowerCase().includes('a') || answer.toLowerCase().includes('prototype')
  return confident
    ? { label: 'Confidence increased', value: '+8', detail: 'AI UX patterns moved from building to on track.', next: 'Unlock: critique an AI onboarding flow' }
    : { label: 'New practice signal', value: '+1 focus', detail: 'We found a useful prompt engineering edge case.', next: 'Added: prompt patterns refresher' }
}

export type PathResponse = { nextAction: string; rationale: string; confidence: number; fallback?: boolean }
export function demoPathResponse(): PathResponse {
  return { nextAction: learner.nextAction, rationale: 'It connects your two largest gaps while building on your strong research foundation.', confidence: 94 }
}

