import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Validate request with Neynar API
  const validationResponse = await fetch('https://api.neynar.com/v2/farcaster/frame/validate', {
    method: 'POST',
    headers: {
      'api_key': process.env.NEYNAR_API_KEY!,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ message_bytes: await req.text() })
  });

  if (!validationResponse.ok) {
    return new NextResponse('Invalid request', { status: 400 });
  }

  // Basic page 1 response with Next button
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.HOST}/api/image/1" />
        <meta property="fc:frame:button:1" content="Next" />
        <meta property="fc:frame:post_url" content="${process.env.HOST}/api/frame" />
      </head>
    </html>
  `;

  return new NextResponse(htmlContent, {
    headers: { "Content-Type": "text/html" },
  });
}
