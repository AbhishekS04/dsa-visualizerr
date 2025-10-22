# 🔑 QUICK START: Add Your Gemini API Key

## Step 1: Get API Key
Visit: https://makersuite.google.com/app/apikey
Click "Create API Key" and copy it.

## Step 2: Add to .env.local
Open `.env.local` file and replace this line:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

With your actual key:

```
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyABC123YourActualKeyHere
```

## Step 3: Restart Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test
1. Open http://localhost:3000
2. Click the green chat bubble (bottom-right)
3. Ask: "What is a binary search tree?"

✅ Done! The AI assistant is now working!

---

## 🚨 Troubleshooting

**Chat not working?**
- Check if `.env.local` exists in project root
- Verify API key has no extra spaces
- Restart the dev server
- Check browser console (F12) for errors

**Still issues?**
See full guide: `AI_SETUP_GUIDE.md`
