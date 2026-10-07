import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowUp, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith("ar");

  const navigation = isArabic
    ? [
        { label: "الرئيسية", href: "/" },
        { label: "من نحن", href: "/about" },
        { label: "مشاريعنا", href: "/projects" },
        { label: "خدماتنا", href: "/services" },
        { label: "تواصل معنا", href: "/contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
      ];

  const projects = isArabic
    ? [
        "مقر الخطوط الجوية الكويتية",
        "مقر الحرس الوطني الكويتي",
        "برج البنك الوطني",
        "برج الراية",
      ]
    : [
        "Kuwait Airways HQ",
        "Kuwait National Guard",
        "NBK Headquarters",
        "Arraya Office Tower",
      ];

  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      {/* Architectural Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute -right-20 top-20 h-[600px] w-[600px] rounded-full border border-white/30" />
        <div className="absolute -right-8 top-48 h-[450px] w-[450px] rounded-full border border-white/20" />
        <div className="absolute bottom-0 left-[8%] h-[500px] w-px bg-white" />
        <div className="absolute bottom-0 left-[20%] h-[360px] w-px bg-white" />
        <div className="absolute bottom-0 left-[32%] h-[450px] w-px bg-white" />
      </div>

      {/* CTA */}

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.7fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-block">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/logo-white.png"
                  alt="El Waqt Al Nageh - Engineering & Construction"
                  className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div>
                  <div className="text-lg font-semibold tracking-wide">
                    EL WAQT AL NAGEH
                  </div>

                  <div className="mt-1 text-[9px] uppercase tracking-[0.35em] text-white/45">
                    Engineering & Construction
                  </div>
                </div>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
              {isArabic
                ? "خبرة تمتد لعقود في تنفيذ المشاريع الهندسية والإنشائية وصناعة المساحات التي تجمع بين الجودة والدقة والرؤية."
                : "Decades of experience delivering engineering and construction projects with precision, quality and vision."}
            </p>

            {/* Social */}
            <div className="mt-8 flex items-center gap-3">
              {["LinkedIn", "Instagram", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 items-center border border-white/15 px-4 text-[10px] uppercase tracking-wider text-white/55 transition-all duration-300 hover:border-white/50 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/40">
              {isArabic ? "استكشف" : "Explore"}
            </div>

            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Selected Projects */}
          <div>
            <div className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/40">
              {isArabic ? "مشاريع مختارة" : "Selected Projects"}
            </div>

            <div className="flex flex-col gap-4">
              {projects.map((project, index) => (
                <Link
                  key={project}
                  to="/projects"
                  className="group flex gap-3 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  <span className="text-[9px] text-white/25">0{index + 1}</span>

                  <span className="leading-5">{project}</span>

                  <ArrowUpRight
                    size={13}
                    className="mt-1 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/40">
              {isArabic ? "تواصل معنا" : "Get In Touch"}
            </div>

            <div className="flex flex-col gap-6">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group flex gap-4"
              >
                <MapPin
                  size={18}
                  strokeWidth={1.3}
                  className="mt-0.5 shrink-0 text-white/50 transition-colors group-hover:text-white"
                />

                <span className="text-sm leading-6 text-white/60 transition-colors group-hover:text-white">
                  {isArabic
                    ? "الكويت · المملكة العربية السعودية"
                    : "Kuwait · Saudi Arabia"}
                </span>
              </a>

              <a
                href="tel:+96500000000"
                className="group flex items-center gap-4"
              >
                <Phone
                  size={17}
                  strokeWidth={1.3}
                  className="text-white/50 transition-colors group-hover:text-white"
                />

                <span
                  className="text-sm text-white/60 transition-colors group-hover:text-white"
                  dir="ltr"
                >
                  +965 0000 0000
                </span>
              </a>

              <a
                href="mailto:info@example.com"
                className="group flex items-center gap-4"
              >
                <Mail
                  size={17}
                  strokeWidth={1.3}
                  className="text-white/50 transition-colors group-hover:text-white"
                />

                <span className="text-sm text-white/60 transition-colors group-hover:text-white">
                  info@example.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">
            © {new Date().getFullYear()} El Waqt Al Nageh.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-[10px] uppercase tracking-[0.12em] text-white/35 transition-colors hover:text-white"
            >
              {isArabic ? "الخصوصية" : "Privacy"}
            </Link>

            <Link
              to="/terms"
              className="text-[10px] uppercase tracking-[0.12em] text-white/35 transition-colors hover:text-white"
            >
              {isArabic ? "الشروط" : "Terms"}
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex h-9 w-9 items-center justify-center border border-white/20 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#010C4F]"
              aria-label="Back to top"
            >
              <ArrowUp
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
