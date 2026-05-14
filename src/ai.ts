const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
  'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'it', 'its', 'this', 'that', 'these', 'those', 'am', 'being',
  'became', 'become', 'gets', 'got', 'getting', 'feel', 'felt', 'feeling',
  'think', 'thought', 'thinking', 'know', 'knew', 'known', 'believe',
  'want', 'seems', 'look', 'also', 'back', 'even', 'still', 'way', 'take',
  'came', 'get', 'go', 'went', 'make', 'made', 'say', 'said', 'tell', 'told',
  'see', 'saw', 'come', 'could', 'would', 'should', 'think', 'than', 'then',
  'now', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
  'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'if',
  'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'under', 'again', 'further', 'once', 'i', 'me', 'my', 'myself',
  'we', 'our', 'ours', 'you', 'your', 'yours', 'he', 'him', 'his', 'she',
  'her', 'hers', 'it', 'they', 'them', 'their', 'what', 'which', 'who',
  'whom', 'these', 'those', 'anyone', 'anything', 'someone', 'something',
  'everyone', 'everything', 'nobody', 'nothing', 'else', 'much', 'many',
])

const POSITIVE_WORDS = new Set([
  'happy', 'joy', 'love', 'great', 'wonderful', 'amazing', 'excellent', 'fantastic',
  'beautiful', 'perfect', 'best', 'awesome', 'brilliant', 'excited', 'grateful',
  'thankful', 'blessed', 'inspired', 'motivated', 'positive', 'hopeful', 'peaceful',
  'calm', 'serene', 'relaxed', 'content', 'satisfied', 'proud', 'confident',
  'successful', 'accomplished', 'fulfilled', 'delighted', 'cheerful', 'radiant',
  'vibrant', 'alive', 'energetic', 'passionate', 'creative', 'innovative',
  'brilliant', 'genius', 'smart', 'intelligent', 'wise', 'insightful',
])

const NEGATIVE_WORDS = new Set([
  'sad', 'unhappy', 'depressed', 'angry', 'hate', 'terrible', 'horrible',
  'awful', 'bad', 'worst', 'disappointing', 'frustrating', 'annoying', 'boring',
  'tired', 'exhausted', 'stressed', 'anxious', 'worried', 'scared', 'afraid',
  'lonely', 'isolated', 'rejected', 'hurt', 'pain', 'suffering', 'struggling',
  'failing', 'failed', 'lost', 'confused', 'overwhelmed', 'hopeless', 'helpless',
  'worthless', 'inadequate', 'guilty', 'ashamed', 'embarrassed', 'regretful',
])

const ENERGETIC_WORDS = new Set([
  'excited', 'energetic', 'dynamic', 'active', 'vibrant', 'alive', 'pumping',
  'charged', 'electric', 'intense', 'powerful', 'strong', 'bold', 'fierce',
  'passionate', 'fired', 'thrilled', 'electrified', 'buzzing', 'hyper',
])

const CALM_WORDS = new Set([
  'peaceful', 'calm', 'serene', 'tranquil', 'relaxed', 'restful', 'soothing',
  'gentle', 'quiet', 'still', 'balanced', 'harmonious', 'centered', 'grounded',
  'mindful', 'present', 'flowing', 'easy', 'light', 'soft', 'comfortable',
])

const REFLECTIVE_WORDS = new Set([
  'thinking', 'reflecting', 'pondering', 'contemplating', 'considering',
  'analyzing', 'examining', 'reviewing', 'assessing', 'evaluating', 'observing',
  'wondering', 'curious', 'questioning', 'exploring', 'discovering', 'learning',
  'growing', 'evolving', 'developing', 'understanding', 'realizing', 'insight',
])

const INSPIRED_WORDS = new Set([
  'inspired', 'motivated', 'driven', 'passionate', 'creative', 'innovative',
  'visionary', 'ambitious', 'aspiring', 'dreaming', 'possibilities', 'potential',
  'exciting', 'breakthrough', 'discovery', 'awakening', 'ignited', 'spark',
  'fuel', 'energy', 'purpose', 'meaning', 'calling', 'destiny',
])

const ANXIOUS_WORDS = new Set([
  'anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 'pressure',
  'tense', 'restless', 'uneasy', 'unsettled', 'rattled', 'edgy', 'jumpy',
  'concerned', 'troubled', 'distressed', 'uncomfortable', 'uneasy', 'apprehensive',
  'fearful', 'uncertain', 'doubtful', 'suspicious', 'wary', 'watchful',
])

