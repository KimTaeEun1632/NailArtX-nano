import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="px-6 py-20 lg:px-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-background-dark dark:bg-surface-dark px-8 py-16 text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-black">
            Ready to wear art on your fingertips?
          </h2>
          <p className="text-gray-300 mt-4">
            Join thousands using NailAI to create their next viral look.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/generate"
              className="h-14 px-8 rounded-xl bg-primary font-bold flex items-center justify-center"
            >
              Start Designing Free
            </Link>
            {/* <button className="h-14 px-8 rounded-xl bg-white/10 border border-white/20">
                    View Pricing
                  </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
