import { createContext } from 'react';
import { IMenuItem } from 'src/types/menu';

interface IGlobalContext {
  menu: IMenuItem[];
}

const GlobalContext = createContext<IGlobalContext>({
  menu: [],
});

export default GlobalContext;
