"use client";

import { motion } from "framer-motion";

const SYMPTOMS = [
  { title: "پوسیدگی پیشرفته", desc: "تخریب ساختار مینا و عاج که با درمان‌های سطحی قابل جبران نیست." },
  { title: "درد و حساسیت مزمن", desc: "واکنش شدید به سرما، گرما یا فشار هنگام جویدن." },
  { title: "لقی و از دست رفتن استخوان", desc: "کاهش تدریجی تراکم استخوان فک در غیاب ریشه‌ی طبیعی دندان." },
];

export function Problem() {
  return (
    <section id="problem" className="pin-section relative flex items-center justify-end px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.5, once: false }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-[2rem] p-8 md:p-12 max-w-lg text-right"
      >
        <p className="eyebrow mb-4">وضعیت واقعی</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight text-clinic-navy mb-6">
          وقتی پوسیدگی از کنترل خارج می‌شود
        </h2>
        <p className="text-clinic-navy/70 leading-8 mb-8">
          بسیاری از مراجعه‌کنندگان دیر به این نتیجه می‌رسند که دندان آسیب‌دیده دیگر قابل
          ترمیم نیست. تشخیص به‌موقع، تفاوت میان یک درمان ساده و یک جراحی پیچیده است.
        </p>

        <div className="space-y-5">
          {SYMPTOMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex items-start gap-4 border-t border-clinic-navy/10 pt-5"
            >
              <span className="mt-1 w-2 h-2 rounded-full bg-clinic-coral shrink-0" />
              <div>
                <p className="font-display font-semibold text-clinic-navy">{item.title}</p>
                <p className="text-sm text-clinic-navy/60 mt-1 leading-6">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
