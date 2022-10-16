import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { CaretLeft, CaretRight } from "phosphor-react";

interface KeenProps {
  children: React.ReactNode;
}

const KeenSlider: React.FC<KeenProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 0px)": {
        slides: { origin: "center", perView: 1.5, spacing: 14 },
      },
      "(min-width: 425px)": {
        slides: { perView: 2.5, spacing: 14 },
      },
      "(min-width: 640px)": {
        slides: { perView: 3.5, spacing: 14 },
      },
      "(min-width: 840px)": {
        slides: { perView: 4, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 24 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 6, spacing: 24 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div className="flex items-center gap-6 relative">
      <div ref={sliderRef} className="keen-slider max-w-[1200px] mx-auto">
        {children}
      </div>
      {loaded && instanceRef.current && (
        <>
          <button
            className="text-zinc-400 hidden -order-1 cursor-pointer hover:text-zinc-100 disabled:opacity-0 lg:block"
            onClick={(e: any) => {
              e.stopPropagation() || instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          >
            <CaretLeft size={48} weight="light" />
          </button>
          <button
            className="text-zinc-400 hidden cursor-pointer hover:text-zinc-100 disabled:opacity-0 lg:block"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current?.track.details.slides.length -
                (
                  instanceRef.current?.options.slides as {
                    perView: number;
                  }
                ).perView
            }
          >
            <CaretRight size={48} weight="light" />
          </button>
        </>
      )}
    </div>
  );
};

export default KeenSlider;
