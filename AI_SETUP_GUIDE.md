# AI Assistant Setup Guide

## 🤖 DSA-Focused AI Tutor Configuration

This guide will help you configure the AI assistant to work with Google Gemini API.

---

## 📋 Prerequisites

- Google Cloud account (free tier available)
- Gemini API key from Google AI Studio

---

## 🔑 Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key (keep it secure!)

---

## ⚙️ Step 2: Configure Environment Variables

### Option A: Using .env.local (Recommended)

1. Open the `.env.local` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyABC123YourActualKeyHere
```

3. Save the file

### Option B: Create .env.local from scratch

If `.env.local` doesn't exist:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your API key
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyABC123YourActualKeyHere
```

---

## 🚀 Step 3: Start the Development Server

```bash
# Install dependencies (if not already done)
npm install

# Start the dev server
npm run dev
```

The server will start at `http://localhost:3000`

---

## 🧪 Step 4: Test the AI Assistant

1. Open your browser to `http://localhost:3000`
2. Look for the **green chat bubble** in the bottom-right corner
3. Click it to open the DSA Tutor chat
4. Try asking a DSA question:
   - "What is a binary search tree?"
   - "Explain bubble sort algorithm"
   - "What's the time complexity of merge sort?"

---

## ✅ AI Assistant Features

### 🎯 DSA-Only Focus
- **Accepts**: Questions about data structures, algorithms, complexity analysis
- **Rejects**: Non-DSA topics (weather, cooking, sports, etc.)

### 📊 Question Limit
- **36 questions per session**
- Counter shows remaining questions
- Reset by refreshing the page

### 🧠 Supported DSA Topics
- Arrays, Strings, Linked Lists
- Stacks, Queues, Trees (BST, AVL, Heaps)
- Graphs (BFS, DFS, Dijkstra)
- Sorting & Searching Algorithms
- Dynamic Programming, Greedy, Backtracking
- Time & Space Complexity Analysis

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@ai-sdk/google'"

```bash
npm install @ai-sdk/google
```

### Error: "API key not valid"

1. Check your API key in `.env.local`
2. Ensure no extra spaces or quotes
3. Verify the key is active in Google AI Studio

### Chat not responding

1. Check browser console for errors (F12)
2. Verify the dev server is running
3. Ensure `.env.local` exists in project root
4. Restart the dev server after changing `.env.local`

### Error: "Invalid API key format"

API keys should start with `AIza` and be around 39 characters long.

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to Git (it's in `.gitignore`)
2. **Don't share your API key** publicly
3. **Rotate keys** if accidentally exposed
4. **Set usage limits** in Google Cloud Console

---

## 📈 Production Deployment

### Environment Variables on Vercel/Netlify

1. Go to your deployment platform's dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - Key: `GOOGLE_GENERATIVE_AI_API_KEY`
   - Value: Your Gemini API key
4. Redeploy your application

### For Other Platforms

Ensure your hosting platform supports Next.js environment variables and add the `GOOGLE_GENERATIVE_AI_API_KEY` variable.

---

## 🎨 Customization

### Change Question Limit

Edit `app/api/chat/route.ts`:

```typescript
const MAX_QUESTIONS = 36 // Change to your desired number
```

### Add More DSA Topics

Edit the `DSA_TOPICS` array in `app/api/chat/route.ts`:

```typescript
const DSA_TOPICS = [
  "array", "string", // ... add more topics
]
```

### Modify System Prompt

Edit the `system` prompt in `app/api/chat/route.ts` to adjust the AI's behavior.

---

## 📚 API Documentation

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## 💡 Tips

1. **Test locally first** before deploying
2. **Monitor API usage** in Google Cloud Console
3. **Use free tier wisely** - Gemini has generous limits
4. **Cache common responses** for better performance (future enhancement)

---

## 🎉 You're All Set!

Your DSA-focused AI tutor is now ready to help users learn Data Structures & Algorithms!

For questions or issues, check the troubleshooting section above.

Happy coding! 🚀
