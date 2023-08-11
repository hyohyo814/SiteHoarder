import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';
 
export const config = {
  runtime: 'edge',
};
 
export default function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const hasTitle = searchParams.has('title');
  const hasDescription = searchParams.has('desc');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'Website';
  const description = hasDescription
    ? searchParams.get('desc')?.slice(0, 100)
    : 'Description';

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div tw="bg-gray-50 flex">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl font-bold tracking-tight text-gray-900 text-left">
              <span tw="md:text-8xl">{title}</span>
              <span tw="text-indigo-600">{description}</span>
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}