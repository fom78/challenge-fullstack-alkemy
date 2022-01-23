
const Error = ({ message = 'There\'s nothing here!' }) => {
  return (
    <main style={{ padding: '1rem' }}>
      <p>{message}</p>
    </main>
  )
}

export default Error
