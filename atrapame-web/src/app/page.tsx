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
      setWordsIndex((i) => (i + 1) % wordTitles.length);
    }, 2500);
    return () => clearInterval(id);
  }, [wordTitles.length]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-white">
      <main className="h-full w-full grid items-start" style={{ gridTemplateColumns: "3fr 2fr" }}>
        <section className="relative h-full bg-[#7A1F1F] text-white flex flex-col justify-start items-start pl-16 pr-8 py-16">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, #0000 0 12px, #000 12px 24px)" }} />
          <div className="flex items-center gap-3">
            <span className="text-4xl">🕵️‍♂️</span>
            <h1 className="text-6xl font-extrabold tracking-tight">Atrapame</h1>
          </div>
          <p className="mt-6 text-xl text-white/90 max-w-xl">
            Temática de ladrón: engaña con pistas, evita ser descubierto y gana la ronda.
          </p>
          <div className="mt-10 w-full max-w-2xl">
            <div className="rounded-2xl bg-black/20 border border-black/20 p-6">
              <h3 className="text-lg font-semibold">Modalidades y funciones</h3>
              <div className="mt-4 grid grid-cols-3 gap-4 carousel-enter">
                {slides[slide].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-black/25 border border-white/15 p-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="mt-2 text-base font-semibold">{item.title}</div>
                    <div className="text-white/85 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative h-full bg-black flex flex-col items-end justify-center pr-16">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #C62828 0%, transparent 60%)" }} />
          <div className="w-max ml-auto text-center">
            <h2 className="text-2xl font-bold text-white/90 mb-4">Jugar</h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 rounded-full bg-[#C62828] hover:bg-[#b52222] text-white font-semibold shadow"
                onClick={() => {}}
              >
                Comenzar
              </button>
              <button
                className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10"
                onClick={() => setShowHelp(true)}
              >
                Cómo jugar
              </button>
            </div>
            <div className="mt-6 text-left">
              <div className="text-sm text-white/70">Temática de inocente</div>
              <p className="mt-1 max-w-sm text-white/85">
                Eres parte de la tripulación. Da pistas claras pero discretas para acercar al grupo a la palabra secreta,
                desenmascarar al ladrón y sacarlo de la ronda.
              </p>
            </div>
            <div className="mt-8 w-80 ml-auto">
              <div className="grid gap-3">
                {[0,1,2].map((offset) => {
                  const w = wordTitles[(wordsIndex + offset) % wordTitles.length];
                  return (
                    <div key={w} className="card-stack rounded-2xl bg-[#7A1F1F] border border-[#611717] shadow-lg px-4 py-3">
                      <div className="text-xs text-white/70">Palabra</div>
                      <div className="text-lg font-semibold">{w}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {showHelp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-red-600 p-8">
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
