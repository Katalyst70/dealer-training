exports.intentPrompt = (comment) => `
You are an expert automotive sales manager.
Analyze the following social media comment.
Return strict JSON with intentLabel, intentScore, urgencyScore, confidenceScore.

Comment:
"${comment}"
`;
