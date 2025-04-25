// app/api/youtube/route.ts
import { NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_API_KEY!;
const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID!;
const MAX_RESULTS = 20;

export async function GET() {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data.items || []);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur lors de l’appel YouTube' }, { status: 500 });
  }
}
