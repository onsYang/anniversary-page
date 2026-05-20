import { useRef, useState } from "react";
import "./App.css";

const timeline = [
  {
    date: "2024.05",
    title: "万柳：图书馆，午后和暴雨",
    photos: ["/photos/2024_5.jpg"],
  },
  {
    date: "2024.08",
    title: "呼市：超市，傍晚和慢悠悠的散步",
    photos: ["/photos/2024_8.jpg"],
  },
  {
    date: "2025.02",
    title: "上海：迪士尼的牛警长和冰雪公主",
    photos: ["/photos/2025_3.jpg"],
  },
  {
    date: "2025.05",
    title: "呼市：花与一周年",
    photos: ["/photos/2025_5.jpg"],
  },
  {
    date: "2025.06",
    title: "首尔：小韩的精致生活",
    photos: ["/photos/2025_6.jpg"],
  },
  {
    date: "2025.07",
    title: "毕业季和新生活",
    photos: ["/photos/2025_7_num1.jpg", "/photos/2025_7_num2.JPG"],
  },
  {
    date: "2025.12",
    title: "miss can over distance",
    photos: ["/photos/2025_12_num1.JPG", "/photos/2025_12_num2.jpg"],
  },
];

function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Audio play failed:", error);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/Background.m4a" loop />
      <button className="musicButton" onClick={toggleMusic}>
        <span className="musicIcon">{isPlaying ? "❚❚" : "▶"}</span>
        <span>{isPlaying ? "Playing your song" : "Play the song I sang"}</span>
      </button>
    </>
  );
}

function MapCard({ leftCity = "Me", rightCity = "You" }) {
  return (
    <div className="mapCard">
      <div className="mapGlowOne" />
      <div className="mapGlowTwo" />

      <div className="mapHeader">
        <span>Long-distance moment</span>
        <span className="smallHeart">♥</span>
      </div>

      <div className="mapBody">
        <div className="city cityLeft">
          <span className="pin">●</span>
          <span>{leftCity}</span>
        </div>

        <svg className="mapLine" viewBox="0 0 420 240" fill="none">
          <path
            d="M72 92 C150 12, 250 220, 345 160"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8 8"
          />
        </svg>

        <div className="mapHeart">♥</div>

        <div className="city cityRight">
          <span className="pin">●</span>
          <span>{rightCity}</span>
        </div>
      </div>
    </div>
  );
}

function PhotoCarousel({ photos }) {
  const [index, setIndex] = useState(0);
  const canNavigate = photos.length > 1;

  const prevPhoto = () => {
    setIndex((current) => (current === 0 ? photos.length - 1 : current - 1));
  };

  const nextPhoto = () => {
    setIndex((current) => (current === photos.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="carousel">
      <div className="photoFrame">
        <img src={photos[index]} alt={`Memory ${index + 1}`} />

        {canNavigate && (
          <div className="photoControls">
            <div className="photoCount">
              <span>📷</span>
              <span>
                {index + 1} / {photos.length}
              </span>
            </div>

            <div className="arrowButtons">
              <button onClick={prevPhoto} aria-label="Previous photo">
                ←
              </button>
              <button onClick={nextPhoto} aria-label="Next photo">
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {canNavigate && (
        <div className="dots">
          {photos.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={dotIndex === index ? "dot activeDot" : "dot"}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show photo ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineItem({ item }) {
  return (
    <article className="timelineItem">
      <div className="timelineDate">
        <div className="stickyDate">
          <h3>{item.date}</h3>
        </div>
      </div>

      <div className="timelineContent">
        <div className="timelineDot" />

        <div className="chapterText">
          <h2>{item.title}</h2>
        </div>

        <div className={item.hasMap ? "chapterMedia withMap" : "chapterMedia"}>
          {item.hasMap && (
            <MapCard leftCity={item.leftCity} rightCity={item.rightCity} />
          )}
          <PhotoCarousel photos={item.photos} />
        </div>
      </div>
    </article>
  );
}

function App() {
  return (
    <main className="page">
      <MusicButton />

      <section className="hero">
          <img className="heroImage" src="/photos/2025_12_num1.JPG" alt="Cover" />
        <div className="heroOverlay" />
        <div className="heroSideOverlay" />

        <div className="heroContent">
          <p className="eyebrow">Our Second Anniversary</p>
          <h1>
            Every mile
            <br />
            still leads me
            <br />
            to you.
          </h1>
          <p className="heroText">
            A small story page for our photos, our distance, our waiting, and
            all the moments that brought us here.
          </p>
        </div>

        <div className="scrollHint">
          <span>Scroll to begin the timeline</span>
          <span className="bounce">⌄</span>
        </div>
      </section>

      <section className="timelineIntro">
        <h2>Memory of our story, forever</h2>
      </section>

      <section className="timeline">
        {timeline.map((item) => (
          <TimelineItem key={item.date} item={item} />
        ))}
      </section>
    </main>
  );
}

export default App;
