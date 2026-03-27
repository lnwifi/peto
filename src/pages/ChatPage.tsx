import { useState, useEffect, useRef } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

// Mock data - replace with Supabase queries
const mockConversations = [
  {
    id: '1',
    pet_name: 'Luna',
    pet_photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
    owner: 'María García',
    lastMessage: '¡Hola! Vi que tu golden también le gusta jugar con pelota',
    time: '10:30',
    unread: 2,
  },
  {
    id: '2',
    pet_name: 'Michi',
    pet_photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100',
    owner: 'Carlos Rodríguez',
    lastMessage: '¿Quieren encontrarse el sábado?',
    time: 'Ayer',
    unread: 0,
  },
  {
    id: '3',
    pet_name: 'Rocky',
    pet_photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100',
    owner: 'Ana Pérez',
    lastMessage: '¡Rocky es adorable!',
    time: 'Lun',
    unread: 0,
  },
]

const mockMessages = [
  { id: '1', sender: 'them', content: '¡Hola! Vi tu perfil, tu golden es hermoso 🐶', time: '10:25' },
  { id: '2', sender: 'me', content: '¡Hola! Gracias, Luna es lo mejor. ¿Cómo está tu gato?', time: '10:27' },
  { id: '3', sender: 'them', content: 'Michi está muy bien, gracias. Vi que también le gusta el agua', time: '10:28' },
  { id: '4', sender: 'me', content: '¡Sí! Luna ama nadar. ¿Michi también?', time: '10:29' },
  { id: '5', sender: 'them', content: '¡Hola! Vi que tu golden también le gusta jugar con pelota', time: '10:30' },
]

export function ChatPage() {
  const { user } = useAuth()
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [conversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [...prev, {
      id: String(prev.length + 1),
      sender: 'me',
      content: newMessage,
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    }])
    setNewMessage('')
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-carbon/20 mx-auto mb-4" />
          <p className="text-carbon/60 mb-4">Iniciá sesión para chatear</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto h-[calc(100vh-64px)] flex">
        {/* Conversations List */}
        <div className={`${selectedConv ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-carbon/5 bg-white`}>
          <div className="p-4 border-b border-carbon/5">
            <h1 className="font-nunito font-bold text-xl text-carbon">Mensajes</h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-carbon/5 transition text-left ${
                  selectedConv === conv.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                }`}
              >
                <img
                  src={conv.pet_photo}
                  alt={conv.pet_name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-carbon truncate">{conv.pet_name}</p>
                    <span className="text-xs text-carbon/40">{conv.time}</span>
                  </div>
                  <p className="text-sm text-carbon/60 truncate">{conv.owner}</p>
                  <p className="text-sm text-carbon/50 truncate mt-1">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedConv ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-cream`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-4 border-b border-carbon/5 flex items-center gap-3">
                <button 
                  onClick={() => setSelectedConv(null)}
                  className="md:hidden p-2 hover:bg-carbon/5 rounded-lg"
                >
                  ←
                </button>
                {conversations.map((conv) => {
                  if (conv.id !== selectedConv) return null
                  return (
                    <>
                      <img
                        src={conv.pet_photo}
                        alt={conv.pet_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-carbon">{conv.pet_name}</p>
                        <p className="text-xs text-carbon/60">{conv.owner}</p>
                      </div>
                    </>
                  )
                })}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'me'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-white text-carbon rounded-bl-md border border-carbon/5'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-white/60' : 'text-carbon/40'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="bg-white p-4 border-t border-carbon/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribí un mensaje..."
                    className="flex-1 px-4 py-3 border border-carbon/10 rounded-xl focus:outline-none focus:border-primary transition"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="bg-primary text-white px-4 py-3 rounded-xl hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-carbon/20 mx-auto mb-4" />
                <p className="text-carbon/60">Seleccioná una conversación</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
