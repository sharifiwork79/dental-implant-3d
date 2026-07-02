"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "۰۱", title: "تصویربرداری و طراحی دیجیتال", desc: "اسکن سه‌بعدی فک و طراحی دقیق مسیر کاشت با نرم‌افزار تخصصی." },
  { n: "۰۲", title: "قرارگیری ایمپلنت تیتانیومی", desc: "کاشت ریشه‌ی مصنوعی در استخوان فک، تحت بی‌حسی موضعی و بدون درد." },
  { n: "۰۳", title: "دوره‌ی استئواینتگریشن", desc: "جوش‌خوردن طبیعی استخوان با سطح ایمپلنت طی چند هفته." },
  { n: "۰۴", title: "نصب کراون نهایی", desc: "تحویل روکش سرامیکی متناسب با رنگ و فرم دندان‌های طبیعی شما." },
];

export function Process() {
  return (
    <section id="process" className="pin-section relative flex items-center justify-end px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-[2rem] p-8 md:p-12 max-w-lg text-right"
      >
        <p className="eyebrow mb-4">فرآیند درمان</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight text-clinic-navy mb-8">
          از تشخیص تا لبخند نهایی
        </h2>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex items-start gap-4"
            >
              <span className="font-display font-bold text-2xl text-clinic-teal/40 shrink-0 w-12">
                {step.n}
              </span>
              <div className="border-r border-clinic-navy/10 pr-4">
                <p className="font-display font-semibold text-clinic-navy">{step.title}</p>
                <p className="text-sm text-clinic-navy/60 mt-1 leading-6">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
