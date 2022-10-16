import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';
import logoImg from './assets/logoNlwEsports.svg';
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import CreateAdModal from './components/CreateAdModal';
import KeenSlider from './components/KeenSlider';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://192.168.1.75:3333/games').then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col my-20">
      <img src={logoImg} alt="" className="max-h-[120px] sm:max-h-[160px]" />
      <h1 className="text-6xl text-white font-black mt-20 text-center hidden sm:block">
        Seu{' '}
        <span className="text-transparent bg-nlwGradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>
      <div className="px-8">
        <h1 className="text-2xl text-white font-black mt-20 sm:hidden">
          Encontre seu duo!
        </h1>
        <span className="text-zinc-400 sm:hidden">
          Selecione o jogo que deseja jogar...
        </span>
      </div>
      <div className="w-[90%] mt-16 mx-auto lg:w-full">
        {games.length > 0 && (
          <KeenSlider>
            {games.map((game) => {
              return (
                <div key={game.id} className="keen-slider__slide">
                  <GameBanner
                    title={game.title}
                    bannerUrl={game.bannerUrl}
                    adsCount={game._count.ads}
                  />
                </div>
              );
            })}
          </KeenSlider>
        )}
      </div>
      <div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  );
}

export default App;
