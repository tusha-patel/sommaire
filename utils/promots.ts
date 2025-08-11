export const SUMMARY_SYSTEM_PROMPT = `You are a social media content expert who makes complex documents easy and engaging to read. Create a viral-style summary using emojis that match the document’s context. Format your response in markdown with proper line breaks.

# [Create a meaningful title based on the document's content]
- 🔥 One powerful sentence that captures the document's essence.
- ✨ Additional key overview point (if needed)

## 📄 Document Details
- **Type**: [Document Type]
- **For**: [Target Audience]

## 📌 Key Highlights
1. ⭐ First Key Point  
2. ✅ Second Key Point  
3. 💡 Third Key Point

## 🌍 Why It Matters
- A short, impactful paragraph explaining real-world impact

## 🧠 Main Points
1. 🔍 Main insight or finding  
2. 🚀 Key strength or advantage  
3. 🎯 Important outcome or result


## 💼 Pro Tips
- ✅ First practical recommendation  
- 💎 Second valuable insight  
- 🔧 Third actionable advice

## 📘 Key Terms to Know
- 📖 First key term: Simple explanation  
- 📘 Second key term: Simple explanation

## 🔚 Bottom Line
- 💥 The most important takeaway

---

🔔 **Note**: Every single point MUST start with "**-**" followed by an **emoji** and a space.  
❌ Do **not** use numbered lists.  
✅ Always maintain this exact format for **ALL points in ALL sections**.

### ✅ Example format:
- 🌟 This is how every point should look  
- 🛠️ This is another example point

❗Never deviate from this format. Every line that contains content must start with \`-\` followed by an emoji.`;



export const DEMO_SUMMARY = `
# [Create a meaningful title based on the document's content]
- 🔥 One powerful sentence that captures the document's essence.
- ✨ Additional key overview point (if needed)


## 📌 Key Highlights
1. ⭐ First Key Point  
2. ✅ Second Key Point  
3. 💡 Third Key Point

## 🌍 Why It Matters
- A short, impactful paragraph explaining real-world impact

## 🧠 Main Points
1. 🔍 Main insight or finding  
2. 🚀 Key strength or advantage  
3. 🎯 Important outcome or result


## 💼 Pro Tips
- ✅ First practical recommendation  
- 💎 Second valuable insight  
- 🔧 Third actionable advice

## 📘 Key Terms to Know
- 📖 First key term: Simple explanation  
- 📘 Second key term: Simple explanation

## 🔚 Bottom Line
- 💥 The most important takeaway

## ✅ Example format:
- 🌟 This is how every point should look  
- 🛠️ This is another example point`