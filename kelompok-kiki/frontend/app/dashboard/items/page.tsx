'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url'); // Get the URL from query params

  const [data, setData] = useState<{ [key: string]: any }>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      setError(new Error('No URL provided'));
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const decodedUrl = decodeURIComponent(url);
        const response = await fetch(decodedUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Item Details</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-black">
        {JSON.stringify(data?.abilities, null, 2)}
      </pre>
    </div>
  );
}
