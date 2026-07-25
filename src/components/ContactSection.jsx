import { useState } from "react";
import {
  FaInstagram,
  FaBehance,
  FaPinterestP,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thank you, ${form.name}! Your message has been sent.`);

    setForm({
      name: "",
      email: "",
      service: "",
      message: "",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F2EDE4] text-[#111] overflow-hidden">

      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <header className="h-[58px] px-5 md:px-8 lg:px-10 flex items-center justify-between border-b border-black/15">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase">
          Let's Create
        </p>

        <p className="text-[9px] tracking-[0.28em] uppercase text-black/45">
          Contact / 05
        </p>
      </header>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[calc(100vh-58px)]">

        {/* =================================================
            LEFT SIDE
        ================================================== */}
        <div className="relative border-b lg:border-b-0 lg:border-r border-black/15 px-5 md:px-8 lg:px-10">

          <div className="h-full flex flex-col">

            {/* Small label */}
            <div className="pt-6">
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/45">
                Photography / Stories / People
              </p>
            </div>

            {/* =================================================
                LARGE TYPOGRAPHY
            ================================================== */}
            <div className="pt-6 lg:pt-8">

              <h1
                className="
                  uppercase
                  font-black
                  tracking-[-0.075em]
                  leading-[0.73]
                  text-[19vw]
                  sm:text-[16vw]
                  lg:text-[7.1vw]
                  xl:text-[6.9vw]
                  select-none
                "
              >
                <span className="block">
                  Capture
                </span>

                <span className="block">
                  The
                </span>

                <span className="block">
                  Moment.
                </span>
              </h1>

            </div>

            {/* =================================================
                PHOTOGRAPHY STATEMENT
            ================================================== */}
            <div className="mt-12 lg:mt-14 flex justify-end">

              <div className="w-full max-w-[280px] lg:max-w-[310px]">

                <div className="w-10 h-px bg-black mb-4" />

                <p className="text-[19px] md:text-[22px] leading-[1.12] tracking-[-0.035em]">
                  Stories are fleeting.
                  <br />

                  <span className="italic font-light">
                    Photographs aren't.
                  </span>
                </p>

                <p className="mt-4 text-[10px] leading-[1.7] text-black/45 max-w-[250px]">
                  Honest frames, quiet details and moments worth
                  remembering long after they're gone.
                </p>

              </div>

            </div>

            {/* Push bottom content down */}
            <div className="flex-1 min-h-[70px]" />

            {/* =================================================
                LEFT BOTTOM INFORMATION
            ================================================== */}
            <div className="border-t border-black/15 py-6 lg:py-7">

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

                {/* Services */}
                <div>
                  <p className="text-[8px] tracking-[0.25em] font-bold uppercase text-black/40 mb-3">
                    I Photograph
                  </p>

                  <div className="text-[11px] leading-[1.85]">
                    <p>Weddings</p>
                    <p>Portraits</p>
                    <p>Editorial</p>
                    <p>Events</p>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="text-[8px] tracking-[0.25em] font-bold uppercase text-black/40 mb-3">
                    Based In
                  </p>

                  <p className="text-[11px] leading-[1.75]">
                    New Delhi
                    <br />
                    India
                  </p>
                </div>

                {/* Social links */}
                <div className="col-span-2 md:col-span-1">

                  <p className="text-[8px] tracking-[0.25em] font-bold uppercase text-black/40 mb-3">
                    Follow
                  </p>

                  <div className="flex items-center gap-2">

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="
                        w-9 h-9
                        rounded-full
                        border border-black/20
                        flex items-center justify-center
                        transition-all duration-300
                        hover:bg-black
                        hover:text-[#F2EDE4]
                      "
                    >
                      <FaInstagram size={13} />
                    </a>

                    <a
                      href="https://behance.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Behance"
                      className="
                        w-9 h-9
                        rounded-full
                        border border-black/20
                        flex items-center justify-center
                        transition-all duration-300
                        hover:bg-black
                        hover:text-[#F2EDE4]
                      "
                    >
                      <FaBehance size={13} />
                    </a>

                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pinterest"
                      className="
                        w-9 h-9
                        rounded-full
                        border border-black/20
                        flex items-center justify-center
                        transition-all duration-300
                        hover:bg-black
                        hover:text-[#F2EDE4]
                      "
                    >
                      <FaPinterestP size={13} />
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}
        <div className="relative px-5 md:px-8 lg:px-10 xl:px-14 py-9 lg:py-11">

          <div className="h-full max-w-[720px] mx-auto flex flex-col">

            {/* =================================================
                FORM HEADING
            ================================================== */}
            <div>

              <p className="text-[8px] font-bold tracking-[0.3em] uppercase text-black/40 mb-4">
                Start a conversation
              </p>

              <h2
                className="
                  text-[42px]
                  sm:text-[50px]
                  md:text-[56px]
                  lg:text-[3.8vw]
                  xl:text-[58px]
                  leading-[0.92]
                  tracking-[-0.055em]
                "
              >
                Have a story

                <span className="block italic font-light mt-1">
                  worth capturing?
                </span>
              </h2>

              <p className="mt-5 max-w-[440px] text-[11px] md:text-xs leading-[1.75] text-black/45">
                Tell me about your day, your people, your idea, or simply
                the feeling you want to remember.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================== */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 mt-10 lg:mt-12"
            >

              {/* FORM FIELDS */}
              <div className="flex flex-col gap-7 md:gap-8">

                {/* =============================================
                    NAME
                ============================================== */}
                <div className="group">

                  <div className="flex gap-4 md:gap-6">

                    <span className="text-[9px] text-black/35 pt-[3px] shrink-0">
                      01
                    </span>

                    <label className="flex-1">

                      <span className="block text-[8px] tracking-[0.28em] font-bold uppercase text-black/45 mb-3">
                        Your Name
                      </span>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="What's your name?"
                        className="
                          w-full
                          bg-transparent
                          border-0
                          border-b
                          border-black/20
                          pb-4
                          outline-none
                          text-[19px]
                          md:text-[22px]
                          tracking-[-0.02em]
                          placeholder:text-black/25
                          focus:border-black
                          transition-colors
                          duration-300
                        "
                      />

                    </label>

                  </div>

                </div>

                {/* =============================================
                    EMAIL
                ============================================== */}
                <div className="group">

                  <div className="flex gap-4 md:gap-6">

                    <span className="text-[9px] text-black/35 pt-[3px] shrink-0">
                      02
                    </span>

                    <label className="flex-1">

                      <span className="block text-[8px] tracking-[0.28em] font-bold uppercase text-black/45 mb-3">
                        Email Address
                      </span>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com"
                        className="
                          w-full
                          bg-transparent
                          border-0
                          border-b
                          border-black/20
                          pb-4
                          outline-none
                          text-[19px]
                          md:text-[22px]
                          tracking-[-0.02em]
                          placeholder:text-black/25
                          focus:border-black
                          transition-colors
                          duration-300
                        "
                      />

                    </label>

                  </div>

                </div>

                {/* =============================================
                    SERVICE
                ============================================== */}
                <div className="group">

                  <div className="flex gap-4 md:gap-6">

                    <span className="text-[9px] text-black/35 pt-[3px] shrink-0">
                      03
                    </span>

                    <label className="flex-1">

                      <span className="block text-[8px] tracking-[0.28em] font-bold uppercase text-black/45 mb-3">
                        Photography Type
                      </span>

                      <div
                        className="
                          relative
                          border-b
                          border-black/20
                          pb-4
                          focus-within:border-black
                          transition-colors
                          duration-300
                        "
                      >

                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          required
                          className="
                            w-full
                            bg-transparent
                            border-0
                            outline-none
                            appearance-none
                            text-[18px]
                            md:text-[21px]
                            tracking-[-0.02em]
                            cursor-pointer
                            pr-10
                          "
                        >

                          <option value="" disabled>
                            Select a service
                          </option>

                          <option value="wedding">
                            Wedding Photography
                          </option>

                          <option value="portrait">
                            Portrait Session
                          </option>

                          <option value="event">
                            Event Coverage
                          </option>

                          <option value="commercial">
                            Commercial / Brand
                          </option>

                          <option value="other">
                            Something Else
                          </option>

                        </select>

                        <span
                          className="
                            absolute
                            right-1
                            top-1/2
                            -translate-y-1/2
                            text-lg
                            pointer-events-none
                          "
                        >
                          ↓
                        </span>

                      </div>

                    </label>

                  </div>

                </div>

                {/* =============================================
                    MESSAGE
                ============================================== */}
                <div className="group">

                  <div className="flex gap-4 md:gap-6">

                    <span className="text-[9px] text-black/35 pt-[3px] shrink-0">
                      04
                    </span>

                    <label className="flex-1">

                      <span className="block text-[8px] tracking-[0.28em] font-bold uppercase text-black/45 mb-3">
                        Your Vision
                      </span>

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Tell me a little about what you're imagining..."
                        className="
                          w-full
                          bg-transparent
                          border-0
                          border-b
                          border-black/20
                          pb-4
                          outline-none
                          resize-none
                          text-[18px]
                          md:text-[21px]
                          leading-[1.45]
                          tracking-[-0.02em]
                          placeholder:text-black/25
                          focus:border-black
                          transition-colors
                          duration-300
                        "
                      />

                    </label>

                  </div>

                </div>

              </div>

              {/* Push bottom section down on large screens */}
              <div className="flex-1 min-h-[45px]" />

              {/* =================================================
                  RESPONSE INFORMATION
              ================================================== */}
              <div className="ml-[25px] md:ml-[38px] border-t border-black/10 pt-4">

                <div className="flex items-center justify-between gap-4">

                  <p className="text-[7px] md:text-[8px] tracking-[0.22em] uppercase text-black/40">
                    Usually replies within 24–48 hours
                  </p>

                  <p className="hidden sm:block text-[7px] md:text-[8px] tracking-[0.22em] uppercase text-black/30">
                    New Delhi · India
                  </p>

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}
              <div className="ml-[25px] md:ml-[38px] mt-7">

                <button
                  type="submit"
                  className="
                    group
                    w-full
                    bg-[#111]
                    text-[#F2EDE4]
                    py-3
                    pl-6
                    pr-3
                    flex
                    items-center
                    justify-between
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:bg-[#262626]
                  "
                >

                  <div className="text-left">

                    <span className="block text-[7px] tracking-[0.3em] uppercase text-white/40 mb-1">
                      Ready when you are
                    </span>

                    <span className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase">
                      Send Inquiry
                    </span>

                  </div>

                  <span
                    className="
                      w-12
                      h-12
                      rounded-full
                      bg-[#F2EDE4]
                      text-black
                      flex
                      items-center
                      justify-center
                      transition-transform
                      duration-500
                      group-hover:rotate-45
                    "
                  >
                    <FiArrowUpRight size={17} />
                  </span>

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;