import { useEffect, useMemo, useRef, useState } from "react";

/* ✏️ EDIT THESE ✏️ */
const HER = "Lavi";
const ME = "Mohit";
const MEET_LINK = "https://meet.google.com/new"; // paste your Google Meet link here
const MOVIES = ["Our favourite rom-com", "A scary one (you hold my arm)", "Something animated & cozy", "Your pick, always"];

function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, seen] = useReveal();
  return <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

function Typewriter({ text, speed = 70 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return <span>{text.slice(0, n)}<i className="caret" /></span>;
}

function Floaters({ count = 28, emoji = ["💗", "✨", "💫", "🌸", "💞"] }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    e: emoji[i % emoji.length], left: Math.random() * 100, size: 14 + Math.random() * 26,
    dur: 10 + Math.random() * 14, delay: -Math.random() * 20,
  })), [count]);
  return <div className="floaters" aria-hidden="true">{items.map((f, i) =>
    <span key={i} style={{ left: `${f.left}%`, fontSize: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>{f.e}</span>)}</div>;
}

const timeline = [
  { icon: "💬", t: " 1 · Only texts", d: "No calls. Just good-morning messages, long paragraphs, voice notes in my head that never got sent. Every ‘seen’ made me wish I had called." },
  { icon: "🔀", t: " 2 · App badalke baat karna", d: "WhatsApp to Instagram to Snapchat and back again. We kept switching apps like the right one would fix the distance. It wasn’t the app. It was me not showing up properly." },
  { icon: "📹", t: " 3 · Video calls", d: "The first video call, seeing your face after so long, was the best part of my whole week. You laughed and I forgot every excuse I had." },
  { icon: "🎬", t: "Google Meet movie nights", d: "Screen shared, bakchodi on both sides, pretending we were on the same bed. That is still my favourite place in the world, even through a screen." },
];

const promises = [
  { i: "👂", t: "I’ll listen first", d: "When you’re upset I won’t defend myself. I’ll hear you fully before I say a word." },
  { i: "📞", t: "I’ll actually call", d: "Real calls. Real voice. Not just ‘ok’ and ‘hmm’ replies on text." },
  { i: "⏰", t: "I’ll be consistent", d: "No disappearing, no half-effort. You’ll never have to wonder where I stand." },
  { i: "🌱", t: "I’ll keep growing", d: "I’m working on my temper, my ego, and my habits. Not for a day. For good." },
  { i: "🎁", t: "Little surprises", d: "Random songs, tiny notes, late night calls. Small things that say ‘I’m thinking of you’." },
  { i: "🤝", t: "I’ll own my mistakes", d: "No excuses and no blaming. If I’m wrong, I’ll say so and fix it." },
];

export default function App() {
  const [movie, setMovie] = useState(null);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState({ x: 0, y: 0, tries: 0 });
  const [open, setOpen] = useState(null);

  const dodge = () => setNo((s) => ({ x: (Math.random() - 0.5) * 260, y: (Math.random() - 0.5) * 160, tries: s.tries + 1 }));
  const noText = ["No", "Are you sure?", "Please? 🥺", "Think again…", "Last chance 😢", "Still no?!", "Okay you can’t say no 💗"][Math.min(no.tries, 6)];

  return (
    <main>
      <div className="aurora" aria-hidden="true"><b /><b /><b /></div>

      <section className="hero">
        <Floaters />
        <p className="small fadein">Hey Lavi, Its me MG</p>
        <h1 className="fadein d1">I’m sorry,<br /><em><Typewriter text={`${HER}.`} /></em></h1>
        <p className="lead fadein d2">I made mistakes. I know it, I feel it, and I didn’t want to just type a text. So thodi si mehnat krleta hu</p>
        <a href="#letter" className="btn fadein d3">Read what I want to say ↓</a>
        <div className="scroll" aria-hidden="true" />
      </section>

      <section id="letter" className="wrap">
        <Reveal><h2>My letter to you</h2></Reveal>
        <Reveal delay={120} className="letter">
          <p>Dear {HER},</p>
          <p>I’m sorry for the times I hurt you, for the words I should have held back, and for the times I stayed quiet when I should have spoken. I made mistakes, and the worst part is that you were the one who had to carry them.</p>
          <p>You never asked for perfect. You asked for effort, honesty, and someone who stays. I didn’t always give you that, and I’m sorry.</p>
          <p>I’m not asking you to forget what happened. I’m asking for a chance to show you, with actions and not just words, that I’m learning and changing.</p>
          <p className="sign">Always yours,<br /><span>{ME}</span></p>
        </Reveal>
      </section>

      <section className="wrap">
        <Reveal><h2>3 months, no calls, just us</h2></Reveal>
        <Reveal delay={100}><p className="sub">For three months we had no phone calls. Just texts, switching between apps, a few video calls and Google Meet movie nights. Even then, those moments meant everything to me.</p></Reveal>
        <div className="timeline">
          {timeline.map((x, i) => (
            <Reveal key={i} delay={i * 100} className={`tl ${i % 2 ? "right" : ""}`}>
              <div className="dot">{x.icon}</div>
              <div className="card"><h3>{x.t}</h3><p>{x.d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <Reveal><h2>What I promise to do</h2></Reveal>
        <Reveal><p className="sub">Tap a card. Each one is a promise I’m going to keep.</p></Reveal>
        <div className="grid">
          {promises.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <button className={`flip ${open === i ? "on" : ""}`} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="em">{p.i}</span>
                <strong>{p.t}</strong>
                <span className="more">{p.d}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap center">
        <Reveal><h2>Movie night? 🎬</h2></Reveal>
        <Reveal delay={100}><p className="sub">Like old times on Google Meet, but this time with a proper call and a proper laugh. Pick the vibe:</p></Reveal>
        <div className="chips">
          {MOVIES.map((m) => <button key={m} className={`chip ${movie === m ? "sel" : ""}`} onClick={() => setMovie(m)}>{m}</button>)}
        </div>
        {movie && <p className="pop">Tonight: <b>{movie}</b> 🍿 I’ll bring the snacks (virtually).</p>}
        <a className="btn" href={MEET_LINK} target="_blank" rel="noreferrer">Open our Google Meet 📹</a>
      </section>

      <section className="wrap center final">
        <Reveal><h2>So… can you forgive me?</h2></Reveal>
        <Reveal delay={100}><p className="sub">I love you. I miss you. I’ll be better, starting today.</p></Reveal>
        {!yes ? (
          <div className="ask">
            <button className="btn yes" style={{ transform: `scale(${1 + no.tries * 0.12})` }} onClick={() => setYes(true)}>Yes, I forgive you 💗</button>
            <button className="btn ghost" style={{ transform: `translate(${no.x}px, ${no.y}px)` }} onMouseEnter={dodge} onTouchStart={dodge} onClick={dodge}>{noText}</button>
          </div>
        ) : (
          <div className="thanks">
            <Floaters count={60} emoji={["💖", "🎉", "💗", "✨", "🥰", "🌹"]} />
            <h3>Thank you, {HER}. 🥹💗</h3>
            <p>You just made me the happiest person. I promise I won’t waste this chance.</p>
          </div>
        )}
      </section>

      <footer> ill never repeat the mistakes and i wrote a shayri for you, firstly accept my maafi. {HER}</footer>
    </main>
  );
}
