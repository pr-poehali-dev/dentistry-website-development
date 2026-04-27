import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const CLINIC_IMG = "https://cdn.poehali.dev/projects/e9e0821a-a216-4c5b-bcc0-13b360996866/files/f88880fe-73c8-430f-9567-22f54c0f1090.jpg";

function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <p className="font-body text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "hsl(185 30% 35%)" }}>{label}</p>
      <h2 className="font-display text-4xl md:text-5xl font-light" style={{ color: "hsl(210 20% 15%)" }}>{title}</h2>
    </div>
  );
}

const NAV = [
  { id: "services", label: "Услуги" },
  { id: "doctors", label: "Врачи" },
  { id: "about", label: "О клинике" },
  { id: "prices", label: "Прайс" },
  { id: "promo", label: "Акции" },
  { id: "reviews", label: "Отзывы" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(185 30% 35%)" }}>
            <Icon name="Star" size={13} className="text-white" />
          </div>
          <span className="font-display text-xl font-semibold tracking-wide" style={{ color: "hsl(210 20% 15%)" }}>Дента</span>
        </button>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className="nav-link font-body">{n.label}</button>
          ))}
        </nav>
        <button onClick={() => go("contacts")} className="hidden lg:block text-sm px-5 py-2.5 rounded-full font-body font-medium transition-opacity hover:opacity-90" style={{ background: "hsl(185 30% 35%)", color: "white" }}>
          Записаться
        </button>
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t px-6 py-4 flex flex-col gap-3" style={{ borderColor: "hsl(36 15% 88%)" }}>
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className="text-left py-2 font-body text-sm" style={{ color: "hsl(210 15% 35%)" }}>{n.label}</button>
          ))}
          <button onClick={() => go("contacts")} className="mt-2 text-sm px-5 py-2.5 rounded-full font-body font-medium" style={{ background: "hsl(185 30% 35%)", color: "white" }}>Записаться</button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "hsl(36 20% 97%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
          <img src={CLINIC_IMG} alt="Клиника" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(36 20% 97%) 5%, transparent 60%)" }} />
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "hsl(185 30% 35%)" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-36">
        <p className="font-body text-sm tracking-[0.15em] uppercase mb-4" style={{ color: "hsl(185 30% 35%)" }}>Стоматологическая клиника</p>
        <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.1] mb-6" style={{ color: "hsl(210 20% 15%)" }}>
          Ваша улыбка —<br />
          <em className="not-italic" style={{ color: "hsl(185 30% 35%)" }}>наша забота</em>
        </h1>
        <p className="font-body text-lg md:text-xl max-w-lg mb-10 leading-relaxed" style={{ color: "hsl(210 10% 45%)" }}>
          Современное оборудование, опытные врачи и бережный подход. Лечение без страха и боли.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3.5 rounded-full font-body font-medium text-base hover:opacity-90 transition-opacity" style={{ background: "hsl(185 30% 35%)", color: "white" }}>
            Записаться на приём
          </button>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3.5 rounded-full font-body font-medium text-base border transition-all hover:bg-white" style={{ borderColor: "hsl(185 30% 35%)", color: "hsl(185 30% 35%)" }}>
            Наши услуги
          </button>
        </div>
        <div className="flex flex-wrap gap-12 mt-16">
          {[["15+", "лет на рынке"], ["8 000+", "довольных пациентов"], ["12", "специалистов"]].map(([n, l]) => (
            <div key={n}>
              <p className="font-display text-4xl font-light" style={{ color: "hsl(185 30% 35%)" }}>{n}</p>
              <p className="font-body text-sm mt-1" style={{ color: "hsl(210 10% 50%)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: "Shield", title: "Профилактика", desc: "Профессиональная чистка, снятие налёта и камня, фторирование эмали" },
  { icon: "Zap", title: "Лечение кариеса", desc: "Современные материалы, безболезненное лечение любой сложности" },
  { icon: "Smile", title: "Эстетическая стоматология", desc: "Виниры, отбеливание, реставрация — красота вашей улыбки" },
  { icon: "Wrench", title: "Протезирование", desc: "Коронки, мосты, съёмные протезы — восстановление функции и эстетики" },
  { icon: "Plus", title: "Имплантация", desc: "Установка имплантов мировых брендов с гарантией на 10 лет" },
  { icon: "Heart", title: "Детская стоматология", desc: "Бережное лечение зубов для детей с 2 лет в игровой форме" },
];

function Services() {
  const ref = useFadeIn();
  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(0 0% 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Услуги" title="Полный спектр стоматологической помощи" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((s, i) => (
            <div key={i} className="group p-8 rounded-2xl border hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default" style={{ borderColor: "hsl(36 15% 88%)", background: "hsl(36 20% 97%)" }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5" style={{ background: "hsl(185 25% 90%)" }}>
                <Icon name={s.icon} size={20} style={{ color: "hsl(185 30% 35%)" }} />
              </div>
              <h3 className="font-display text-xl font-medium mb-2" style={{ color: "hsl(210 20% 15%)" }}>{s.title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "hsl(210 10% 50%)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DOCTORS = [
  { name: "Елена Соколова", role: "Главный врач, терапевт", exp: "18 лет опыта", photo: "👩‍⚕️" },
  { name: "Андрей Петров", role: "Хирург-имплантолог", exp: "12 лет опыта", photo: "👨‍⚕️" },
  { name: "Мария Ковалёва", role: "Ортодонт", exp: "10 лет опыта", photo: "👩‍⚕️" },
  { name: "Дмитрий Новиков", role: "Детский стоматолог", exp: "8 лет опыта", photo: "👨‍⚕️" },
];

function Doctors() {
  const ref = useFadeIn();
  return (
    <section id="doctors" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(36 20% 97%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Врачи" title="Команда профессионалов" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {DOCTORS.map((d, i) => (
            <div key={i} className="text-center group">
              <div className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full flex items-center justify-center text-5xl mb-5 group-hover:scale-105 transition-transform duration-300" style={{ background: "hsl(185 25% 90%)" }}>
                {d.photo}
              </div>
              <h3 className="font-display text-lg font-medium" style={{ color: "hsl(210 20% 15%)" }}>{d.name}</h3>
              <p className="font-body text-sm mt-1" style={{ color: "hsl(185 30% 35%)" }}>{d.role}</p>
              <p className="font-body text-xs mt-0.5" style={{ color: "hsl(210 10% 60%)" }}>{d.exp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useFadeIn();
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(0 0% 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.12em] uppercase mb-4" style={{ color: "hsl(185 30% 35%)" }}>О клинике</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6" style={{ color: "hsl(210 20% 15%)" }}>
              Более 15 лет дарим<br />здоровые улыбки
            </h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "hsl(210 10% 45%)" }}>
              Наша клиника была основана в 2009 году с единственной целью — сделать качественную стоматологию доступной и комфортной для каждого пациента.
            </p>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "hsl(210 10% 45%)" }}>
              Мы постоянно инвестируем в современное оборудование и создание уютной атмосферы, чтобы визит к стоматологу перестал быть поводом для тревоги.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[["Современное оборудование", "Shield"], ["Безболезненное лечение", "Heart"], ["Гарантия на работы", "Award"], ["Удобное расписание", "Clock"]].map(([text, icon]) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon} size={18} style={{ color: "hsl(185 30% 35%)" }} />
                  <span className="font-body text-sm" style={{ color: "hsl(210 15% 30%)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={CLINIC_IMG} alt="Клиника" className="w-full rounded-2xl object-cover h-96 lg:h-[480px]" />
            <div className="absolute -bottom-5 -left-5 rounded-xl p-5 shadow-lg" style={{ background: "white", border: "1px solid hsl(36 15% 88%)" }}>
              <p className="font-display text-3xl font-light" style={{ color: "hsl(185 30% 35%)" }}>4.9 ★</p>
              <p className="font-body text-xs mt-1" style={{ color: "hsl(210 10% 50%)" }}>Средний рейтинг<br />по 500+ отзывам</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRICES = [
  { cat: "Профилактика", items: [["Консультация врача", "Бесплатно"], ["Профессиональная чистка Air Flow", "от 3 500 ₽"], ["Снятие зубного камня", "от 2 000 ₽"], ["Фторирование эмали", "от 1 500 ₽"]] },
  { cat: "Лечение", items: [["Лечение кариеса (1 поверхность)", "от 3 500 ₽"], ["Лечение пульпита", "от 6 000 ₽"], ["Удаление зуба простое", "от 2 500 ₽"], ["Анестезия", "от 500 ₽"]] },
  { cat: "Эстетика", items: [["Отбеливание (система)", "от 15 000 ₽"], ["Винир (1 зуб)", "от 18 000 ₽"], ["Реставрация скола", "от 4 500 ₽"], ["Художественная реставрация", "от 8 000 ₽"]] },
];

function Prices() {
  const ref = useFadeIn();
  return (
    <section id="prices" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(36 20% 97%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Прайс" title="Прозрачные цены без скрытых платежей" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {PRICES.map((cat) => (
            <div key={cat.cat} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid hsl(36 15% 88%)" }}>
              <div className="px-6 py-4" style={{ background: "hsl(185 25% 90%)" }}>
                <h3 className="font-display text-lg font-medium" style={{ color: "hsl(185 30% 25%)" }}>{cat.cat}</h3>
              </div>
              <div className="px-6 py-2">
                {cat.items.map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid hsl(36 15% 93%)" }}>
                    <span className="font-body text-sm" style={{ color: "hsl(210 15% 35%)" }}>{name}</span>
                    <span className="font-body text-sm font-medium ml-4 whitespace-nowrap" style={{ color: "hsl(185 30% 35%)" }}>{price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-body text-sm mt-8" style={{ color: "hsl(210 10% 55%)" }}>
          Окончательная стоимость определяется после консультации врача
        </p>
      </div>
    </section>
  );
}

const PROMOS = [
  { tag: "Новым пациентам", title: "Консультация бесплатно", desc: "Первичный осмотр, составление плана лечения и снимок — без оплаты для новых пациентов", badge: "0 ₽" },
  { tag: "До 31 мая", title: "Чистка + Отбеливание", desc: "Профессиональная чистка Air Flow + домашнее отбеливание по специальной цене пакета", badge: "−30%" },
  { tag: "Для семей", title: "Семейная карта", desc: "Скидка 15% на все услуги для членов семьи, зарегистрированных в нашей клинике", badge: "−15%" },
];

function Promo() {
  const ref = useFadeIn();
  return (
    <section id="promo" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(0 0% 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Акции" title="Специальные предложения" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {PROMOS.map((p, i) => (
            <div key={i} className="rounded-2xl p-8 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300" style={{ background: "hsl(185 25% 90%)" }}>
              <span className="absolute top-6 right-6 font-display text-2xl font-semibold" style={{ color: "hsl(185 30% 35%)" }}>{p.badge}</span>
              <span className="font-body text-xs tracking-widest uppercase mb-3 inline-block" style={{ color: "hsl(185 30% 45%)" }}>{p.tag}</span>
              <h3 className="font-display text-2xl font-medium mb-3" style={{ color: "hsl(210 20% 15%)" }}>{p.title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "hsl(210 15% 40%)" }}>{p.desc}</p>
              <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="mt-6 font-body text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: "hsl(185 30% 35%)" }}>
                Узнать подробнее →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Анна К.", stars: 5, text: "Впервые не боялась идти к стоматологу! Врач объяснил каждый шаг, всё прошло безболезненно. Результат превзошёл ожидания." },
  { name: "Михаил Т.", stars: 5, text: "Сделали имплант — профессионально и в срок. Прошло полгода, всё отлично. Рекомендую Андрея Петрова — настоящий мастер." },
  { name: "Светлана Р.", stars: 5, text: "Привожу сюда всю семью включая ребёнка 5 лет. Дмитрий умеет найти подход к детям, сын уходит довольный." },
  { name: "Игорь В.", stars: 5, text: "Сделал виниры — не нарадуюсь! Улыбаюсь теперь не стесняясь. Цена справедливая за такое качество работы." },
  { name: "Ольга М.", stars: 5, text: "Современная клиника, внимательный персонал, удобная запись. Наконец-то нашла своего стоматолога — больше никуда не хожу." },
  { name: "Роман С.", stars: 4, text: "Хорошая клиника, делал чистку — результат отличный. Немного ждал по записи, но в целом всё понравилось. Вернусь снова." },
];

function Reviews() {
  const ref = useFadeIn();
  return (
    <section id="reviews" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(36 20% 97%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Отзывы" title="Что говорят наши пациенты" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-2xl p-7" style={{ background: "white", border: "1px solid hsl(36 15% 88%)" }}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} style={{ color: "hsl(40 90% 55%)" }}>★</span>
                ))}
              </div>
              <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "hsl(210 15% 35%)" }}>"{r.text}"</p>
              <p className="font-body text-sm font-medium" style={{ color: "hsl(185 30% 35%)" }}>{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Больно ли лечить зубы?", a: "Мы используем современную анестезию, которая делает лечение полностью безболезненным. Большинство пациентов не чувствуют боли в процессе процедуры." },
  { q: "Какая анестезия используется?", a: "Применяем проверенные препараты Ultracain и Septanest. Перед инъекцией наносим аппликационный анестетик, чтобы укол тоже был безболезненным." },
  { q: "Что делать после удаления зуба?", a: "В течение 2 часов не есть, 3 дня не пить горячее и не полоскать рот интенсивно. Можно прикладывать холод. При сильной боли — принять ибупрофен." },
  { q: "Как подготовиться к первому визиту?", a: "Специальной подготовки не нужно. Возьмите паспорт и, если есть, предыдущие снимки. Консультация первичная — бесплатно." },
  { q: "Как долго заживает место после имплантации?", a: "Первичное заживление — 3-5 дней. Полная интеграция импланта занимает 2-4 месяца. В этот период устанавливается временная коронка." },
  { q: "Можно ли лечить зубы во время беременности?", a: "Да, лечить можно и нужно, особенно во 2 триместре. Используем безопасную анестезию. Плановое отбеливание лучше перенести на после родов." },
];

function FAQ() {
  const ref = useFadeIn();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(0 0% 100%)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle label="FAQ" title="Часто задаваемые вопросы" />
        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-colors duration-200" style={{ border: "1px solid hsl(36 15% 88%)", background: open === i ? "hsl(185 25% 90%)" : "hsl(36 20% 97%)" }}>
              <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-body text-sm font-medium pr-4" style={{ color: "hsl(210 20% 15%)" }}>{f.q}</span>
                <Icon name={open === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: "hsl(185 30% 35%)", flexShrink: 0 }} />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="font-body text-sm leading-relaxed" style={{ color: "hsl(210 15% 40%)" }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const ref = useFadeIn();
  return (
    <section id="contacts" ref={ref as React.RefObject<HTMLElement>} className="section-fade py-24" style={{ background: "hsl(36 20% 97%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Контакты" title="Приходите или оставьте заявку" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">
          <div className="space-y-8">
            {[
              { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Садовая, д. 12, офис 201" },
              { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
              { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 21:00\nСб–Вс: 10:00 – 18:00" },
              { icon: "Mail", label: "Email", value: "info@denta-clinic.ru" },
            ].map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(185 25% 90%)" }}>
                  <Icon name={c.icon} size={18} style={{ color: "hsl(185 30% 35%)" }} />
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider mb-0.5" style={{ color: "hsl(210 10% 55%)" }}>{c.label}</p>
                  <p className="font-body text-sm whitespace-pre-line" style={{ color: "hsl(210 20% 20%)" }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8" style={{ background: "white", border: "1px solid hsl(36 15% 88%)" }}>
            <h3 className="font-display text-2xl font-medium mb-6" style={{ color: "hsl(210 20% 15%)" }}>Записаться на приём</h3>
            <div className="space-y-4">
              <div>
                <label className="font-body text-xs uppercase tracking-wider block mb-1.5" style={{ color: "hsl(210 10% 55%)" }}>Ваше имя</label>
                <input type="text" placeholder="Иван Иванов" className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none" style={{ border: "1px solid hsl(36 15% 85%)", background: "hsl(36 20% 97%)", color: "hsl(210 20% 20%)" }} />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider block mb-1.5" style={{ color: "hsl(210 10% 55%)" }}>Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none" style={{ border: "1px solid hsl(36 15% 85%)", background: "hsl(36 20% 97%)", color: "hsl(210 20% 20%)" }} />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider block mb-1.5" style={{ color: "hsl(210 10% 55%)" }}>Услуга</label>
                <select className="w-full px-4 py-3 rounded-lg font-body text-sm outline-none appearance-none" style={{ border: "1px solid hsl(36 15% 85%)", background: "hsl(36 20% 97%)", color: "hsl(210 15% 40%)" }}>
                  <option value="">Выберите услугу</option>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <button className="w-full py-3.5 rounded-lg font-body text-sm font-medium hover:opacity-90 transition-opacity mt-2" style={{ background: "hsl(185 30% 35%)", color: "white" }}>
                Отправить заявку
              </button>
              <p className="font-body text-xs text-center" style={{ color: "hsl(210 10% 60%)" }}>
                Мы позвоним в течение 30 минут в рабочее время
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10" style={{ background: "hsl(210 20% 15%)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(185 30% 35%)" }}>
            <Icon name="Star" size={12} className="text-white" />
          </div>
          <span className="font-display text-lg" style={{ color: "hsl(36 20% 90%)" }}>Дента</span>
        </div>
        <p className="font-body text-xs" style={{ color: "hsl(210 10% 50%)" }}>
          © 2024 Дента. Все права защищены. Лицензия № ЛО-77-01-019999
        </p>
        <div className="flex gap-6">
          {["Политика конфиденциальности", "Правовая информация"].map((t) => (
            <button key={t} className="font-body text-xs hover:opacity-80 transition-opacity" style={{ color: "hsl(210 10% 50%)" }}>{t}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Doctors />
      <About />
      <Prices />
      <Promo />
      <Reviews />
      <FAQ />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;
