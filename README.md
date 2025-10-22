# CodeDSA - Interactive DSA Learning Platform

Master Data Structures & Algorithms with interactive visualizers and AI tutoring.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file:

```env
OPENROUTER_API_KEY=your_api_key_here
```

Get your API key from [OpenRouter](https://openrouter.ai/keys)

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `OPENROUTER_API_KEY`
4. Deploy

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- OpenRouter AI (GPT-3.5-turbo)
- GSAP Animations

## Features

- 7 DSA Topics with Interactive Visualizers
- AI Tutor (36 questions/session)
- Embedded Visualizers
- Dark/Light Theme
- Mobile Responsive
