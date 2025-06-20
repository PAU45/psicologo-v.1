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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-white flex items-center justify-center p-4 font-sans">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 max-w-lg w-full border border-indigo-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 rounded-full p-4 shadow-lg mb-2">
            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 20.5c4.5 0 8-3.5 8-8s-3.5-8-8-8-8 3.5-8 8 3.5 8 8 8z" />
              <path d="M12 14v-4M12 10h.01" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight drop-shadow-lg">SoulSpace</h1>
          <p className="text-indigo-500 mt-2 text-lg font-medium">Bienestar emocional con IA</p>
        </div>
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
    <form onSubmit={handleLogin} className="space-y-7">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">Iniciar Sesión</h2>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-indigo-700">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-indigo-200 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 transition"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-indigo-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-indigo-200 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 transition"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition font-bold text-lg"
      >
        Iniciar Sesión
      </button>
      <p className="text-center text-sm text-indigo-500">
        ¿No tienes cuenta? <span className="font-semibold">Regístrate</span> <span className="italic text-gray-400">(demo)</span>
      </p>
      <p className="text-center text-xs text-gray-400 mt-2">
        Sugerencia: Usa <span className="font-mono bg-gray-100 px-1 rounded">test@example.com</span> y <span className="font-mono bg-gray-100 px-1 rounded">password123</span>
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
    <form onSubmit={handleSubmit} className="space-y-7">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
        Tu Bienestar en SoulSpace
      </h2>
      <div className="space-y-2">
        <label htmlFor="estresFrecuencia" className="block text-sm font-semibold text-indigo-700">
          Me siento estresado con frecuencia debido a mis actividades laborales.
        </label>
        <select
          id="estresFrecuencia"
          name="estresFrecuencia"
          className="w-full px-4 py-2 border border-indigo-200 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 transition"
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
      <div className="space-y-2">
        <label htmlFor="impactoBienestar" className="block text-sm font-semibold text-indigo-700">
          El trabajo ha afectado negativamente mi bienestar emocional o mental.
        </label>
        <select
          id="impactoBienestar"
          name="impactoBienestar"
          className="w-full px-4 py-2 border border-indigo-200 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 transition"
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
      <div className="space-y-2">
        <label htmlFor="herramientasEstres" className="block text-sm font-semibold text-indigo-700">
          Siento que tengo herramientas suficientes para manejar el estrés diario.
        </label>
        <select
          id="herramientasEstres"
          name="herramientasEstres"
          className="w-full px-4 py-2 border border-indigo-200 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 transition"
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
      <div className="space-y-2">
        <label htmlFor="opinionIA" className="block text-sm font-semibold text-indigo-700">
          ¿Qué opinas sobre el uso de inteligencia artificial para cuidar la salud emocional de los empleados?
        </label>
        <textarea
          id="opinionIA"
          name="opinionIA"
          rows={3}
          className="w-full px-4 py-2 border border-indigo-200 rounded-xl shadow focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 transition resize-y"
          placeholder="Escribe tu opinión aquí..."
          value={formData.opinionIA}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition font-bold text-lg"
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
          'Authorization': 'Bearer TU_API_KEY_AQUI', // <-- Pon aquí tu API Key de Groq
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
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
    <div className="flex flex-col h-[600px] bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl shadow-inner border border-indigo-100 overflow-hidden">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-br-none'
                  : 'bg-white/80 text-indigo-900 border border-indigo-100 rounded-bl-none'
              }`}
            >
              <p className="text-base">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] px-4 py-2 rounded-2xl shadow bg-white/80 border border-indigo-100 rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-indigo-100 p-4 bg-white/80 flex items-center gap-2">
        <textarea
          className="flex-1 px-4 py-2 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-900 bg-indigo-50 resize-none h-auto min-h-[40px] max-h-[120px] custom-scrollbar transition"
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
          className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
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