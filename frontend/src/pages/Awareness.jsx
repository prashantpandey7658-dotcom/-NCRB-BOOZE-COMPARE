import React from 'react';
import {
  ShieldCheck,
  HeartPulse,
  Scale,
  PhoneCall,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function Awareness() {
  const legalAges = [
    { state: 'Delhi (NCT)', age: '25 Years', law: 'Delhi Excise Act, 2009', status: 'Strictly Enforced' },
    { state: 'Haryana (Gurugram / Faridabad)', age: '25 Years (Beer/Wine 21)', law: 'Haryana Excise Act', status: 'Enforced' },
    { state: 'Uttar Pradesh (Noida / Ghaziabad)', age: '21 Years', law: 'United Provinces Excise Act, 1910', status: 'Enforced' },
    { state: 'Punjab & Chandigarh', age: '25 Years', law: 'Punjab Excise Act, 1914', status: 'Strictly Enforced' },
    { state: 'Goa & Karnataka', age: '21 / 18 Years', law: 'State Excise Regulations', status: 'Regional Policy' },
  ];

  const helplines = [
    {
      name: 'National Tele-MANAS Helpline',
      number: '14416 / 1800-891-4416',
      desc: 'Free 24x7 Government of India mental health and tele-counseling service.',
    },
    {
      name: 'KIRAN Mental Health & De-Addiction Helpline',
      number: '1800-599-0019',
      desc: 'Toll-free 24/7 national helpline operated by Ministry of Social Justice & Empowerment.',
    },
    {
      name: 'National Emergency Service (India)',
      number: '112',
      desc: 'Unified emergency number for medical, police, and roadside emergencies.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Statutory Compliance & Public Health</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Legal Framework & Responsible Consumption
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          The <strong>NCRB BOOZE COMPARE</strong> platform benchmarks state excise reference data and advocates strict adherence to Indian excise laws, responsible consumption, and zero tolerance for underage drinking or drunk driving.
        </p>
      </div>

      {/* Statutory Regulatory Notice */}
      <div className="p-6 rounded-2xl bg-lounge-850 border border-amber-500/30 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <ShieldAlert className="w-8 h-8 text-amber-400 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-white text-base">Statutory Notice & Age Verification</h3>
          <p className="text-xs text-amber-300/90 mt-1 leading-relaxed">
            Alcoholic beverages are regulated under respective State Excise Acts. Sale or supply to individuals below the Minimum Legal Drinking Age (MLDA) is strictly prohibited and subject to legal penalties under Indian law. Please drink responsibly and never drink and drive.
          </p>
        </div>
      </div>

      {/* Legal Drinking Age (MLDA) in NCR & India */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Minimum Legal Drinking Age (MLDA) Across NCR</h2>
        </div>
        <p className="text-xs text-stone-400">
          In India, liquor regulation is governed by individual State Excise Acts under the Seventh Schedule of the Constitution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalAges.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-lounge-850 border border-lounge-750 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-400 block">{item.state}</span>
                <span className="text-2xl font-black text-white mt-1 block">{item.age}</span>
                <p className="text-xs text-stone-400 mt-2">{item.law}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-lounge-750 flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-medium">{item.status}</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Impacts & Harm Prevention */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-rose-400" />
          <h2 className="text-xl font-bold text-white">Health Impacts & Harm Prevention</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-lounge-850 border border-lounge-750">
            <h3 className="font-bold text-white text-base mb-2">Hepatic & Metabolic Health</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              The human liver metabolizes ethanol into acetaldehyde, a toxic intermediate. Prolonged or binge intake is associated with metabolic stress, fatty liver changes, and long-term hepatic complications.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-lounge-850 border border-lounge-750">
            <h3 className="font-bold text-white text-base mb-2">Cardiovascular & Nervous System</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Ethanol acts as a central nervous system depressant. It impairs reaction time, coordination, and judgment. Excessive intake can elevate blood pressure and compromise restful sleep architecture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-lounge-850 border border-lounge-750">
            <h3 className="font-bold text-white text-base mb-2">Zero-Tolerance Road Safety</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Under Section 185 of the Motor Vehicles Act (India), operating any motor vehicle with blood alcohol content (BAC) exceeding 30 mg per 100 ml results in immediate license suspension, substantial fines, and potential imprisonment.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Counseling & Support Helplines */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">National Support & Counseling Helplines (India)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {helplines.map((h, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-lounge-850 border border-emerald-500/20 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">{h.name}</h3>
                <span className="text-lg font-black text-emerald-400 mt-2 block font-mono">
                  {h.number}
                </span>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{h.desc}</p>
              </div>
              <span className="mt-4 pt-3 border-t border-lounge-750 text-[10px] text-emerald-400 uppercase font-semibold">
                Toll-Free & Confidential
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
