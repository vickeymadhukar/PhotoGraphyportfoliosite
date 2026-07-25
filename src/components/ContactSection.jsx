import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Aperture, Send } from "lucide-react";

// --- CUSTOM SELECT SHIMS (Replacements for Shadcn UI) ---

const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(c => c.type === SelectTrigger);
  const content = childrenArray.find(c => c.type === SelectContent);

  return (
    <div ref={containerRef} className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="w-full">
        {trigger ? React.cloneElement(trigger, { value }) : null}
      </div>
      {isOpen && content ? (
        <div className="absolute left-0 right-0 mt-1 z-50 rounded-md bg-[#1a1a1a] text-[#F0ECE2] border border-white/10 shadow-lg py-1 max-h-60 overflow-auto">
          {React.cloneElement(content, {
            onSelect: (val) => {
              onValueChange(val);
              setIsOpen(false);
            },
            selectedValue: value
          })}
        </div>
      ) : null}
    </div>
  );
};

const SelectTrigger = ({ className, children, value }) => {
  return (
    <button
      type="button"
      className={`${className} flex items-center justify-between w-full text-left`}
    >
      <span>{value || children.props.placeholder || "Select a service"}</span>
      <span className="text-white/40 text-xs">▼</span>
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  return <span className="text-white/40">{placeholder}</span>;
};

const SelectContent = ({ children, onSelect, selectedValue }) => {
  return (
    <div className="py-1">
      {React.Children.map(children, child => {
        return React.cloneElement(child, { onSelect, selectedValue });
      })}
    </div>
  );
};

const SelectItem = ({ value, children, onSelect, selectedValue }) => {
  const isSelected = selectedValue === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-white/10 ${
        isSelected ? "text-[#C9B896] bg-white/5 font-semibold" : "text-[#F0ECE2]"
      }`}
    >
      {children}
    </button>
  );
};

// --- CUSTOM POPOVER SHIMS (Replacements for Shadcn UI) ---

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(c => c.type === PopoverTrigger);
  const content = childrenArray.find(c => c.type === PopoverContent);

  return (
    <div ref={containerRef} className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="w-full">
        {trigger ? React.cloneElement(trigger, { isOpen }) : null}
      </div>
      {isOpen && content ? (
        <div className="absolute left-0 mt-2 z-50">
          {React.cloneElement(content, { onClose: () => setIsOpen(false) })}
        </div>
      ) : null}
    </div>
  );
};

const PopoverTrigger = ({ asChild, children, isOpen }) => {
  return children;
};

const PopoverContent = ({ className, children, onClose }) => {
  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {React.Children.map(children, child => {
        if (child.type === Calendar) {
          return React.cloneElement(child, {
            onSelect: (date) => {
              child.props.onSelect(date);
              onClose();
            }
          });
        }
        return child;
      })}
    </div>
  );
};

// --- CUSTOM CALENDAR SHIM ---

const Calendar = ({ selected, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectDay = (day) => {
    onSelect(new Date(year, month, day));
  };

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = selected && 
      selected.getDate() === d && 
      selected.getMonth() === month && 
      selected.getFullYear() === year;
    const isToday = new Date().getDate() === d && 
      new Date().getMonth() === month && 
      new Date().getFullYear() === year;

    days.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => selectDay(d)}
        className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors hover:bg-white/10 ${
          isSelected ? "bg-[#C9B896] text-[#0D0D0D] hover:bg-[#C9B896]/90" : 
          isToday ? "border border-[#C9B896] text-[#C9B896]" : "text-white"
        }`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="p-3 bg-[#141414] border border-white/10 rounded-lg shadow-xl w-64 select-none">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1 hover:bg-white/10 rounded text-[#C9B896] text-xs font-bold">
          &lt;
        </button>
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#F0ECE2]">
          {monthNames[month]} {year}
        </span>
        <button type="button" onClick={nextMonth} className="p-1 hover:bg-white/10 rounded text-[#C9B896] text-xs font-bold">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-white/40 mb-2">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

const services = [
  "Wedding",
  "Portrait",
  "Event",
  "Brand / Commercial",
  "Videography",
];

export const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [service, setService] = useState("");
  const [date, setDate] = useState(null);

  // Frontend-only submit
  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email and message.");
      return;
    }

    console.log({
      ...form,
      service,
      date: date ? format(date, "yyyy-MM-dd") : null,
    });

    alert("Thank you! Your message has been submitted.");

    setForm({
      name: "",
      email: "",
      message: "",
    });

    setService("");
    setDate(null);
  };

  const inputCls =
    "w-full bg-transparent border-b border-white/25 py-3 text-[#F0ECE2] placeholder-white/40 focus:outline-none focus:border-[#C9B896] transition-colors font-manrope";

  return (
    <section
      id="contact"
      className="relative bg-[#0D0D0D] text-[#F0ECE2] px-4 md:px-12 py-28 md:py-40"
      data-testid="contact-section"
    >
      {/* =========================
          HEADING
      ========================== */}

      <div className="text-center mb-16">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C9B896] mb-3">
          Let&apos;s Create
        </p>

        <h2 className="font-syne font-extrabold uppercase leading-[0.85] text-5xl md:text-8xl">
          Get in Frame
        </h2>
      </div>

      {/* =========================
          CAMERA
      ========================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-15%",
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative max-w-3xl mx-auto"
        data-testid="camera-form"
      >
        {/* =========================
            CAMERA TOP PLATE
        ========================== */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            bg-[#1a1a1a]
            rounded-t-2xl
            px-6
            md:px-10
            py-4
            border
            border-white/10
            border-b-0
          "
        >
          {/* Camera branding */}

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#C9B896]" />

            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Vikas · EOS
            </span>
          </div>

          {/* Viewfinder hump */}

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              -top-5
              w-24
              h-6
              bg-[#1a1a1a]
              rounded-t-lg
              border
              border-white/10
              border-b-0
            "
          />

          {/* Flash detail */}

          <div className="w-10 h-4 rounded-sm bg-white/10" />
        </div>

        {/* =========================
            CAMERA BODY
        ========================== */}

        <div
          className="
            relative
            bg-[#141414]
            border
            border-white/10
            rounded-b-2xl
            px-6
            md:px-12
            py-12
            md:py-16
            grid
            md:grid-cols-[1fr_auto]
            gap-10
            items-center
          "
        >
          {/* =========================
              FORM
          ========================== */}

          <form
            id="contact-form"
            onSubmit={submit}
            className="space-y-6"
            data-testid="contact-form"
          >
            {/* NAME + EMAIL */}

            <div className="grid sm:grid-cols-2 gap-6">
              <input
                data-testid="contact-name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className={inputCls}
              />

              <input
                data-testid="contact-email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className={inputCls}
              />
            </div>

            {/* SERVICE + DATE */}

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Service */}

              <Select
                value={service}
                onValueChange={setService}
              >
                <SelectTrigger
                  data-testid="contact-service"
                  className="
                    bg-transparent
                    border-0
                    border-b
                    border-white/25
                    rounded-none
                    px-0
                    py-3
                    h-auto
                    text-[#F0ECE2]
                    focus:ring-0
                    focus:border-[#C9B896]
                  "
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>

                <SelectContent className="bg-[#1a1a1a] text-[#F0ECE2] border-white/10">
                  {services.map((serviceName) => (
                    <SelectItem
                      key={serviceName}
                      value={serviceName}
                    >
                      {serviceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Preferred date */}

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    data-testid="contact-date"
                    className={`
                      flex
                      items-center
                      justify-between
                      border-b
                      border-white/25
                      py-3
                      text-left
                      hover:border-[#C9B896]
                      transition-colors
                      ${date
                        ? "text-[#F0ECE2]"
                        : "text-white/40"
                      }
                    `}
                  >
                    <span>
                      {date
                        ? format(date, "PPP")
                        : "Preferred date"}
                    </span>

                    <CalendarIcon
                      size={16}
                      className="text-[#C9B896]"
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  className="
                    w-auto
                    p-0
                    bg-[#1a1a1a]
                    border-white/10
                  "
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="text-[#F0ECE2]"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* MESSAGE */}

            <textarea
              data-testid="contact-message"
              placeholder="Tell me about your project..."
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className={`${inputCls} resize-none`}
            />
          </form>

          {/* =========================
              CAMERA LENS / SUBMIT
          ========================== */}

          <div className="flex justify-center md:justify-end">
            <button
              type="submit"
              form="contact-form"
              data-testid="contact-submit"
              className="
                group
                relative
                grid
                place-items-center
                w-40
                h-40
                md:w-48
                md:h-48
                rounded-full
                cursor-pointer
              "
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, #2a2a2a 0%, #111 55%, #000 100%)",

                boxShadow:
                  "0 0 0 8px #1c1c1c, 0 0 0 10px #333, inset 0 0 30px rgba(0,0,0,0.9)",
              }}
            >
              {/* Outer lens ring */}

              <span
                className="
                  absolute
                  inset-4
                  rounded-full
                  border
                  border-[#C9B896]/30
                "
              />

              {/* Inner lens ring */}

              <span
                className="
                  absolute
                  inset-8
                  rounded-full
                  border
                  border-white/10
                "
              />

              {/* Aperture */}

              <Aperture
                size={44}
                strokeWidth={1}
                className="
                  text-[#C9B896]
                  group-hover:rotate-45
                  transition-transform
                  duration-500
                "
              />

              {/* Shoot label */}

              <span
                className="
                  absolute
                  bottom-8
                  flex
                  items-center
                  gap-1
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-[#F0ECE2]/80
                "
              >
                Shoot

                <Send size={11} />
              </span>
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;