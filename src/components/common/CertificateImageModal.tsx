import { Dialog, DialogContent, IconButton } from '@mui/material';
import { Award, CheckCircle2, ExternalLink, ShieldCheck, X } from 'lucide-react';
import React from 'react';
import { CertificateItem } from '../../types/portfolio';

interface CertificateImageModalProps {
   certificate: CertificateItem | null;
   onClose: () => void;
}

export const CertificateImageModal: React.FC<CertificateImageModalProps> = ({ certificate, onClose }) => {
   if (!certificate) return null;

   return (
      <Dialog
         open={!!certificate}
         onClose={onClose}
         maxWidth="md"
         fullWidth
         slotProps={{
            paper: {
               sx: {
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'none',
                  border: '1px solid #D7EAF7',
                  borderRadius: '8px',
                  color: '#0F172A',
                  p: { xs: 2, sm: 2.7 },
                  boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.18)',
                  overflow: 'hidden',
               },
            },
         }}>
         {/* Header */}
         <div className="flex items-start justify-between border-b border-[#E5F1F8] pb-3 mb-4">
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-[6px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0">
                  <Award className="w-4 h-4" />
               </div>
               <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] mb-0.5">
                     <span className="font-semibold">{certificate.issuer}</span>
                     {certificate.issueDate && (
                        <>
                           <span className="text-[#CBD5E1]">•</span>
                           <span className="text-[#64748B]">{certificate.issueDate}</span>
                        </>
                     )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">{certificate.title}</h3>
               </div>
            </div>

            <IconButton size="small" onClick={onClose} sx={{ color: '#64748B' }} aria-label="Close certificate image modal">
               <X className="w-5 h-5" />
            </IconButton>
         </div>

         {/* Content / Full Certificate Image */}
         <DialogContent sx={{ p: 0 }}>
            <div className="space-y-4">
               {certificate.image ? (
                  <div className="relative w-full rounded-[6px] overflow-hidden bg-[#F0F9FF] border border-[#D7EAF7] flex items-center justify-center">
                      <img src={certificate.image} alt={certificate.title} className="w-full max-h-[70vh] object-contain rounded-[6px]" referrerPolicy="no-referrer" decoding="async" />
                  </div>
               ) : (
                  <div className="w-full h-64 flex flex-col items-center justify-center gap-3 px-4 text-center text-[#0284C7] bg-[#F7FBFF] border border-[#D7EAF7] rounded-[6px]">
                     <ShieldCheck className="w-10 h-10 text-[#0284C7]" />
                     <p className="text-xs font-mono text-[#64748B]">No certificate image preview available</p>
                  </div>
               )}

               {/* Footer Controls / Info */}
               <div className="flex items-center justify-between pt-2 border-t border-[#E5F1F8] flex-wrap gap-2 text-xs font-mono text-[#64748B]">
                  <div className="flex items-center gap-1.5 text-[#0284C7]">
                     <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                     <span>Verified Certificate</span>
                  </div>

                  {certificate.image && (
                     <a
                        href={certificate.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#F7FBFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] hover:border-[#BAE6FD] text-[#0284C7] text-xs font-mono font-medium transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>OPEN ORIGINAL IMAGE</span>
                     </a>
                  )}
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};
