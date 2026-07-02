"use client";

import { motion } from "framer-motion";

export function Result() {
  return (
    <section id="result" className="pin-section relative flex flex-col items-center justify-center px-6 md:px-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="eyebrow mb-4"
      >
        نتیجه‌ی نهایی
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-extrabold text-4xl md:text-6xl leading-tight text-clinic-navy max-w-3xl"
      >
        لبخندی سالم، واقعی و پایدار
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-6 text-clinic-navy/70 leading-8 max-w-xl"
      >
        بدون درد، بدون محدودیت در جویدن، و بدون نگرانی از تغییر رنگ یا شکل. ایمپلنت
        نهایی از نظر ظاهر، احساس و عملکرد، غیرقابل‌تشخیص از دندان طبیعی شماست.
      </motion.p>

      <div className="mt-14 grid grid-cols-2 gap-4 md:gap-8 w-full max-w-xl">
        {[
          { label: "پیش از درمان", tone: "text-clinic-navy/50", border: "border-clinic-navy/10" },
          { label: "پس از ایمپلنت", tone: "text-clinic-teal", border: "border-clinic-teal/30" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className={`glass-panel rounded-2xl p-6 border ${card.border}`}
          >
            <p className={`font-display font-semibold ${card.tone}`}>{card.label}</p>
            <p className="text-xs text-clinic-navy/50 mt-2 leading-6">
              {i === 0
                ? "دندان آسیب‌دیده، درد مزمن، محدودیت در جویدن"
                : "عملکرد کامل، ظاهر طبیعی، اطمینان بلندمدت"}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
