import { ImageResponse } from '@vercel/og';
 
export const runtime = 'edge';
 
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
 
    // Dynamic params
    const title = searchParams.get('title') || 'AostaHub';
    const description = searchParams.get('description') || 'Professional Translation Platform';
    const theme = searchParams.get('theme') || 'light';
 
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
              alt="AostaHub Logo"
              width="120"
              height="120"
            />
          </div>
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: theme === 'dark' ? '#ffffff' : '#000000',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '30px',
              color: theme === 'dark' ? '#d1d1d1' : '#666666',
              textAlign: 'center',
              margin: '0 20px',
            }}
          >
            {description}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
