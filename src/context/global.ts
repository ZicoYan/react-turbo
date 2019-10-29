import { createContext } from 'react';
import { IMenuConfig } from 'src/types/menu';

interface IGlobalContext {
  menu: IMenuConfig[];
}

const GlobalContext = createContext<IGlobalContext>({
  menu: []
});

export default GlobalContext;
