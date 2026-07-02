"use client";

import { motion } from "framer-motion";

export function Need() {
  return (
    <section id="need" className="pin-section relative flex items-center px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-[2rem] p-8 md:p-12 max-w-lg"
      >
        <p className="eyebrow mb-4">راه‌حل قطعی</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight text-clinic-navy mb-6">
          چرا ایمپلنت، نه یک جایگزین موقت
        </h2>
        <p className="text-clinic-navy/70 leading-8 mb-8">
          پل‌های دندانی و پروتزهای متحرک، تنها ظاهر دندان را بازمی‌گردانند. ایمپلنت
          دندان با جایگزینی ریشه‌ی طبیعی، عملکرد جویدن، سلامت استخوان فک و اعتماد‌به‌نفس
          شما را به‌طور کامل احیا می‌کند.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "بدون آسیب به دندان‌های مجاور", v: "برخلاف بریج دندانی" },
            { k: "حفظ تراکم استخوان فک", v: "با تحریک طبیعی استخوان" },
            { k: "ماندگاری بلندمدت", v: "با نگهداری صحیح" },
            { k: "احساسی کاملاً طبیعی", v: "در جویدن و تکلم" },
          ].map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl bg-white/50 border border-white/60 p-4"
            >
              <p className="font-display font-semibold text-sm text-clinic-navy">{item.k}</p>
              <p className="text-xs text-clinic-navy/55 mt-1">{item.v}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
