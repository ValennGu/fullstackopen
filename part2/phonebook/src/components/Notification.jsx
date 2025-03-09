const Notification = ({message, type}) => {
  return (message && 
    <h3 style={{
      color: type === 'err' ? 'coral' : 'lavender',
      width: 500,
      padding: 10,
      fontSize: 15,
      borderStyle: 'solid',
      borderRadius: 8,
      borderWidth: 2
    }}>
      {message}
    </h3>
  )
}

export default Notification