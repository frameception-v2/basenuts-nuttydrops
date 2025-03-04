// Encode state as base64url JSON
const encodeState = (page: number) => 
  Buffer.from(JSON.stringify({ page })).toString('base64url');

// Decode state with error fallback
const decodeState = (state: string) => {
  try {
    return JSON.parse(Buffer.from(state, 'base64url').toString());
  } catch {
    return { page: 1 };
  }
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const currentState = decodeState(searchParams.get('state') || '');
  const nextPage = Math.min(currentState.page + 1, 3); // Limit to 3 pages
  const nextState = encodeState(nextPage);

  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.HOST}/api/image/${currentState.page}" />
        <meta property="fc:frame:button:1" content="Next" />
        <meta property="fc:frame:post_url" content="${process.env.HOST}/api/frame?state=${nextState}" />
      </head>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}
