import { FunctionComponent } from 'react'

interface Error500Props {}

const Error500: FunctionComponent<Error500Props> = ({}) => {
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#ff6f61' }}>
        😿 Oops! 500 Error
      </h1>
      <p style={{ margin: '1rem 0', fontSize: '1.2rem', color: '#555' }}>
        서버에 문제가 생겼어요! 잠시 후 다시 시도해 주세요. <br />
        혹시 너무 오래 기다리셨다면, 홈으로 돌아가 볼까요?
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#ff6f61',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff8a75')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff6f61')}
      >
        🏠 홈으로 가기
      </button>
    </main>
  )
}

export default Error500
