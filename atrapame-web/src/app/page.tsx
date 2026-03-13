"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);
  const slides = [
    [
      { icon: "🕶️", title: "Impostor doble", desc: "Dos encubiertos coordinados" },
      { icon: "⏱️", title: "Temporizador", desc: "Turnos de 20–30 s" },
      { icon: "✍️", title: "Pistas limitadas", desc: "Máximo 2 por ronda" },
    ],
    [
      { icon: "🐾", title: "Palabra similar", desc: "Perro vs lobo" },
      { icon: "🎴", title: "Cartas", desc: "Cambia pista y silencio" },
      { icon: "⚡", title: "Ronda rápida", desc: "Una vuelta y votación" },
    ],
    [
      { icon: "😂", title: "Modo memes", desc: "Humor internet" },
      { icon: "🎯", title: "Dificultad", desc: "Fácil/Medio/Difícil" },
      { icon: "🏆", title: "Puntuación", desc: "Opcional por ronda" },
    ],
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);
  const wordTitles = [
    "Perro","Lobo","Pizza","León","Tiburón","Minecraft","Zelda","Pokémon","Arepa","Café",
    "Taxi","Helicóptero","Alegría","Tormenta","Pizarrón","Arquitecto"
  ];
  const [wordsIndex, setWordsIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setWordsIndex((i) => (i + 3) % wordTitles.length);
    }, 4500);
    return () => clearInterval(id);
  }, [wordTitles.length]);
  const wordsToShow = [
    wordTitles[wordsIndex % wordTitles.length],
    wordTitles[(wordsIndex + 1) % wordTitles.length],
    wordTitles[(wordsIndex + 2) % wordTitles.length],
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-white">
      <main className="h-full w-full grid items-start" style={{ gridTemplateColumns: "3fr 2fr" }}>
        <section className="relative h-full bg-[#7A1F1F] text-white flex flex-col justify-start items-start pl-16 pr-8 py-16">
          <div className="overlay-layer pointer-events-none mesh-animated" />
          <div className="overlay-layer pointer-events-none burdeo-shine" />
          <div className="content-layer">
          <h1 className="text-6xl font-extrabold tracking-tight">Atrapame</h1>
          <div className="mt-2 h-1 w-28 bg-[#C62828] rounded"></div>
          <p className="mt-6 text-xl text-white/90 max-w-xl">
            Temática de ladrón: engaña con pistas, evita ser descubierto y gana la ronda.
          </p>
          <div className="mt-10 w-full max-w-2xl">
            <div className="rounded-2xl bg-black/20 border border-black/20 p-6">
              <h3 className="text-lg font-semibold">Modalidades y funciones</h3>
              <div className="mt-4 slide-wrap">
                <div className="slide-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                  {slides.map((group, gIdx) => (
                    <div key={gIdx} className="min-w-full grid grid-cols-3 gap-4">
                      {group.map((item, idx) => (
                        <div key={idx} className="card-dark">
                          <div className="title">{item.title}</div>
                          <div className="desc">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full divider-v"></div>
          </div>
        </section>

        <section className="relative h-full bg-black flex flex-col items-end justify-center pr-16">
          <div className="overlay-layer pointer-events-none">
            <div className="absolute right-0 top-1/2 w-96 h-96 rounded-full blur-3xl glow-pulse" style={{ background: "radial-gradient(circle, #C62828 0%, transparent 60%)" }} />
          </div>
          <div className="content-layer w-max ml-auto text-center">
            <h2 className="text-2xl font-bold text-white/90 mb-4">Jugar</h2>
            <div className="text-left mb-4">
              <div className="text-sm text-white/70">Temática de inocente</div>
              <p className="mt-1 max-w-sm text-white/85">
                Eres parte de la tripulación. Da pistas claras pero discretas para acercar al grupo a la palabra secreta,
                desenmascarar al ladrón y sacarlo de la ronda.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 btn-pill bg-[#C62828] hover:bg-[#b52222] text-white font-semibold"
                onClick={() => {}}
              >
                Comenzar
              </button>
              <button
                className="px-6 py-3 btn-pill border border-white/40 text-white hover:bg-white/10"
                onClick={() => setShowHelp(true)}
              >
                Cómo jugar
              </button>
            </div>
            <div className="mt-8 w-80 mx-auto">
              <div className="grid gap-3 swap-enter" key={wordsIndex}>
                {wordsToShow.map((w) => (
                  <div key={w} className="rounded-2xl bg-gradient-to-br from-[#7A1F1F] to-[#5d1616] border border-[#611717] shadow-lg px-5 py-4">
                    <div className="text-[11px] tracking-wide text-white/60">Palabra</div>
                    <div className="text-lg font-semibold text-white">{w}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {showHelp && (
        <div className="fixed inset-0 z-[1000] bg-black/70 overlay-fade flex items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-red-600 p-8 modal-zoom">
            <h2 className="text-2xl font-bold text-red-500">Cómo jugar</h2>
            <ul className="mt-4 space-y-2 text-white/90">
              <li>Elige categoría y cantidad de jugadores.</li>
              <li>Se revela una palabra a todos, menos al impostor.</li>
              <li>Turnos de pistas cortas; 2–3 rondas.</li>
              <li>Vota al impostor; si aciertan, gana la tripulación.</li>
            </ul>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="btn btn-outline-light rounded-pill"
                onClick={() => setShowHelp(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
