import { FunctionComponent } from 'react'
import Link from 'next/link'

interface Error404Props {}

const Error404: FunctionComponent<Error404Props> = ({}) => {
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#2563eb', fontWeight: 800 }}>
        404 Not Found
      </h1>
      <p style={{ margin: '1rem 0', fontSize: '1.2rem', color: '#555' }}>
        찾으시는 페이지가 존재하지 않아요! <br />
        주소가 정확한지 확인해 주세요.
        <br />
        홈으로 돌아가 새로운 영화를 만나보세요!
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#2563eb',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
      >
        🏠 홈으로 가기
      </button>
    </main>
  )
}

export default Error404
