import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function GallerySection() {
  const { t } = useLanguage();

  return (
    <section
      id="gallery"
      className="px-6 py-20 lg:px-20 bg-white dark:bg-[#121212] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#151118] dark:text-white text-2xl font-bold">
            {t("gallery.title")}
          </h2>
          <Link
            to="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t("gallery.viewAll")}
          </Link>
        </div>

        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {GALLERY.map((item) => (
            <div
              key={item.title}
              className="break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                width="300"
                height="400"
                className="w-full h-auto object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-xs font-medium">{t(`gallery.items.${item.title.toLowerCase()}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GALLERY = [
  {
    title: "Winter",
    src: "winter.jpg",
  },
  {
    title: "Winter2",
    src: "winter2.jpg",
  },
  {
    title: "Winter houndstooth check",
    src: "winter-houndstooth.jpg",
  },
  {
    title: "Frozen",
    src: "frozen-world.jpg",
  },
  {
    title: "Flower",
    src: "flower.jpg",
  },
  {
    title: "Moana",
    src: "moana-spirit.jpg",
  },
  {
    title: "Rudolph",
    src: "rudolph-classic.jpg",
  },
  {
    title: "Santa",
    src: "santa.jpg",
  },
];
