# ✅ AI Assistant Setup Checklist

Complete these steps to activate your DSA-focused AI tutor:

---

## 🎯 Required Steps

### [ ] 1. Get Gemini API Key
- Go to: https://makersuite.google.com/app/apikey
- Sign in with Google account
- Click "Create API Key"
- Copy the key (starts with `AIza...`)

### [ ] 2. Add API Key to .env.local
Open file: `.env.local`

Replace this line:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

With your actual key:
```
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyABC123YourActualKeyHere
```

### [ ] 3. Install Dependencies (if needed)
```bash
npm install
```

### [ ] 4. Start Development Server
```bash
npm run dev
```

### [ ] 5. Test the AI Assistant
1. Open: http://localhost:3000
2. Look for green chat bubble (bottom-right corner)
3. Click to open chat
4. Ask: "What is bubble sort?"
5. Verify you get a DSA-focused response

---

## ✨ Features to Test

### [ ] DSA Questions (Should Work)
- "Explain binary search tree"
- "What's the time complexity of merge sort?"
- "How does BFS work?"
- "Difference between stack and queue"

### [ ] Non-DSA Questions (Should Be Rejected)
- "What's the weather?"
- "How to cook pasta?"
- "Latest news?"

### [ ] Question Limit
- Check counter shows "(36 left)"
- Ask questions and watch counter decrease
- Verify limit message appears after 36 questions

---

## 🔍 Verification Checklist

### [ ] Chat widget visible on homepage
### [ ] Counter shows "36 left" initially
### [ ] DSA questions get proper responses
### [ ] Non-DSA questions are politely rejected
### [ ] Counter updates after each question
### [ ] Input disabled when limit reached
### [ ] No console errors in browser (F12)

---

## 📁 Files You Modified

Verify these files exist:
- [ ] `.env.local` (with your API key)
- [ ] `app/api/chat/route.ts` (AI backend)
- [ ] `components/chat/chat-widget.tsx` (UI)
- [ ] `app/page.tsx` (includes ChatWidget)

---

## 🐛 If Something's Wrong

### API Key Issues
- [ ] No spaces before/after the key
- [ ] Key starts with `AIza`
- [ ] File is named `.env.local` (not `.env`)
- [ ] File is in project root directory

### Chat Not Appearing
- [ ] Dev server is running
- [ ] No errors in terminal
- [ ] Page loaded at http://localhost:3000
- [ ] Check bottom-right corner

### Chat Not Responding
- [ ] Check browser console (F12)
- [ ] Verify API key is set
- [ ] Restart dev server
- [ ] Check internet connection

---

## 🎉 Success Indicators

You'll know it's working when:
✅ Green chat bubble appears bottom-right
✅ Counter shows remaining questions
✅ DSA questions get detailed responses
✅ Non-DSA questions are rejected
✅ No errors in console
✅ Response appears within 2-5 seconds

---

## 📚 Need Help?

- Full Guide: `AI_SETUP_GUIDE.md`
- Quick Start: `GEMINI_API_SETUP.md`
- Implementation Details: `AI_IMPLEMENTATION_SUMMARY.md`

---

**Ready?** Start with Step 1! 🚀
