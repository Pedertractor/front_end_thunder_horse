import { createContext, ReactNode, useEffect, useState } from 'react';
import { TypeStatusPrometeus } from '../types/TypePrometeusStatus';

interface TypeGlobalContext {
  isStatusPrometeusGlobal: TypeStatusPrometeus[] | null;
  setStatusPrometeusGlobal: (
    isStatusPrometeusGlobal: TypeStatusPrometeus[] | null
  ) => void;
}

const initialContext: TypeGlobalContext = {
  isStatusPrometeusGlobal: null,
  setStatusPrometeusGlobal: () => {},
};

export const GlobalContext = createContext<TypeGlobalContext>(initialContext);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isStatusPrometeusGlobal, setStatusPrometeusGlobal] = useState<
    TypeStatusPrometeus[] | null
  >(null);

  const handleSocketMessage = (event: { data: string }) => {
    try {
      const data: TypeStatusPrometeus[] = JSON.parse(event.data);
      console.log(data)
      setStatusPrometeusGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlWs:string = import.meta.env.VITE_BASE_URL_WS_STATUS
    const socket = new WebSocket(urlWs);

    socket.addEventListener('open', () => {
      socket.send('conexão estalecida');
    });

    socket.addEventListener('message', handleSocketMessage);

    // return () => {
    //   socket.close();
    // };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isStatusPrometeusGlobal,
        setStatusPrometeusGlobal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
