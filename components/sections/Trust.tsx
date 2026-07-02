"use client";

import { motion } from "framer-motion";

const FEATURES = [
  { title: "تیم متخصص فوق‌تخصص ایمپلنت", desc: "دوره‌دیده در مراکز معتبر بین‌المللی با سال‌ها تجربه‌ی بالینی." },
  { title: "تصویربرداری CBCT اختصاصی", desc: "طراحی درمان بر پایه‌ی داده‌های سه‌بعدی دقیق، نه حدس و تجربه‌ی چشمی." },
  { title: "گارانتی کتبی درمان", desc: "تعهد شفاف نسبت به کیفیت متریال و ماندگاری نتیجه‌ی درمان." },
];

export function Trust() {
  return (
    <section id="trust" className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-24">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="eyebrow mb-4"
      >
        چرا کلینیک آرکا
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display font-extrabold text-3xl md:text-5xl text-clinic-navy text-center max-w-2xl"
      >
        اعتماد، ساخته‌شده بر تخصص و شفافیت
      </motion.h2>

      <div className="mt-16 grid md:grid-cols-3 gap-5 w-full max-w-5xl">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="glass-panel rounded-2xl p-7"
          >
            <div className="w-10 h-10 rounded-full bg-clinic-teal/10 flex items-center justify-center mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-clinic-teal" />
            </div>
            <p className="font-display font-semibold text-clinic-navy mb-2">{f.title}</p>
            <p className="text-sm text-clinic-navy/60 leading-6">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="glass-panel-dark text-clinic-bone rounded-[2rem] mt-16 p-10 max-w-2xl text-center"
      >
        <p className="leading-8 text-clinic-bone/90">
          «از لحظه‌ی مشاوره تا نصب کراون نهایی، تیم کلینیک آرکا هر مرحله را با
          دقتی که کمتر جایی دیده بودم برایم توضیح داد. نتیجه، فراتر از انتظارم بود.»
        </p>
        <p className="mt-4 text-sm text-clinic-teal-bright font-display font-semibold">
          یکی از بیماران کلینیک آرکا
        </p>
      </motion.blockquote>
    </section>
  );
}
