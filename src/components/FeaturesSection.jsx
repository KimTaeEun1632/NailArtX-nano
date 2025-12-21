import FeaturesIcon from "./FeaturesIcons";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="px-6 py-20 lg:px-20 bg-white dark:bg-[#121212]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-[720px] mx-auto">
          <h2 className="text-[#151118] dark:text-white text-3xl lg:text-4xl font-bold mb-4">
            Beauty meets Technology
          </h2>
          <p className="text-[#4a454e] dark:text-gray-300 text-lg">
            We combine cutting-edge AI with fashion-forward aesthetics to help
            you discover styles you never thought possible.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="
                group flex flex-col gap-5 p-8 rounded-2xl
                bg-background-light dark:bg-[#121212]
                border border-[#f3f0f4] dark:border-gray-600
                hover:border-primary/30
                transition-all
              "
            >
              {/* Icon Box */}
              <div
                className="
                  w-14 h-14 flex items-center justify-center rounded-3xl
                  bg-white dark:bg-white/10
                  text-primary
                  group-hover:bg-primary
                  transition-colors shadow-sm
                "
              >
                <FeaturesIcon
                  name={icon}
                  className="
                    w-6 h-6
                    text-primary
                    group-hover:text-white
                    transition-colors duration-300
                  "
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[#151118] dark:text-white text-xl font-bold mb-2">
                  {title}
                </h3>
                <p className="text-[#7c6388] dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "blot",
    title: "Instant Inspiration",
    desc: "Generate dozens of unique concepts in seconds just by typing a simple description.",
  },
  {
    icon: "fingerprint",
    title: "Uniquely Yours",
    desc: "Every design is created from scratch, ensuring your manicure is as unique as your fingerprint.",
  },
  {
    icon: "camera",
    title: "Salon-Ready References",
    desc: "High-resolution visuals you can take directly to your nail technician.",
  },
];
