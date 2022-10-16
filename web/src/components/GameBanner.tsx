import React from 'react';

// import { Container } from './styles';

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

const GameBanner: React.FC<GameBannerProps> = (props) => {
  return (
    <div className="relative">
      <a href="#">
        <img
          src={props.bannerUrl}
          alt="Imagem banner"
          className="h-full w-full rounded-md"
        />
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 rounded-md">
          <strong className="font-semibold text-white block">
            {props.title}
          </strong>
          <span className="text-zinc-300 text-sm block mt-1">
            {props.adsCount} anúncios
          </span>
        </div>
      </a>
    </div>
  );
};

export default GameBanner;
