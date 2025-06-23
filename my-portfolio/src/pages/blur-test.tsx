export default function BlurTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f4ec 0%, #e0e7ff 100%)'
    }}>
      <div style={{
        position: 'fixed',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        height: 100,
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 20,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2>Should Blur Behind</h2>
      </div>
      <div style={{marginTop: 160, textAlign: 'center'}}>
        <h1>Background Content</h1>
        <p>Try scrolling or resizing the window.</p>
      </div>
    </div>
  )
}
