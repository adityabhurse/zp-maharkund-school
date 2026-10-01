import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AdmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionFormModal: React.FC<AdmissionFormModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const printRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Container */}
      <div className="bg-white text-black w-full max-w-3xl rounded-2xl neo-border neo-shadow-lg p-4 sm:p-8 max-h-[92vh] flex flex-col relative my-auto">
        {/* Modal Actions Bar (hidden in print) */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#006b5c]">description</span>
            <h2 className="font-black text-lg sm:text-xl">
              {lang === 'mr' ? 'शासकीय प्रवेश अर्ज २०२६-२७ (मुद्रण प्रत)' : 'Official Admission Form 2026-27 (Printable)'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#00c2a8] text-white neo-border-sm px-4 py-2 rounded-xl font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>{lang === 'mr' ? 'प्रिंट करा / PDF सेव्ह करा' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="bg-[#ffe16e] text-black neo-border-sm p-2 rounded-xl font-black hover:bg-slate-200 transition-all"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>

        {/* Printable Form Sheet Area */}
        <div ref={printRef} className="overflow-y-auto pr-1 space-y-6 text-xs sm:text-sm font-sans print:overflow-visible print:p-0">
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-4 space-y-1">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
              महाराष्ट्र शासन | Zilla Parishad Nagpur — Education Department
            </p>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              जिल्हा परिषद प्राथमिक शाळा, महारकुंड
            </h1>
            <p className="text-xs font-bold text-slate-800">
              पंचायत समिती सावनेर, जिल्हा नागपूर (महाराष्ट्र)
            </p>
            <div className="flex justify-center gap-4 text-xs font-black pt-1">
              <span className="bg-slate-100 border border-black px-2 py-0.5 rounded">
                शासकीय युडायस (UDISE): <strong>27090411101</strong>
              </span>
              <span className="bg-slate-100 border border-black px-2 py-0.5 rounded">
                माध्यम: मराठी | इयत्ता: १ ली ते ५ वी
              </span>
              <span className="bg-slate-100 border border-black px-2 py-0.5 rounded">
                शैक्षणिक वर्ष: <strong>२०२६-२७</strong>
              </span>
            </div>
            <div className="pt-2">
              <span className="inline-block border-2 border-black px-4 py-1 font-black text-sm uppercase bg-[#ffe16e]">
                विद्यार्थी प्रवेश अर्ज / Student Admission Application Form
              </span>
            </div>
          </div>

          {/* Form Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
            {/* Left 3 cols: Info fields */}
            <div className="sm:col-span-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-black text-[11px] block">प्रवेश घेऊ इच्छिणारा वर्ग (Grade):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
                <div>
                  <label className="font-black text-[11px] block">दाखल दिनांक (Admission Date):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
              </div>

              <div>
                <label className="font-black text-[11px] block">१. विद्यार्थ्यांचे पूर्ण नाव (Student Full Name in Marathi):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>

              <div>
                <label className="font-black text-[11px] block">Student Full Name in English (Capital Letters):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-black text-[11px] block">जन्म तारीख (DOB):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
                <div>
                  <label className="font-black text-[11px] block">लिंग (Gender):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
                <div>
                  <label className="font-black text-[11px] block">मातृभाषा (Mother Tongue):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-black text-[11px] block">आधार कार्ड क्र. (Aadhaar No.):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
                <div>
                  <label className="font-black text-[11px] block">धर्म / जात / प्रवर्ग (Category):</label>
                  <div className="border-b border-dotted border-black h-6"></div>
                </div>
              </div>
            </div>

            {/* Right col: Passport Photo Box */}
            <div className="sm:col-span-1 flex flex-col items-center justify-center">
              <div className="w-28 h-36 border-2 border-dashed border-black flex flex-col items-center justify-center p-2 text-center text-[10px] font-bold text-slate-500 bg-slate-50 rounded">
                <span>येथे विद्यार्थ्यांचा २ पासपोर्ट साईझ फोटो चिकटवावा</span>
                <span className="text-[9px] mt-1">(Affix Recent Photo)</span>
              </div>
            </div>
          </div>

          {/* Section: Parent / Guardian Info */}
          <div className="border-t border-black pt-3 space-y-3">
            <h3 className="font-black text-xs uppercase bg-slate-100 border border-black px-2 py-0.5 inline-block">
              २. पालक / कुटुंबीय माहिती (Parent & Guardian Details)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-black text-[11px] block">वडिलांचे पूर्ण नाव (Father's Name):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>
              <div>
                <label className="font-black text-[11px] block">आईचे पूर्ण नाव (Mother's Name):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>
              <div>
                <label className="font-black text-[11px] block">संपर्क मोबाईल नंबर (10-Digit Mobile):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>
              <div>
                <label className="font-black text-[11px] block">पालकांचा व्यवसाय (Occupation):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>
              <div className="sm:col-span-2">
                <label className="font-black text-[11px] block">कायमचा पत्ता (Residential Address in Maharkund / Surrounding Area):</label>
                <div className="border-b border-dotted border-black h-6"></div>
              </div>
            </div>
          </div>

          {/* Section: Documents Enclosed */}
          <div className="border-t border-black pt-3 space-y-2">
            <h3 className="font-black text-xs uppercase bg-slate-100 border border-black px-2 py-0.5 inline-block">
              ३. सोबत जोडलेली आवश्यक कागदपत्रे (Tick Attached Documents)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>जन्म दाखला (Birth Cert.)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>विद्यार्थी आधार कार्ड प्रत</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>पालक आधार व रेशन कार्ड</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>मागील शाळेचा दाखला (LC/TC)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>२ पासपोर्ट साईझ फोटो</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-2 border-black" />
                <span>जात प्रमाणपत्र (लागू असल्यास)</span>
              </label>
            </div>
          </div>

          {/* Section: Declaration & Signatures */}
          <div className="border-t-2 border-black pt-4 space-y-4">
            <p className="text-[11px] font-bold text-slate-700 leading-snug">
              <strong>हमीपत्र:</strong> मी असे प्रमाणित करतो/करते की वर दिलेली सर्व माहिती सत्य व बिनचूक आहे. माझे पाल्यास जि. प. प्राथमिक शाळा महारकुंड येथे प्रवेश देण्याची विनंती आहे.
            </p>
            <div className="grid grid-cols-2 pt-6 items-end">
              <div className="space-y-1">
                <div className="border-t border-black w-40 pt-1 text-center font-black text-xs">
                  पालक / पालकाची स्वाक्षरी
                  <div className="text-[10px] text-slate-600">(Parent/Guardian Signature)</div>
                </div>
              </div>
              <div className="space-y-1 flex flex-col items-end">
                <div className="border-t border-black w-48 pt-1 text-center font-black text-xs">
                  मुख्याध्यापक स्वाक्षरी व शिक्का
                  <div className="text-[10px] text-slate-600">Headmaster Signature & School Seal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
