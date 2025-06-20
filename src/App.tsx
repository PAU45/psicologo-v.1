import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

// Tipos para las props
type LoginPageProps = {
  onLoginSuccess: (user: string) => void;
};

type WellnessFormPageProps = {
  onFormSubmit: () => void;
};

type ChatBotPageProps = {
  username: string;
};

// Componente principal de la aplicación SoulSpace
function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'form' | 'chat'>('login');
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    setCurrentPage('form');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'form':
        return <WellnessFormPage onFormSubmit={() => setCurrentPage('chat')} />;
      case 'chat':
        return <ChatBotPage username={username} />;
      default:
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full my-8 border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-6 tracking-tight">
          SoulSpace
        </h1>
        {renderPage()}
      </div>
    </div>
  );
}

// Componente de la Página de Inicio de Sesión
function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (email === 'test@example.com' && password === 'password123') {
      onLoginSuccess(email.split('@')[0]);
    } else {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Iniciar Sesión</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
      >
        Iniciar Sesión
      </button>
      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta? Regístrate (funcionalidad no implementada en este demo)
      </p>
      <p className="text-center text-xs text-gray-500 mt-2">
        Sugerencia: Usa "test@example.com" y "password123" para iniciar sesión.
      </p>
    </form>
  );
}

// Componente del Formulario de Bienestar
function WellnessFormPage({ onFormSubmit }: WellnessFormPageProps) {
  const [formData, setFormData] = useState({
    estresFrecuencia: '',
    impactoBienestar: '',
    herramientasEstres: '',
    opinionIA: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Tu Bienestar en SoulSpace
      </h2>
      <div>
        <label htmlFor="estresFrecuencia" className="block text-sm font-medium text-gray-700 mb-1">
          Me siento estresado con frecuencia debido a mis actividades laborales.
        </label>
        <select
          id="estresFrecuencia"
          name="estresFrecuencia"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={formData.estresFrecuencia}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="1">1 - Totalmente en desacuerdo</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 - Totalmente de acuerdo</option>
        </select>
      </div>
      <div>
        <label htmlFor="impactoBienestar" className="block text-sm font-medium text-gray-700 mb-1">
          El trabajo ha afectado negativamente mi bienestar emocional o mental.
        </label>
        <select
          id="impactoBienestar"
          name="impactoBienestar"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={formData.impactoBienestar}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="1">1 - Totalmente en desacuerdo</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 - Totalmente de acuerdo</option>
        </select>
      </div>
      <div>
        <label htmlFor="herramientasEstres" className="block text-sm font-medium text-gray-700 mb-1">
          Siento que tengo herramientas suficientes para manejar el estrés diario.
        </label>
        <select
          id="herramientasEstres"
          name="herramientasEstres"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={formData.herramientasEstres}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="1">1 - Totalmente en desacuerdo</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 - Totalmente de acuerdo</option>
        </select>
      </div>
      <div>
        <label htmlFor="opinionIA" className="block text-sm font-medium text-gray-700 mb-1">
          ¿Qué opinas sobre el uso de inteligencia artificial para cuidar la salud emocional de los empleados?
        </label>
        <textarea
          id="opinionIA"
          name="opinionIA"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 resize-y"
          placeholder="Escribe tu opinión aquí..."
          value={formData.opinionIA}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
      >
        Enviar Formulario
      </button>
    </form>
  );
}

// Componente de la Página del Chat Bot
function ChatBotPage({ username }: ChatBotPageProps) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: `Hola ${username}, soy tu asistente de bienestar de SoulSpace. Estoy aquí para escucharte y ayudarte a explorar tus emociones. ¿Cómo te sientes hoy o de qué te gustaría hablar?`,
      },
    ]);
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { sender: 'user', text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Construye el historial de mensajes en formato OpenAI
      const mensajes = [
        {
          role: 'system',
          content:
            'Actúa como un psicólogo de bienestar de SoulSpace. Responde de manera empática, comprensiva y profesional. Ofrece apoyo o sugerencias generales relacionadas con el bienestar emocional, estrés laboral o gestión de emociones. No ofrezcas diagnósticos ni reemplaces el asesoramiento profesional. Limita tus respuestas a 2-3 frases cortas.',
        },
        ...messages.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
        {
          role: 'user',
          content: newMessage.text,
        },
      ];

const respuesta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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', // <-- Bearer en vez de gsk_
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile', // <-- Cambia el modelo aquí
    messages: mensajes,
    max_tokens: 200,
  }),
});

      const result = await respuesta.json();

      if (
        result.choices &&
        result.choices.length > 0 &&
        result.choices[0].message &&
        result.choices[0].message.content
      ) {
        const botResponseText = result.choices[0].message.content;
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponseText },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.' },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Hubo un error en la conexión. Por favor, verifica tu red.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg shadow-inner border border-gray-100 overflow-hidden">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] px-4 py-2 rounded-lg shadow-sm bg-gray-200 rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 p-4 bg-white flex items-center gap-2">
        <textarea
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 resize-none h-auto min-h-[40px] max-h-[120px] custom-scrollbar"
          placeholder="Escribe tu mensaje aquí..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        ></textarea>
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.409l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;