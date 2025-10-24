import { useEffect, useState } from 'react';
import { socket } from './socket';

export default function App() {
  // const [username, setUsername] = useState<string>();
  // const [message, setMessage] = useState<string>();
  // const [chat, setChat] = useState<any>([]);

  const [kb_toDo, setToDo] = useState<string>();
  const [kb_doing, setDoing] = useState<string>();
  const [kb_done, setDone] = useState<string>();

  const [chat_toDo, setChatToDo] = useState<any>([]);
  const [chat_doing, setChatDoing] = useState<any>([]);
  const [chat_done, setChatDone] = useState<any>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor');
    });

    socket.on('new_todo', (data) => {
      console.log("Novo toDo:", data);
      setChatDoing((prev: any) => [...prev, data]);
    });
    socket.on('new_doing', (data) => {
      console.log("Novo Doing:", data);
      setChatDoing((prev: any) => [...prev, data]);
    });
    socket.on('new_done', (data) => {
      console.log("Novo Done:", data);
      setChatDone((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off('new_todo');
      socket.off('new_doing');
      socket.off('new_done');
    };
  }, []);

  const sendTodo = (e: any) => {
    e.preventDefault();
    if (!kb_toDo) return;
    console.log("Enviando ToDo:", kb_toDo);
    socket.emit('new_todo', { kb_toDo });
    setToDo('');
  };

  const sendDoing = (e: any) => {
    e.preventDefault();
    if (!kb_doing) return;
    console.log("Enviando Doing:", kb_doing);
    socket.emit('new_doing', { kb_doing });
    setDoing('');
  };

  const sendDone = (e: any) => {
    e.preventDefault();
    if (!kb_done) return;
    console.log("Enviando Done:", kb_done);
    socket.emit('new_done', { kb_done });
    setDone('');
  };

  return (
    <div className='container mx-auto'>
      {' '}
      <div className='p-6'>
        <h3 className='font-semibold text-2xl mb-4'>Kanban</h3>
        <div className='flex flex-row space-x-4 mt-4'>
          <div>
            <label htmlFor='for-username'>ToDo</label>
            <div className='border h-[300px] w-[300px] overflow-y-auto p-4 mt-2 bg-gray-100'>
              {chat_toDo.map((msg: any, i: number) => (
                <p key={i}>
                  <strong>
                    {msg.username}: {msg.message}
                  </strong>
                </p>
              ))}
            </div>
            <form onSubmit={sendTodo}>
              <div className='flex flex-row items-center space-x-4 mt-4'>
                <input
                  className='border p-1 rounded w-50'
                  type='text'
                  placeholder='Novo ToDo'
                  value={kb_toDo}
                  onChange={(e) => setToDo(e.target.value)}
                />
                <button
                  className='border border-sky-800 bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-400 trasition-all duration-300 cursor-pointer'
                  type='submit'
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div>
            <label htmlFor='for-username'>Doing</label>
            <div className='border h-[300px] w-[300px] overflow-y-auto p-4 mt-2 bg-gray-100'>
              {chat_doing.map((msg: any, i: number) => (
                <p key={i}>
                  <strong>
                    {msg.username}: {msg.message}
                  </strong>
                </p>
              ))}
            </div>
            <form onSubmit={sendDoing}>
              <div className='flex flex-row items-center space-x-4 mt-4'>
                <input
                  className='border p-1 rounded w-50'
                  type='text'
                  placeholder='Novo Doing'
                  value={kb_doing}
                  onChange={(e) => setDoing(e.target.value)}
                />
                <button
                  className='border border-sky-800 bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-400 trasition-all duration-300 cursor-pointer'
                  type='submit'
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div>
            <label htmlFor='for-username'>Done</label>
            <div className='border h-[300px] w-[300px] overflow-y-auto p-4 mt-2 bg-gray-100'>
              {chat_done.map((msg: any, i: number) => (
                <p key={i}>
                  <strong>
                    {msg.username}: {msg.message}
                  </strong>
                </p>
              ))}
            </div>
            <form onSubmit={sendDone}>
              <div className='flex flex-row items-center space-x-4 mt-4'>
                <input
                  className='border p-1 rounded w-50'
                  type='text'
                  placeholder='Novo Done'
                  value={kb_done}
                  onChange={(e) => setDone(e.target.value)}
                />
                <button
                  className='border border-sky-800 bg-sky-500 text-white px-4 py-1 rounded hover:bg-sky-400 trasition-all duration-300 cursor-pointer'
                  type='submit'
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
