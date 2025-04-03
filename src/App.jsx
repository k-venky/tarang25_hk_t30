import { useState, useEffect } from 'react'

function App() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Campus Event', content: 'Join us for the annual spring festival this weekend!', author: 'Dean Williams', date: '2025-03-28' },
    { id: 2, title: 'Schedule Change', content: 'All classes will be held online next Monday due to facility maintenance.', author: 'Prof. Johnson', date: '2025-03-29' },
    { id: 3, title: 'New Research Opportunity', content: 'Applications are now open for the summer research program. Deadline is April 15th.', author: 'Dr. Martinez', date: '2025-04-01' }
  ])
  
  const [feedback, setFeedback] = useState([])
  const [newFeedback, setNewFeedback] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('student')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, setTheme] = useState('light')
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // Show notification
  const displayNotification = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (username.trim()) {
      setIsLoggedIn(true)
      displayNotification(`Welcome, ${username}!`)
    }
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    if (newFeedback.trim()) {
      const newFeedbackItem = { 
        id: feedback.length + 1, 
        content: newFeedback,
        user: username,
        timestamp: new Date().toLocaleString(),
        likes: 0
      }
      setFeedback([...feedback, newFeedbackItem])
      setNewFeedback('')
      displayNotification('Feedback submitted successfully!')
    }
  }

  const handleAddAnnouncement = (e) => {
    e.preventDefault()
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      const announcement = {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        author: username,
        date: new Date().toISOString().split('T')[0]
      }
      setAnnouncements([announcement, ...announcements])
      setNewAnnouncement({ title: '', content: '' })
      displayNotification('Announcement posted successfully!')
    }
  }

  const handleLike = (id) => {
    setFeedback(feedback.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ))
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lightTheme = {
    backgroundColor: '#f5f5f5',
    textColor: '#333',
    headerBg: '#2c3e50',
    headerText: '#ffffff',
    cardBg: '#ffffff',
    accentColor: '#3498db',
    hoverColor: '#2980b9',
    secondaryBg: '#f9f9f9',
    borderColor: '#eee',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  }

  const darkTheme = {
    backgroundColor: '#121212',
    textColor: '#e0e0e0',
    headerBg: '#1a1a2e',
    headerText: '#ffffff',
    cardBg: '#1e1e30',
    accentColor: '#6366f1',
    hoverColor: '#818cf8',
    secondaryBg: '#252538',
    borderColor: '#333',
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  }

  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  const styles = {
    app: {
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: 1.6,
      color: currentTheme.textColor,
      backgroundColor: currentTheme.backgroundColor,
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      backgroundColor: currentTheme.headerBg,
      color: currentTheme.headerText,
      padding: '20px',
      borderRadius: '12px',
      boxShadow: `0 4px 12px ${currentTheme.shadowColor}`,
      marginBottom: '30px',
      position: 'relative',
      overflow: 'hidden'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    titleSection: {
      flex: '1'
    },
    controlsSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    search: {
      display: 'flex',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '8px 12px',
      margin: '15px 0 0'
    },
    searchInput: {
      backgroundColor: 'transparent',
      border: 'none',
      color: currentTheme.headerText,
      width: '100%',
      padding: '5px',
      outline: 'none',
      fontSize: '16px'
    },
    themeToggle: {
      backgroundColor: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      color: currentTheme.headerText,
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '18px'
    },
    logoutBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      color: currentTheme.headerText,
      padding: '8px 15px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '14px'
    },
    main: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
      gap: '30px'
    },
    section: {
      background: currentTheme.cardBg,
      padding: '25px',
      borderRadius: '12px',
      boxShadow: `0 4px 12px ${currentTheme.shadowColor}`,
      transition: 'all 0.3s ease'
    },
    h1: {
      marginBottom: '10px',
      fontSize: '28px'
    },
    h2: {
      color: currentTheme.textColor,
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: `2px solid ${currentTheme.borderColor}`,
      fontSize: '24px',
      position: 'relative'
    },
    h2After: {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '50px',
      height: '2px',
      backgroundColor: currentTheme.accentColor
    },
    announcementCard: {
      backgroundColor: currentTheme.secondaryBg,
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: 'none',
      boxShadow: `0 2px 8px ${currentTheme.shadowColor}`,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    announcementCardHover: {
      transform: 'translateY(-3px)',
      boxShadow: `0 6px 12px ${currentTheme.shadowColor}`
    },
    announcementMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.85rem',
      color: theme === 'light' ? '#666' : '#aaa',
      marginTop: '10px',
      paddingTop: '10px',
      borderTop: `1px solid ${currentTheme.borderColor}`
    },
    form: {
      marginBottom: '25px'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: '500'
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '12px 15px',
      backgroundColor: currentTheme.secondaryBg,
      border: `1px solid ${currentTheme.borderColor}`,
      borderRadius: '8px',
      fontSize: '16px',
      color: currentTheme.textColor,
      transition: 'border-color 0.2s ease'
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      backgroundColor: currentTheme.secondaryBg, 
      border: `1px solid ${currentTheme.borderColor}`,
      borderRadius: '8px',
      fontSize: '16px',
      color: currentTheme.textColor,
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '120px',
      transition: 'border-color 0.2s ease'
    },
    button: {
      backgroundColor: currentTheme.accentColor,
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    buttonHover: {
      backgroundColor: currentTheme.hoverColor,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 8px ${currentTheme.shadowColor}`
    },
    feedbackItem: {
      backgroundColor: currentTheme.secondaryBg,
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      boxShadow: `0 2px 8px ${currentTheme.shadowColor}`,
      position: 'relative'
    },
    feedbackAction: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
      gap: '5px'
    },
    likeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: currentTheme.accentColor,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '3px',
      fontSize: '14px',
      padding: '5px 10px',
      borderRadius: '6px',
      transition: 'background-color 0.2s ease'
    },
    likeButtonHover: {
      backgroundColor: theme === 'light' ? 'rgba(52, 152, 219, 0.1)' : 'rgba(99, 102, 241, 0.1)'
    },
    feedbackMeta: {
      fontSize: '0.85rem',
      color: theme === 'light' ? '#666' : '#aaa',
      marginTop: '10px',
      paddingTop: '10px',
      borderTop: `1px solid ${currentTheme.borderColor}`,
      display: 'flex',
      justifyContent: 'space-between'
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
      padding: '20px',
      color: theme === 'light' ? '#666' : '#aaa',
      fontSize: '0.9rem',
      borderTop: `1px solid ${currentTheme.borderColor}`
    },
    loginContainer: {
      maxWidth: '500px',
      margin: '100px auto',
      padding: '40px',
      background: currentTheme.cardBg,
      borderRadius: '12px',
      boxShadow: `0 8px 20px ${currentTheme.shadowColor}`,
      textAlign: 'center'
    },
    loginH1: {
      marginBottom: '15px',
      color: currentTheme.textColor
    },
    loginP: {
      marginBottom: '25px',
      color: theme === 'light' ? '#666' : '#aaa'
    },
    roleToggle: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    roleButton: {
      padding: '8px 15px',
      borderRadius: '6px',
      border: `1px solid ${currentTheme.borderColor}`,
      backgroundColor: 'transparent',
      color: currentTheme.textColor,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    activeRoleButton: {
      backgroundColor: currentTheme.accentColor,
      borderColor: currentTheme.accentColor,
      color: 'white'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '20px',
      color: currentTheme.textColor
    },
    notification: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: currentTheme.accentColor,
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      boxShadow: `0 4px 12px ${currentTheme.shadowColor}`,
      zIndex: 1000,
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      transform: showNotification ? 'translateY(0)' : 'translateY(20px)',
      opacity: showNotification ? 1 : 0
    }
  }

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div style={styles.app}>
        <div style={styles.loginContainer}>
          <h1 style={styles.loginH1}>Communication Platform</h1>
          <p style={styles.loginP}>Please login to access the communication platform</p>
          
          <div style={styles.roleToggle}>
            <button 
              style={role === 'student' ? 
                {...styles.roleButton, ...styles.activeRoleButton} : 
                styles.roleButton}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button 
              style={role === 'faculty' ? 
                {...styles.roleButton, ...styles.activeRoleButton} : 
                styles.roleButton}
              onClick={() => setRole('faculty')}
            >
              Faculty
            </button>
          </div>
          
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <button 
              type="submit" 
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style = {...styles.button, ...styles.buttonHover}}
              onMouseOut={(e) => e.currentTarget.style = {...styles.button}}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.titleSection}>
              <h1 style={styles.h1}>Student-Faculty Communication Platform</h1>
              <p>Welcome, {username} ({role === 'faculty' ? 'Faculty Member' : 'Student'})</p>
            </div>
            <div style={styles.controlsSection}>
              <button 
                style={styles.themeToggle} 
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀'}
              </button>
              <button 
                style={styles.logoutBtn}
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            </div>
          </div>
          
          <div style={styles.search}>
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </header>
        
        <main style={styles.main}>
          <section style={styles.section}>
            <h2 style={styles.h2}>
              Announcements
              <span style={styles.h2After}></span>
            </h2>
            
            {role === 'faculty' && (
              <form onSubmit={handleAddAnnouncement} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Announcement Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter title" 
                    value={newAnnouncement.title} 
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Announcement Content</label>
                  <textarea 
                    placeholder="Enter content" 
                    value={newAnnouncement.content} 
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    style={styles.textarea}
                  />
                </div>
                <button 
                  type="submit" 
                  style={styles.button}
                  onMouseOver={(e) => e.currentTarget.style = {...styles.button, ...styles.buttonHover}}
                  onMouseOut={(e) => e.currentTarget.style = {...styles.button}}
                >
                  Post Announcement
                </button>
              </form>
            )}
            
            {filteredAnnouncements.length === 0 ? (
              <p>No announcements match your search.</p>
            ) : (
              filteredAnnouncements.map(announcement => (
                <div 
                  style={styles.announcementCard} 
                  key={announcement.id}
                  onMouseOver={(e) => e.currentTarget.style = {...styles.announcementCard, ...styles.announcementCardHover}}
                  onMouseOut={(e) => e.currentTarget.style = {...styles.announcementCard}}
                >
                  <h3>{announcement.title}</h3>
                  <p>{announcement.content}</p>
                  <div style={styles.announcementMeta}>
                    <span>By: {announcement.author}</span>
                    <span>Date: {announcement.date}</span>
                  </div>
                </div>
              ))
            )}
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>
              Feedback and Communication
              <span style={styles.h2After}></span>
            </h2>
            
            <form onSubmit={handleSubmitFeedback} style={styles.form}>
              <textarea
                placeholder="Share your thoughts or questions..."
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                style={styles.textarea}
              />
              <button 
                type="submit" 
                style={styles.button}
                onMouseOver={(e) => e.currentTarget.style = {...styles.button, ...styles.buttonHover}}
                onMouseOut={(e) => e.currentTarget.style = {...styles.button}}
              >
                Submit Feedback
              </button>
            </form>
            
            <div>
              {feedback.length === 0 ? (
                <p>No feedback yet. Be the first to share your thoughts!</p>
              ) : (
                feedback.map(item => (
                  <div style={styles.feedbackItem} key={item.id}>
                    <p>{item.content}</p>
                    <div style={styles.feedbackAction}>
                      <button 
                        onClick={() => handleLike(item.id)}
                        style={styles.likeButton}
                        onMouseOver={(e) => e.currentTarget.style = {...styles.likeButton, ...styles.likeButtonHover}}
                        onMouseOut={(e) => e.currentTarget.style = {...styles.likeButton}}
                      >
                        👍 {item.likes}
                      </button>
                    </div>
                    <div style={styles.feedbackMeta}>
                      <span>Posted by {item.user}</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <p>© 2025 Communication Platform | Terms of Service | Privacy Policy</p>
        </footer>
      </div>
      
      <div style={styles.notification}>
        {notificationMessage}
      </div>
    </div>
  )
}

export default App