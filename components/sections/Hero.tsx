"use client";

import { motion } from "framer-motion";
import { Button3D } from "../ui/Button3D";

export function Hero() {
  return (
    <section id="hero" className="pin-section relative flex items-center px-6 md:px-16">
      <div className="max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          کلینیک تخصصی ایمپلنت دندان آرکا
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-4xl md:text-6xl leading-[1.25] tracking-tightest text-clinic-navy"
        >
          ایمپلنت دندان با
          <br />
          <span className="text-clinic-teal">دقت، زیبایی</span> و ماندگاری
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 text-base md:text-lg text-clinic-navy/70 leading-8 max-w-md"
        >
          یک تجربه‌ی درمانی متفاوت؛ از تصویربرداری سه‌بعدی دقیق تا کاشت ایمپلنت با
          استانداردهای بین‌المللی، برای لبخندی که برای سال‌های سال با شماست.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button3D variant="primary">رزرو مشاوره رایگان</Button3D>
          <Button3D variant="secondary">مشاهده فرآیند درمان</Button3D>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 flex items-center gap-8 text-clinic-navy/60 text-sm"
        >
          <div>
            <p className="font-display font-bold text-2xl text-clinic-navy">+۱۲</p>
            <p>سال تجربه بالینی</p>
          </div>
          <div className="w-px h-10 bg-clinic-navy/15" />
          <div>
            <p className="font-display font-bold text-2xl text-clinic-navy">+۴۸۰۰</p>
            <p>ایمپلنت موفق</p>
          </div>
          <div className="w-px h-10 bg-clinic-navy/15" />
          <div>
            <p className="font-display font-bold text-2xl text-clinic-navy">۹۸٪</p>
            <p>رضایت بیماران</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="hidden md:flex absolute bottom-10 inset-x-0 justify-center flex-col items-center gap-2 text-clinic-navy/50 text-xs"
      >
        <span>برای شروع سفر درمانی پیمایش کنید</span>
        <span className="w-px h-8 bg-clinic-navy/30 animate-float" />
      </motion.div>
    </section>
  );
}
