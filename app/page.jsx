import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import HeroMedia from "@/app/components/HeroMedia";

const categories = [
  {
    href: "/projects",
    label: "Projects",
    emoji: "🎨",
    tape: "",
    note: "things I make",
    tilt: "tilt-l",
  },
  {
    href: "/swimming",
    label: "Swimming",
    emoji: "🌊",
    tape: "tape-mint",
    note: "galas & PBs",
    tilt: "tilt-r",
  },
  {
    href: "/music",
    label: "Music",
    emoji: "🎵",
    tape: "",
    note: "my own tunes",
    tilt: "tilt-l",
  },
  {
    href: "/hockey",
    label: "Hockey",
    emoji: "🏑",
    tape: "tape-butter",
    note: "team HC Knole Park",
    tilt: "tilt-r",
  },
];

export default function Home() {
  const allPosts = getAllPosts();
  const latest = allPosts.slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* ----- HERO: a scrapbook page ----- */}
      <section className="relative pt-2 pb-4">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          {/* Left: greeting */}
          <div className="reveal" style={{ animationDelay: "0.05s" }}>
            <span className="hand text-2xl sm:text-3xl block mb-2 -rotate-2">
              hello hello! my name is…
            </span>
            <h1 className="hero-title text-6xl sm:text-7xl lg:text-8xl mb-5">
              Enise
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[var(--pink-700)] mb-4 leading-snug">
              hockey player <span className="text-[var(--pink-300)]">·</span>{" "}
              swimmer <span className="text-[var(--pink-300)]">·</span> composer{" "}
              <span className="text-[var(--pink-300)]">·</span> explorer
            </p>
            <p className="text-[1.05rem] text-[var(--text-muted)] max-w-md leading-relaxed mb-7">
              Welcome to my little corner of the internet — a scrapbook of swim
              galas, hockey matches, music I’ve written and adventures big and
              small. ✨
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#explore" className="btn btn-primary">
                peek inside <ArrowRight size={16} />
              </a>
              <a href="#latest" className="btn btn-ghost">
                latest pages
              </a>
            </div>
          </div>

          {/* Right: taped polaroid */}
          <div
            className="reveal flex justify-center md:justify-end"
            style={{ animationDelay: "0.18s" }}
          >
            <div
              className="polaroid tilt-r max-w-[360px] w-full"
              style={{ transition: "transform .3s" }}
            >
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 z-10 h-7 w-28 rounded-sm opacity-90"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, rgba(255,255,255,.45) 0 7px, rgba(255,255,255,0) 7px 14px), linear-gradient(90deg, var(--pink-200), var(--lavender))",
                  boxShadow: "0 4px 8px -4px rgba(0,0,0,.18)",
                }}
                aria-hidden="true"
              />
              <img
                src="https://eniseperera-media.s3.eu-west-2.amazonaws.com/images/spring.jpeg"
                alt="Spring flowers that inspire my music"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="cap">a sprinkle of spring 🌷</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----- EXPLORE: category stickers ----- */}
      <section id="explore" className="scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl">
            <span className="underline-doodle">my world</span>
          </h2>
          <p className="hand text-2xl text-[var(--pink-500)] mt-3">
            pick a sticker & dive in!
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`card taped ${cat.tape} ${cat.tilt} reveal p-6 sm:p-7 pt-9 text-center group flex flex-col items-center justify-center min-h-[190px]`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="text-5xl sm:text-6xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {cat.emoji}
              </div>
              <div className="text-xl font-bold text-[var(--pink-800)] group-hover:text-[var(--accent)] transition-colors">
                {cat.label}
              </div>
              <div className="hand text-lg text-[var(--pink-400)]">
                {cat.note}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----- LATEST: pinned pages ----- */}
      <section id="latest" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row items-baseline sm:items-end justify-between mb-9 gap-2">
          <div>
            <h2 className="text-4xl sm:text-5xl">
              <span className="underline-doodle">latest pages</span>
            </h2>
            <p className="hand text-2xl text-[var(--pink-500)] mt-2">
              freshly glued in 💕
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-bold text-[var(--accent)] hover:text-[var(--accent-dark)] group"
          >
            see everything{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {latest.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
            {latest.map((post, i) => {
              const cat = post.frontmatter.category || "projects";
              return (
                <Link
                  key={post.slug}
                  href={`/${cat}/${post.slug}`}
                  className={`card reveal ${i % 2 ? "tilt-r" : "tilt-l"} group overflow-hidden flex flex-col`}
                  style={{ animationDelay: `${0.08 + i * 0.07}s` }}
                >
                  {post.frontmatter.hero && (
                    <div className="m-3 mb-0 overflow-hidden rounded-2xl border-4 border-white shadow-inner h-44">
                      <HeroMedia
                        hero={post.frontmatter.hero}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge cat-${cat}`}>{cat}</span>
                      <time className="text-xs text-[var(--text-muted)] font-semibold">
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          undefined,
                          { month: "short", year: "numeric" },
                        )}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--pink-800)] leading-tight mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm line-clamp-2 leading-snug">
                      {post.frontmatter.description || "Read more…"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <p className="hand text-2xl text-[var(--pink-500)]">
              more adventures coming soon!
            </p>
          </div>
        )}
      </section>

      {/* ----- Closing note ----- */}
      <section className="relative">
        <div className="card tilt-l max-w-2xl mx-auto p-8 sm:p-10 text-center">
          <div className="text-4xl mb-3">🎀</div>
          <p className="hand text-3xl text-[var(--pink-600)] leading-snug mb-2">
            thanks for stopping by my scrapbook!
          </p>
          <p className="text-[var(--text-muted)] max-w-md mx-auto">
            I play hockey for Knole Park Hockey Club, swim every chance I get,
            compose music, and chase adventures wherever they lead.
          </p>
        </div>
      </section>
    </div>
  );
}
