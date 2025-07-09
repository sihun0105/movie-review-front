'use client'

import { FunctionComponent } from 'react'

const GlobalError: FunctionComponent<{
  error: Error & { digest?: string }
  reset: () => void
}> = ({ error, reset }) => {
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#dc2626', fontWeight: 800 }}>
        500 Error
      </h1>
      <p style={{ margin: '1rem 0', fontSize: '1.2rem', color: '#555' }}>
        문제가 발생했습니다.
        <br />
        {error.message}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#dc2626',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
      >
        다시 시도하기
      </button>
    </main>
  )
}

export default GlobalError