export function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !STOP_WORDS.has(word))

  const wordFrequency: Record<string, number> = {}
  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1
  })

  const totalWords = words.length || 1

  const scoredWords = Object.entries(wordFrequency).map(([word, freq]) => ({
    word,
    score: freq / totalWords * Math.log(1 + freq),
  }))

  scoredWords.sort((a, b) => b.score - a.score)

  return scoredWords.slice(0, 8).map(s => s.word)
}

export function detectMood(text: string): string {
  const lowerText = text.toLowerCase()
  const words = lowerText.split(/\s+/)

  let positiveScore = 0
  let negativeScore = 0
  let energeticScore = 0
  let calmScore = 0
  let reflectiveScore = 0
  let inspiredScore = 0
  let anxiousScore = 0

  words.forEach(word => {
    if (POSITIVE_WORDS.has(word)) positiveScore++
    if (NEGATIVE_WORDS.has(word)) negativeScore++
    if (ENERGETIC_WORDS.has(word)) energeticScore++
    if (CALM_WORDS.has(word)) calmScore++
    if (REFLECTIVE_WORDS.has(word)) reflectiveScore++
    if (INSPIRED_WORDS.has(word)) inspiredScore++
    if (ANXIOUS_WORDS.has(word)) anxiousScore++
  })

  const scores = [
    { mood: 'positive', score: positiveScore },
    { mood: 'negative', score: negativeScore },
    { mood: 'energetic', score: energeticScore },
    { mood: 'calm', score: calmScore },
    { mood: 'reflective', score: reflectiveScore },
    { mood: 'inspired', score: inspiredScore },
    { mood: 'anxious', score: anxiousScore },
  ]

  scores.sort((a, b) => b.score - a.score)

  if (scores[0].score === 0) return 'neutral'

  return scores[0].mood
}

export function calculateSimilarity(keywords1: string[], keywords2: string[]): number {
  if (keywords1.length === 0 || keywords2.length === 0) return 0

  const set1 = new Set(keywords1.map(k => k.toLowerCase()))
  const set2 = new Set(keywords2.map(k => k.toLowerCase()))

  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])

  return intersection.size / union.size
}

export function findRecurringIdeas(nodes: { id: string; keywords: string[] }[]): string[][] {
  const keywordToNodes: Record<string, string[]> = {}

  nodes.forEach(node => {
    node.keywords.forEach(keyword => {
      if (!keywordToNodes[keyword]) {
        keywordToNodes[keyword] = []
      }
      keywordToNodes[keyword].push(node.id)
    })
  })

  const recurring: string[][] = []
  Object.entries(keywordToNodes).forEach(([, nodeIds]) => {
    if (nodeIds.length >= 2) {
      recurring.push(nodeIds)
    }
  })

  return recurring.sort((a, b) => b.length - a.length)
}

export function generateTopicClusters(nodes: { id: string; keywords: string[]; title: string }[]): { name: string; nodeIds: string[]; color: string }[] {
  if (nodes.length === 0) return []

  const allKeywords = nodes.flatMap(n => n.keywords)
  const keywordCounts: Record<string, number> = {}
  allKeywords.forEach(k => {
    keywordCounts[k] = (keywordCounts[k] || 0) + 1
  })

  const topKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word]) => word)

  const colors = ['#00f5ff', '#ff00aa', '#7b00ff', '#00ff88', '#ffaa00', '#ff4466']

  return topKeywords.map((keyword, index) => {
    const nodeIds = nodes
      .filter(n => n.keywords.includes(keyword))
      .map(n => n.id)

    return {
      name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
      nodeIds,
      color: colors[index % colors.length],
    }
  }).filter(c => c.nodeIds.length > 0)
}

export function suggestMemoryEcho(nodes: { id: string; createdAt: Date; title: string }[]): string[] {
  if (nodes.length < 3) return []

  const now = new Date()
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)

  const olderNodes = nodes
    .filter(n => new Date(n.createdAt) < oneMonthAgo && new Date(n.createdAt) > sixMonthsAgo)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return olderNodes.map(n => n.id)
}

export function extractTags(text: string): string[] {
  const tagMatches = text.match(/#[\w]+/g) || []
  return tagMatches.map(tag => tag.slice(1).toLowerCase())
}