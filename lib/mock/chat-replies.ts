interface ReplyPattern {
  /** Lowercased keywords; reply triggers if ANY keyword matches. */
  keywords: string[];
  /** One reply chosen at random. Keep these gentle, scripture-aware, never preachy. */
  replies: string[];
}

export const CHAT_PATTERNS: ReplyPattern[] = [
  {
    keywords: ["anxious", "anxiety", "worried", "nervous", "overwhelmed"],
    replies: [
      "I hear you. Anxiety can feel like a fog that won't lift. Philippians 4:6–7 reminds us we don't have to carry it alone — would it help to walk through one specific worry together?",
      "That weight is real. Sometimes it helps to name the thing first. What's the worry that's loudest right now?",
    ],
  },
  {
    keywords: ["sad", "depressed", "down", "hopeless", "blue", "low"],
    replies: [
      "I'm sorry it's been heavy. Psalm 34:18 says the Lord is close to the brokenhearted. Have you been able to talk with anyone about how you've been feeling?",
      "Thank you for telling me. The sad seasons can feel long. Would it help to take a Snapshot, or schedule time with your pastor?",
    ],
  },
  {
    keywords: ["angry", "furious", "rage", "resentful", "bitter"],
    replies: [
      "Anger usually has another feeling underneath it — hurt, fear, or grief. Would you be willing to share what triggered it?",
      "Ephesians 4:26 tells us to be angry, but not to sin in our anger. What's the situation that's stirring this?",
    ],
  },
  {
    keywords: ["lonely", "alone", "isolated", "no friends"],
    replies: [
      "Loneliness can be one of the hardest things to carry. Hebrews 10:25 nudges us toward community. Is there one person — even one — you could text today?",
      "I'm sorry. Even Jesus had close friends he leaned on. Could joining a live prayer call this week help break the quiet?",
    ],
  },
  {
    keywords: [
      "lost faith",
      "doubt",
      "doubting",
      "where is god",
      "is god there",
    ],
    replies: [
      "Doubt isn't the opposite of faith — it's often part of it. Many of the Psalms are written from exactly this place. Would you want to read one together?",
      "That's a weighty thing to share. You're not alone in it. Would you like a prompt for journaling, or to talk to a pastor this week?",
    ],
  },
  {
    keywords: ["scripture", "verse", "bible", "psalm", "encourage"],
    replies: [
      "Here's one that's carried many: 'The Lord is my shepherd; I shall not want.' (Psalm 23:1). Would you like a few more on a specific theme?",
      "I'd love to. What would help most right now — peace, courage, hope, or something else?",
    ],
  },
  {
    keywords: ["thank", "thanks", "appreciate"],
    replies: [
      "Of course. I'm glad you reached out. I'm here whenever you need a place to talk.",
      "You're welcome. Take care of yourself this week — and don't hesitate to come back.",
    ],
  },
  {
    keywords: ["hi", "hello", "hey", "good morning", "good evening"],
    replies: [
      "Peace be with you. How is your heart today?",
      "Hello. I'm glad you're here. What's on your mind?",
    ],
  },
];

const FALLBACK_REPLIES = [
  "I hear you. Tell me more about what's going on.",
  "Thank you for sharing that. What feels most pressing right now?",
  "I'm listening. Would you like to keep talking, or would it help to take a Snapshot or book time with a pastor?",
];

export function pickReply(message: string): string {
  const haystack = message.toLowerCase();
  for (const pattern of CHAT_PATTERNS) {
    if (pattern.keywords.some((k) => haystack.includes(k))) {
      return pattern.replies[
        Math.floor(Math.random() * pattern.replies.length)
      ];
    }
  }
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

export const ESCALATION_REPLY =
  "I'm worried about your safety, and I don't want you to go through this alone. Please reach out to the 988 Suicide & Crisis Lifeline — call or text 988. They are free, confidential, and available 24/7. If you're in immediate danger, please call 911. I'm here, and your church's pastoral care team can be with you within minutes if you'd like.";
