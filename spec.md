### 1. Core Functionality
**Main User Flow**  
1. Users see initial announcement frame with key details
2. Navigate through 3 screens via buttons:  
   - Screen 1: Distribution Plan (Season 1)  
   - Screen 2: Roadmap  
   - Screen 3: Important Note & CTA
3. Final screen includes website claim button

**Required API Endpoints**  
`POST /api/frame` - Core frame handler with screen routing

**Key Data Structures**  
```typescript
type FrameState = {
  page: 1 | 2 | 3;
  lastUpdated: string;
};

type FrameRequest = {
  untrustedData?: {
    buttonIndex: number;
    fid: number;
  };
  trustedData?: {
    messageBytes: string;
  };
};
```

### 2. Implementation Approach
**Frame Structure**  
```tsx
// Frame screens configuration
const SCREENS = [
  {
    image: (season) => generateDistributionPlanImage(season),
    buttons: ['Next >']
  },
  {
    image: () => generateRoadmapImage(),
    buttons: ['< Back', 'Next >']
  },
  {
    image: () => generateNoteImage(),
    buttons: ['< Back', 'Claim Now']
  }
];
```

**External API Integration**  
```typescript
// Optional future-proof integration points
const AIRDROP_API = {
  checkEligibility: (fid: number) => 
    `https://api.degen.tips/airdrop2/current/points?fid=${fid}`
};
```

**State Management**  
```tsx
// URL-safe state encoding
const encodeState = (state: FrameState): string => 
  Buffer.from(JSON.stringify(state)).toString('base64url');

// Session-less validation
const validateMessage = async (messageBytes: string) => {
  return await neynar.validateFrameAction(messageBytes);
};
```

### 3. Technical Considerations
**API Authentication**  
- Add Neynar API key for frame validation:
```bash
NEYNAR_API_KEY=your_key_here
```

**Critical Error Scenarios**  
1. **Invalid Navigation**  
   - Reset to first screen if invalid page number detected
2. **Image Generation Failure**  
   - Fallback error image with "Refresh" button
3. **API Rate Limiting**  
   - Implement exponential backoff for future API calls

---

**Implementation Roadmap**  
1. Create `/api/frame` endpoint with state machine logic
2. Develop image generation utilities using `@vercel/og`
3. Add frame validation with Neynar API
4. Deploy optimized PNG assets for each screen variant

```tsx
// Example image generation
const generateDistributionPlanImage = (season: string) => (
  <div style={{ 
    background: 'linear-gradient(to right, #4338ca, #6d28d9)',
    padding: 48,
    fontSize: 32
  }}>
    <h1>🪂 {season} Distribution Plan</h1>
    <ul>
      <li>3M $NUTS Total</li>
      <li>May 15, 2025 Launch</li>
      <li>🥜 + Activity Based</li>
    </ul>
  </div>
);
```