import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
