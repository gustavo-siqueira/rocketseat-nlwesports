import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { MagnifyingGlassPlus } from 'phosphor-react';

const CreateAdBanner: React.FC = () => {
  return (
    <div className="w-[90%] max-w-[1200px] pt-1 mx-auto mt-8 bg-nlwGradient self-stretch overflow-hidden rounded-lg">
      <div className="bg-[#2A2634] px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <strong className="text-2xl text-white text-center font-black block sm:text-left">
            Não encontrou o seu duo?
          </strong>
          <span className="text-zinc-400 text-center block sm:text-left">
            Publique um anúcio para encontrar novo players!
          </span>
        </div>
        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600 flex items-center justify-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
};

export default CreateAdBanner;
