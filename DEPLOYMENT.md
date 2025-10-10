# Standalone Frontend Deployment Guide

## Overview

This portfolio website now works as a **standalone frontend** without requiring a backend server. It uses static services that read data directly from `data/mock-data.ts`.

## Architecture

### Service Configuration

- **Development**: Uses static services with mock data
- **Production**: Uses static services with mock data (no backend required)
- **Environment Variable**: `NEXT_PUBLIC_USE_STATIC_SERVICES=true` forces static services

### File Structure

```
lib/services/
├── api-client.ts          # API client (for future backend integration)
├── api-services.ts        # API services (for future backend integration)
├── mock-services.ts       # Mock services with simulated delays
├── static-services.ts     # ✅ Static services for production (NEW)
├── service-config.ts      # ✅ Environment-based service selection (NEW)
└── index.ts              # Service exports
```

## How It Works

### 1. Static Services (`static-services.ts`)

- Imports data directly from `data/mock-data.ts`
- Simulates API response format with delays
- Returns the same data structure as real API would
- No network requests - all data is bundled with the app

### 2. Service Configuration (`service-config.ts`)

- Automatically selects static services in production
- Can be overridden with environment variable
- Provides the same interface as API services

### 3. Data Hooks (`hooks/use-portfolio-data.ts`)

- Use the configured services transparently
- No changes needed in components
- Same loading states and error handling

## Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Deploy to Vercel
npm run build
vercel --prod

# Or connect your GitHub repo to Vercel dashboard
```

### Option 2: Netlify

```bash
# Build the app
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

### Option 3: Static Hosting (GitHub Pages, etc.)

```bash
# Build for static export
npm run build
npm run export  # If you add export script

# Upload the out/ folder to any static hosting
```

### Option 4: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

### Development (.env.local)

```env
# Optional: Force static services in development
NEXT_PUBLIC_USE_STATIC_SERVICES=false
```

### Production (.env.production)

```env
# Production always uses static services
NEXT_PUBLIC_USE_STATIC_SERVICES=true
```

## Data Management

### Updating Content

All content is stored in `data/mock-data.ts`. To update:

1. **Experience**: Edit `mockExperiences` array
2. **Education**: Edit `mockEducation` array
3. **Projects**: Edit `mockProjects` array
4. **User Info**: Edit `mockUser` object
5. **Memories**: Edit `mockMemories` array

### Adding New Content

```typescript
// Add new experience
export const mockExperiences: Experience[] = [
  {
    id: "new-job",
    title: "Senior Developer",
    company: "Tech Company",
    // ... other fields
  },
  // ... existing experiences
];
```

## Performance Benefits

### Static Services Advantages

- ✅ **No API calls**: All data bundled with app
- ✅ **Fast loading**: No network latency
- ✅ **Reliable**: No backend dependencies
- ✅ **Cost effective**: Free static hosting
- ✅ **Simple deployment**: Just upload built files

### Bundle Size Impact

- All data is included in JavaScript bundle
- Minimal impact due to compression
- Consider code splitting for very large datasets

## Migration Path

### Future Backend Integration

When you want to add a real backend:

1. Keep the existing service structure
2. Update `service-config.ts` to use API services in production
3. Set `NEXT_PUBLIC_USE_STATIC_SERVICES=false`
4. The same components and hooks will work unchanged

### Example Migration

```typescript
// service-config.ts
const USE_STATIC_SERVICES =
  process.env.NODE_ENV === "development" || // Dev uses static
  process.env.NEXT_PUBLIC_USE_STATIC_SERVICES === "true"; // Override

// For production with real API:
// NEXT_PUBLIC_USE_STATIC_SERVICES=false
// NEXT_PUBLIC_API_URL=https://your-api.com
```

## Troubleshooting

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Service Selection Issues

```bash
# Check which services are being used
console.log('Using static services:', process.env.NEXT_PUBLIC_USE_STATIC_SERVICES)
```

### Data Loading Issues

- Check `data/mock-data.ts` for syntax errors
- Verify TypeScript interfaces match data structure
- Check browser console for errors

## Production Checklist

- [ ] All content updated in `data/mock-data.ts`
- [ ] Certificate links tested and working
- [ ] Build completes without errors
- [ ] All sections display correctly
- [ ] Loading states work properly
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Mobile responsive
- [ ] SEO meta tags configured

## Success! 🎉

Your portfolio is now a fully standalone frontend that can be deployed anywhere without needing a backend server. All your content is bundled with the application and loads instantly.
