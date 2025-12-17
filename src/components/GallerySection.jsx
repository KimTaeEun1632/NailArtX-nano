import { Link } from "react-router-dom";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="px-6 py-20 lg:px-20 bg-white dark:bg-surface-dark/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#151118] dark:text-white text-2xl font-bold">
            Community Creations
          </h2>
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All Gallery
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
                className="w-full h-auto object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-xs font-medium">{item.title}</p>
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
    src: "겨울 하운트 체크 네일.jpg",
  },
  {
    title: "Frozen",
    src: "겨울왕국.jpg",
  },
  {
    title: "Flower",
    src: "flower.jpg",
  },
  {
    title: "Moana",
    src: "모아나.jpg",
  },
  {
    title: "Rudolph",
    src: "루돌프.jpg",
  },
  {
    title: "Santa",
    src: "santa.jpg",
  },
];
