"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Button3D } from "../ui/Button3D";

export function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 8) return;
    // In production: wire this up to your booking API / CRM here.
    setSubmitted(true);
  };

  return (
    <section id="cta" className="pin-section relative flex items-center justify-center px-6 md:px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-[2.5rem] p-8 md:p-14 max-w-lg w-full text-center"
      >
        <p className="eyebrow mb-4">شروع مسیر درمان</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-clinic-navy leading-tight mb-4">
          نوبت مشاوره‌ی رایگان خود را رزرو کنید
        </h2>
        <p className="text-clinic-navy/60 leading-7 mb-9 max-w-sm mx-auto">
          کارشناسان ما ظرف کمتر از ۲۴ ساعت با شما تماس می‌گیرند تا زمان مشاوره را
          هماهنگ کنند.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-clinic-teal/10 border border-clinic-teal/30 p-6"
          >
            <p className="font-display font-semibold text-clinic-teal">
              درخواست شما ثبت شد
            </p>
            <p className="text-sm text-clinic-navy/60 mt-2">
              به‌زودی همکاران ما با شماره‌ی {phone} تماس خواهند گرفت.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <div>
              <label className="block text-xs text-clinic-navy/60 mb-2 pr-1">نام و نام خانوادگی</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="مثلاً سارا محمدی"
                className="w-full rounded-xl bg-white/70 border border-clinic-navy/10 px-4 py-3.5 text-sm
                           text-clinic-navy placeholder:text-clinic-navy/35 outline-none focus:border-clinic-teal
                           transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-clinic-navy/60 mb-2 pr-1">شماره تماس</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                inputMode="numeric"
                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                className="w-full rounded-xl bg-white/70 border border-clinic-navy/10 px-4 py-3.5 text-sm
                           text-clinic-navy placeholder:text-clinic-navy/35 outline-none focus:border-clinic-teal
                           transition-colors"
                required
              />
            </div>

            <div className="pt-2 flex justify-center">
              <Button3D variant="primary" className="w-full justify-center">
                رزرو مشاوره رایگان
              </Button3D>
            </div>
          </form>
        )}

        <p className="text-[11px] text-clinic-navy/40 mt-8">
          اطلاعات شما محرمانه باقی می‌ماند و تنها برای هماهنگی نوبت استفاده می‌شود.
        </p>
      </motion.div>
    </section>
  );
}
