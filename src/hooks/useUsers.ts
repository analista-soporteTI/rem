// make a local storage of users register
const useUsers = () => {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers)
        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers)
        }
      } catch (error) {
        console.error('Failed to parse stored users:', error)
      }
    }
  }, [])

  return { users, setUsers }
}