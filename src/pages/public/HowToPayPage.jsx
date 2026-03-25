import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, Globe, CheckCircle, Info } from 'lucide-react';

const HowToPayPage = () => {
  const methods = [
    {
      title: "Bank Transfer",
      icon: <Landmark size={24} />,
      details: "Official bank account details are provided in the acceptance letter. Please ensure the Manuscript ID is included in the transfer description.",
      color: "bg-blue-50 text-blue-700"
    },
    {
      title: "Online Payment Platforms",
      icon: <CreditCard size={24} />,
      details: "Use the 'Payment' link in your Author Dashboard to pay via Paystack or Flutterwave. This supports local and international cards.",
      color: "bg-accent-50 text-accent-700"
    },
    {
      title: "International Transfers",
      icon: <Globe size={24} />,
      details: "For international authors, SWIFT/IBAN details are available. Conversion rates are calculated based on the day of transaction.",
      color: "bg-emerald-50 text-emerald-700"
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-20 pb-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-serif font-bold text-brand-900 mb-6">How to Pay APC</h1>
            <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Article Processing Charges (APC) are only required after a manuscript has been formally accepted for publication.
            </p>
          </motion.div>
        </header>

        <div className="space-y-8 mb-16">
          {methods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50 flex flex-col md:flex-row gap-8 items-start hover:border-brand-200 transition-all"
            >
              <div className={`${method.color} p-5 rounded-2xl shadow-inner`}>
                {method.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-serif font-bold text-brand-900 mb-3">{method.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{method.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-brand-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 opacity-10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
              <CheckCircle className="mr-3 text-accent-500" size={28} /> Important Notice
            </h2>
            <div className="space-y-4 text-brand-100 text-sm leading-relaxed">
              <p>• Detailed payment instructions, including account numbers, will be sent automatically upon manuscript acceptance.</p>
              <p>• Always quote your <strong>Manuscript ID</strong> in all financial correspondences.</p>
              <p>• Scanned copies of payment receipts should be uploaded via the portal or sent to the editorial office email.</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center justify-center space-x-2 text-xs text-neutral-400 font-bold uppercase tracking-widest">
            <Info size={14} className="text-accent-500" />
            <span>Payments ensure high-quality open-access propagation.</span>
        </div>
      </div>
    </div>
  );
};

export default HowToPayPage;
