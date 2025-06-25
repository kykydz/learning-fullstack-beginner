'use client';

import { useEffect, useState } from 'react';

export default function AuthPage() {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'kiki',
          }),
        });

        const data = await response.json();

        setToken(data.token);
        if (data.token) {
          document.cookie = `token=${data.token}; path=/`;
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    login();
  }, []);

  return (
    <div>
      {token ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Token:</h1>
          <pre className="bg-black-100 p-4 rounded-md overflow-auto whitespace-pre-wrap">
            {JSON.stringify(token, null, 2)}
          </pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
