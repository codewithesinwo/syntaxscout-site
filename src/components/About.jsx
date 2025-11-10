import React from "react";

export default function About() {
  return (
    // Add an id so we can target this section with a hash (/#about)
    <div id="about" className="bg-sky-100 text-white">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl text-gray-900 font-extrabold">About Us</h1>{" "}
          {/* <h1 className="mt-5 text-3xl md:text-4xl font-extrabold text-slate-900">
            We train and launch tech careers.
          </h1> */}
          <p className="mt-3 max-w-2xl mx-auto text-slate-900  font-bold">
            Syntax Scout is a career-focused tech academy and product lab
            that partners with individuals and organizations to build practical
            skills, ship real products, and access meaningful job opportunities
            in tech.
          </p>
        </div>

        {/* Two-column section: image + content */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/2">
            <img
              src="/GbyteTechnologiesLogo.png"
              alt="Syntax Scout students collaborating on a project"
              className="w-full h-80 md:h-full object-cover rounded-lg shadow-lg border"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900">
              What we do
            </h2>
            <h3 className="mt-4 text-slate-900 leading-relaxed font-bold text-justify">
              At Syntax Scout we combine industry-led curriculum, hands-on
              projects, and mentor guidance to prepare learners for real roles
              in software engineering, product design, cloud engineering and
              more. Our approach emphasizes practical experience: every learner
              ships a portfolio-ready product, completes mock interviews, and
              receives personalised career coaching.
            </h3>

            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-2 h-2 rounded-full bg-sky-600"  />
                Project-based learning with real codebases and deployment
                pipelines
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-2 h-2 rounded-full bg-sky-600" />
                1:1 mentorship, resume & interview preparation
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block w-2 h-2 rounded-full bg-sky-600" />
                Corporate training and bespoke team upskilling
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md font-medium"
              >
                Get in touch
              </a>
              <a
                href="/courses"
                className="text-slate-700 hover:text-slate-900 underline text-sm"
              >
                View courses
              </a>
            </div>
          </div>
        </section>

        {/* Supporting section: mission & outcomes */}
        <section className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="p-5 bg-slate-50 rounded-lg">
            <h3 className="font-bold text-2xl text-slate-900">Our mission</h3>
            <p className="mt-2 text-lg text-slate-600 text-justify">
              To close the gap between education and employment by delivering
              practical training that leads to measurable career outcomes.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-lg">
            <h3 className="font-bold text-2xl text-slate-900">Outcomes</h3>
            <p className="mt-2 text-lg text-slate-600 text-justify">
              Graduates land roles at startups and established companies, launch
              freelance careers, or scale internal engineering teams.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-lg">
            <h3 className="font-bold text-2xl text-slate-900">Partnerships</h3>
            <p className="mt-2 text-lg text-slate-600 text-justify">
              We work with industry partners to shape curriculum and provide
              hiring opportunities for our learners.
            </p>
          </div>
        </section>

        <footer className="text-center py-6 border-t">
          <p className="text-slate-700">
            Ready to accelerate your tech career?
          </p>
          <a
            href="/signup"
            className="mt-3 inline-block bg-sky-600 text-white px-6 py-2 rounded-lg"
          >
            Join Gbyte
          </a>
        </footer>
      </main>
    </div>
  );
}
