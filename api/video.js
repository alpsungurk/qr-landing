const BLOB_VIDEO_URL = process.env.BLOB_VIDEO_URL || 'https://okh0cfodr9tauxyp.public.blob.vercel-storage.com/video.mp4';

export default async function handler(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405 });
  }

  const range = request.headers.get('range') || '';
  const opts = range ? { headers: { Range: range } } : {};

  try {
    const response = await fetch(BLOB_VIDEO_URL, opts);

    const headers = new Headers({
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000',
    });
    const contentRange = response.headers.get('Content-Range');
    if (contentRange) headers.set('Content-Range', contentRange);
    const contentLength = response.headers.get('Content-Length');
    if (contentLength) headers.set('Content-Length', contentLength);

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 502 });
  }
}
