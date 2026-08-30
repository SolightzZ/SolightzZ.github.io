import { Dialog, DialogContent, IconButton } from '@mui/material';
import { AlertCircle, ArrowUpRight, CheckCircle2, Copy, ExternalLink, Mail, MessageSquare, Send, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContactModalProps {
   open: boolean;
   onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
   const [emailError, setEmailError] = useState<string | null>(null);
   const [messageError, setMessageError] = useState<string | null>(null);
   const [copied, setCopied] = useState(false);

   const getMailtoUri = (): string => {
      const senderName = name.trim() || 'Visitor';
      const subject = `Portfolio Inquiry from ${senderName}`;
      const bodyContent = `Name: ${senderName}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`;
      return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
   };

   const getGmailUri = (): string => {
      const senderName = name.trim() || 'Visitor';
      const subject = `Portfolio Inquiry from ${senderName}`;
      const bodyContent = `Name: ${senderName}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`;
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
   };

   const triggerMailDispatch = () => {
      const mailtoUri = getMailtoUri();
      const link = document.createElement('a');
      link.href = mailtoUri;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   const validate = (): boolean => {
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.trim()) {
         setEmailError('กรุณากรอกอีเมลของคุณ');
         isValid = false;
      } else if (!emailRegex.test(email.trim())) {
         setEmailError('รูปแบบอีเมลไม่ถูกต้อง');
         isValid = false;
      } else {
         setEmailError(null);
      }

      if (!message.trim()) {
         setMessageError('กรุณากรอกข้อความที่ต้องการส่ง');
         isValid = false;
      } else if (message.trim().length < 5) {
         setMessageError('ข้อความต้องมีความยาวอย่างน้อย 5 ตัวอักษร');
         isValid = false;
      } else {
         setMessageError(null);
      }

      return isValid;
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setStatus('submitting');

      try {
         // Auto-trigger mail dispatch
         triggerMailDispatch();

         // Set success state
         setTimeout(() => {
            setStatus('success');
         }, 300);
      } catch (err) {
         console.error('Failed to trigger mail client:', err);
         setStatus('error');
      }
   };

   const handleCopy = async () => {
      const fullText = `To: ${PERSONAL_INFO.email}\nFrom: ${name.trim() || 'Visitor'} (${email.trim()})\n\nMessage:\n${message.trim()}`;
      try {
         await navigator.clipboard.writeText(fullText);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         setCopied(false);
      }
   };

   const handleReset = () => {
      setName('');
      setEmail('');
      setMessage('');
      setEmailError(null);
      setMessageError(null);
      setStatus('idle');
      setCopied(false);
      onClose();
   };

   return (
      <Dialog
         open={open}
         onClose={handleReset}
         maxWidth="sm"
         fullWidth
         aria-labelledby="contact-modal-title"
         aria-describedby="contact-modal-description"
         slotProps={{
            paper: {
               sx: {
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'none',
                  border: '1px solid #D7EAF7',
                  borderRadius: '8px',
                  color: '#0F172A',
                  p: { xs: 2.5, sm: 3.6 },
                  boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.15)',
                  maxHeight: '92vh',
                  overflowY: 'auto',
               },
            },
         }}>
         {/* Modal Header */}
         <div className="flex items-center justify-between border-b border-[#E5F1F8] pb-4 mb-5">
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-[6px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0">
                  <Mail className="w-4 h-4" />
               </div>
               <div>
                  <h3 id="contact-modal-title" className="text-lg font-bold text-[#0F172A] font-mono">
                     Get In Touch
                  </h3>
                  <p id="contact-modal-description" className="text-xs text-[#64748B] font-mono">
                     Direct to{' '}
                     <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-[#0284C7] hover:underline inline-flex items-center gap-0.5 focus:outline-hidden focus-visible:underline"
                        title="Send email directly via mail client">
                        <span>{PERSONAL_INFO.email}</span>
                        <ArrowUpRight className="w-3 h-3" />
                     </a>
                  </p>
               </div>
            </div>

            <IconButton size="small" onClick={handleReset} sx={{ color: '#64748B' }} aria-label="Close contact dialog">
               <X className="w-4 h-4" />
            </IconButton>
         </div>

         <DialogContent sx={{ p: 0 }}>
            {status === 'success' ? (
               <div className="py-4 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center mx-auto">
                     <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-base font-bold text-[#166534]">ข้อความพร้อมส่ง (Ready to Send)</h4>
                     <p className="text-xs text-[#15803D] max-w-sm mx-auto mt-1 leading-relaxed">
                        เลือกส่งผ่าน Gmail บนเว็บ หรือเปิดโปรแกรมรับส่งอีเมลในเครื่องของคุณเพื่อส่งไปยัง <span className="font-semibold font-mono">{PERSONAL_INFO.email}</span>
                     </p>
                  </div>

                  <div className="p-3.5 bg-[#F7FBFF] border border-[#D7EAF7] rounded-[6px] text-left text-xs text-[#334155] space-y-2">
                     <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] border-b border-[#E5F1F8] pb-1.5">
                        <span>SUMMARY PREVIEW</span>
                        <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1 text-[#0284C7] hover:underline font-semibold cursor-pointer">
                           <Copy className="w-3 h-3" />
                           <span>{copied ? 'COPIED!' : 'COPY TEXT'}</span>
                        </button>
                     </div>
                     <p className="font-mono text-[11px] text-[#0F172A] whitespace-pre-wrap break-words">{message.trim()}</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                     {/* 1. Web Gmail Direct (Recommended) */}
                     <a
                        href={getGmailUri()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-[6px] bg-[#0284C7] hover:bg-[#0369A1] text-xs font-mono font-medium text-white transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs select-none">
                        <Mail className="w-4 h-4" />
                        <span>OPEN IN GMAIL WEB</span>
                     </a>

                     {/* 2. Default Desktop Mail App */}
                     <button
                        type="button"
                        onClick={triggerMailDispatch}
                        className="w-full sm:w-auto px-3.5 py-2.5 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] hover:border-[#BAE6FD] text-xs font-mono font-medium text-[#334155] hover:text-[#0284C7] transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer select-none">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>DEFAULT MAIL APP</span>
                     </button>

                     {/* 3. Close Button */}
                     <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto px-3 py-2.5 rounded-[6px] bg-[#F7FBFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] text-xs font-mono font-medium text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer">
                        CLOSE
                     </button>
                  </div>
               </div>
            ) : status === 'error' ? (
               <div className="py-4 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center mx-auto">
                     <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-base font-bold text-[#991B1B]">Unable to send message</h4>
                     <p className="text-xs text-[#B91C1C] max-w-sm mx-auto mt-1 leading-relaxed">
                        Please send your message directly to{' '}
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="font-semibold underline">
                           {PERSONAL_INFO.email}
                        </a>
                     </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3">
                     <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="px-4 py-2 rounded-[6px] bg-[#0284C7] hover:bg-[#0369A1] text-xs font-mono font-medium text-white transition-colors cursor-pointer">
                        TRY AGAIN
                     </button>
                     <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 rounded-[6px] bg-[#F7FBFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] text-xs font-mono font-medium text-[#0284C7] transition-colors cursor-pointer">
                        CLOSE
                     </button>
                  </div>
               </div>
            ) : (
               <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name Input */}
                  <div>
                     <label htmlFor="modal-contact-name" className="text-xs font-mono text-[#334155] uppercase mb-1.5 font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Your Name</span>
                        <span className="text-[10px] text-[#94A3B8] font-normal lowercase">(optional)</span>
                     </label>
                     <input
                        id="modal-contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ชื่อของคุณ"
                        disabled={status === 'submitting'}
                        className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#F7FBFF] border border-[#D7EAF7] focus:border-[#0284C7] focus:bg-[#FFFFFF] text-xs text-[#0F172A] outline-hidden transition-colors disabled:opacity-50"
                     />
                  </div>

                  {/* Email Input */}
                  <div>
                     <label htmlFor="modal-contact-email" className="text-xs font-mono text-[#334155] uppercase mb-1.5 font-medium flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Your Email Address</span>
                        <span className="text-[#DC2626]" aria-hidden="true">
                           *
                        </span>
                     </label>
                     <input
                        id="modal-contact-email"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? 'modal-email-error' : undefined}
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                           if (emailError) setEmailError(null);
                        }}
                        placeholder="your.email@example.com"
                        disabled={status === 'submitting'}
                        className={`w-full px-3.5 py-2.5 rounded-[6px] bg-[#F7FBFF] border ${
                           emailError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#D7EAF7]'
                        } focus:border-[#0284C7] focus:bg-[#FFFFFF] text-xs text-[#0F172A] outline-hidden transition-colors disabled:opacity-50`}
                     />
                     {emailError && (
                        <p id="modal-email-error" className="text-[11px] font-mono text-[#DC2626] mt-1.5 flex items-center gap-1" role="alert">
                           <AlertCircle className="w-3 h-3 shrink-0" />
                           <span>{emailError}</span>
                        </p>
                     )}
                  </div>

                  {/* Message Input */}
                  <div>
                     <label htmlFor="modal-contact-message" className="text-xs font-mono text-[#334155] uppercase mb-1.5 font-medium flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Message / Project Inquiry</span>
                        <span className="text-[#DC2626]" aria-hidden="true">
                           *
                        </span>
                     </label>
                     <textarea
                        id="modal-contact-message"
                        required
                        aria-required="true"
                        aria-invalid={!!messageError}
                        aria-describedby={messageError ? 'modal-message-error' : undefined}
                        rows={4}
                        value={message}
                        onChange={(e) => {
                           setMessage(e.target.value);
                           if (messageError) setMessageError(null);
                        }}
                        placeholder="พิมพ์ข้อความหรือคำถามที่ต้องการพูดคุย..."
                        disabled={status === 'submitting'}
                        className={`w-full px-3.5 py-2.5 rounded-[6px] bg-[#F7FBFF] border ${
                           messageError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#D7EAF7]'
                        } focus:border-[#0284C7] focus:bg-[#FFFFFF] text-xs text-[#0F172A] outline-hidden transition-colors resize-none disabled:opacity-50`}
                     />
                     {messageError && (
                        <p id="modal-message-error" className="text-[11px] font-mono text-[#DC2626] mt-1.5 flex items-center gap-1" role="alert">
                           <AlertCircle className="w-3 h-3 shrink-0" />
                           <span>{messageError}</span>
                        </p>
                     )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                     <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 rounded-[6px] bg-[#0284C7] hover:bg-[#0369A1] active:bg-[#0284C7] disabled:opacity-50 text-white text-xs font-mono font-medium tracking-wide transition-all shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0284C7]">
                        <Send className="w-3.5 h-3.5" />
                        <span>{status === 'submitting' ? 'PREPARING...' : 'PROCEED TO SEND EMAIL →'}</span>
                     </button>
                  </div>
               </form>
            )}
         </DialogContent>
      </Dialog>
   );
};
