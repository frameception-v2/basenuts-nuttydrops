- [ ] Task 1: Create core frame endpoint handler  
  File: app/api/frame/route.ts  
  Action: Create file  
  Description:  
  ```typescript
  export async function POST(req: Request) {
    // Basic page 1 response
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.HOST}/api/image/1" />
          <meta property="fc:frame:button:1" content="Next" />
          <meta property="fc:frame:post_url" content="${process.env.HOST}/api/frame" />
        </head>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }
  ```
  Completion: POST endpoint returns Season 1 screen with Next button

- [ ] Task 2: Add state management logic  
  File: app/api/frame/route.ts  
  Action: Add state encoding/decoding  
  Description:  
  ```typescript
  // Add helper functions
  const encodeState = (page: number) => 
    Buffer.from(JSON.stringify({ page })).toString('base64url');
  
  const decodeState = (state: string) => {
    try {
      return JSON.parse(Buffer.from(state, 'base64url').toString());
    } catch {
      return { page: 1 };
    }
  }

  // Modify POST handler
  const { searchParams } = new URL(req.url);
  const currentState = decodeState(searchParams.get('state') || '');
  const nextPage = Math.min(currentState.page + 1, 3);
  const nextState = encodeState(nextPage);
  ```
  Completion: Buttons cycle through 3 pages with state in URLs

- [ ] Task 3: Create OG image templates  
  Files:  
  - app/components/og/page1.tsx  
  - app/components/og/page2.tsx  
  - app/components/og/page3.tsx  
  Action: Create files  
  Description (example for page1.tsx):
  ```tsx
  export default function Page1() {
    return (
      <div style={{ background: 'black' }}>
        <h1>Season 1 Announcement</h1>
        <p>Claim your exclusive access</p>
      </div>
    )
  }
  ```
  Completion: All 3 templates render static images via /api/image/[1-3]

- [ ] Task 4: Integrate Neynar validation  
  File: app/api/frame/route.ts  
  Action: Add validation check  
  Description:
  ```typescript
  // Add to POST handler start
  const validationResponse = await fetch('https://api.neynar.com/v2/farcaster/frame/validate', {
    headers: {
      'api_key': process.env.NEYNAR_API_KEY!,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ message_bytes: await req.text() })
  });

  if (!validationResponse.ok) {
    return new Response('Invalid request', { status: 400 });
  }
  ```
  Completion: Invalid requests return error status before processing

- [ ] Task 5: Add state validation guard  
  File: app/api/frame/route.ts  
  Action: Modify decodeState  
  Description:
  ```typescript
  const decodeState = (state: string) => {
    try {
      const decoded = JSON.parse(Buffer.from(state, 'base64url').toString());
      return { page: Math.max(1, Math.min(3, decoded.page)) };
    } catch {
      return { page: 1 };
    }
  }
  ```
  Completion: Invalid state parameters always reset to page 1

- [ ] Task 6: Implement error fallback UI  
  File: app/components/og/error.tsx  
  Action: Create file  
  Description:
  ```tsx
  export default function ErrorFallback() {
    return (
      <div style={{ background: 'red' }}>
        <h1>Something went wrong</h1>
        <p>Please try refreshing</p>
      </div>
    )
  }
  ```
  Completion: Errors in image generation show red error screen

- [ ] Task 7: Add external CTA button  
  File: app/components/og/page3.tsx  
  Action: Modify template  
  Description:
  ```tsx
  // Add to page3.tsx metadata
  export const config = {
    buttonConfig: {
      button4: {
        redirectUrl: 'https://projectwebsite.com/claim'
      }
    }
  }
  ```
  Completion: Page 3 shows "Claim Now" button with external link