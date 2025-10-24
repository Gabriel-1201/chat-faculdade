import { useEffect, useState } from 'react'
import { socket } from "./socket";

export default function App() {
  const [username, setUsername] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [chat, setChat] = useState<any>([]);

    const [kb_toDo, setToDo] = useState<any>([]);
    const [kb_doing, setDoing] = useState<any>([]);
    const [kb_done, setDOne] = useState<any>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log('Conectado ao servidor');
    })
    socket.on('chat_message', (data) => {
      console.log(data)
      setChat((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off('chat_message');
    }
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (!username || !message) return;
    socket.emit('chat_message', { username, message });
    setMessage('');
  }

  return (
    <div className="p-6 px-48">
      <h3 className="font-semibold text-2xl mb-4">Kanban</h3>
      <div className='flex flex-row items-center space-x-4 mt-4'>
        <div>
          <label htmlFor="for-username">ToDo</label>
          <div className="border h-[300px] w-[200px] overflow-y-auto p-4 mt-2 bg-gray-100">
            {
              kb_toDo.map((msg: any, i: number) => (
                <p key={i}><strong>{msg.username}: {msg.message}</strong></p>
              ))
            }
          </div>
        </div>
        <div>
          <label htmlFor="for-username">Doing</label>
          <div className="border h-[300px] w-[200px] overflow-y-auto p-4 mt-2 bg-gray-100">
            {
              kb_doing.map((msg: any, i: number) => (
                <p key={i}><strong>{msg.username}: {msg.message}</strong></p>
              ))
            }
          </div>
        </div>
        <div>
          <label htmlFor="for-username">Done</label>
          <div className="border h-[300px] w-[200px] overflow-y-auto p-4 mt-2 bg-gray-100">
            {
              kb_done.map((msg: any, i: number) => (
                <p key={i}><strong>{msg.username}: {msg.message}</strong></p>
              ))
            }
          </div>
        </div>
      </div>

      <form onSubmit={sendMessage}>
        <div className='flex flex-row items-center space-x-4 mt-4'>
          <input
            className="border p-1 rounded w-96" 
            type="text" 
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            className='border border-sky-800 bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-400 trasition-all duration-300 cursor-pointer'
            type="submit"
          >Enviar</button>
        </div>
      </form>
    </div>
  )
}