import { useEffect, useState } from 'react'
import { socket } from "./socket";

export default function App() {
  const [username, setUsername] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [chat, setChat] = useState<any>([]);

  const [kb_toDo, setToDo] = useState<any>([]);
  const [kb_doing, setDoing] = useState<any>([]);
  const [kb_done, setDone] = useState<any>([]);

  const [chat_toDo, chatToDo] = useState<any>([]);
  const [chat_doing, chatDoing] = useState<any>([]);
  const [chat_done, chatDone] = useState<any>([]);

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

  const sendTodo = (e: any) => {
    e.preventDefault();
    if (!kb_toDo) return;
    socket.emit('new_todo', { kb_toDo });
    setMessage('');
  }

  const sendDoing = (e: any) => {
    e.preventDefault();
    if (!kb_doing) return;
    socket.emit('new_doing', { kb_doing });
    setMessage('');
  }

  const sendDone = (e: any) => {
    e.preventDefault();
    if (!kb_done) return;
    socket.emit('new_done', { kb_done });
    setMessage('');
  }

  return (
    <div className="p-6">
      <h3 className="font-semibold text-2xl mb-4">Kanban</h3>
      <div className='flex flex-row space-x-4 mt-4'>
        <div>
          <label htmlFor="for-username">ToDo</label>
          <div className="border h-[300px] w-[300px] overflow-y-auto p-4 mt-2 bg-gray-100">
            {
              chat_toDo.map((msg: any, i: number) => (
                <p key={i}><strong>{msg.username}: {msg.message}</strong></p>
              ))
            }
          </div>
          <form onSubmit={sendTodo}>
            <div className='flex flex-row items-center space-x-4 mt-4'>
              <input
                className="border p-1 rounded w-50" 
                type="text" 
                placeholder="Novo ToDo"
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
        <div>
          <label htmlFor="for-username">Doing</label>
          <div className="border h-[300px] w-[300px] overflow-y-auto p-4 mt-2 bg-gray-100">
            {
              chat_doing.map((msg: any, i: number) => (
                <p key={i}><strong>{msg.username}: {msg.message}</strong></p>
              ))
            }
          </div>
          <form onSubmit={sendDoing}>
            <div className='flex flex-row items-center space-x-4 mt-4'>
              <input
                className="border p-1 rounded w-50" 
                type="text" 
                placeholder="Novo Doing"
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
        <div>
          <label htmlFor="for-username">Done</label>
          <div className="border h-[300px] w-[300px] overflow-y-auto p-4 mt-2 bg-gray-100">
            {
              chat_done.map((msg: any, i: number) => (
                <p key={i}><strong>{msg.username}: {msg.message}</strong></p>
              ))
            }
          </div>
          <form onSubmit={sendDone}>
            <div className='flex flex-row items-center space-x-4 mt-4'>
              <input
                className="border p-1 rounded w-50" 
                type="text" 
                placeholder="Novo Done"
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
      </div>
    </div>
  )
}