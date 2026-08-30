import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {CertificateImageModal} from './CertificateImageModal';

const baseCert = {
   issuer: 'Cisco',
   title: 'Sample Certificate',
   image: '/about/sample.jpeg',
};

describe('<CertificateImageModal />', () => {
   it('renders nothing when certificate is null', () => {
      const {container} = render(<CertificateImageModal certificate={null} onClose={() => {}} />);
      expect(container.firstChild).toBeNull();
   });

   it('renders issuer + title when certificate is provided', () => {
      render(<CertificateImageModal certificate={baseCert} onClose={() => {}} />);
      expect(screen.getByText('Cisco')).toBeInTheDocument();
      expect(screen.getByText('Sample Certificate')).toBeInTheDocument();
   });

   it('renders the issue date when present', () => {
      render(
         <CertificateImageModal
            certificate={{...baseCert, issueDate: 'Jan 2026'}}
            onClose={() => {}}
         />,
      );
      expect(screen.getByText('Jan 2026')).toBeInTheDocument();
   });

   it('renders the "open original" link when an image is present', () => {
      render(<CertificateImageModal certificate={baseCert} onClose={() => {}} />);
      const link = screen.getByText(/OPEN ORIGINAL IMAGE/i).closest('a');
      expect(link).toHaveAttribute('href', '/about/sample.jpeg');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
   });

   it('shows the "no preview" placeholder when no image', () => {
      render(
         <CertificateImageModal certificate={{issuer: 'X', title: 'No image'}} onClose={() => {}} />,
      );
      expect(screen.getByText(/No certificate image preview available/i)).toBeInTheDocument();
      expect(screen.queryByText(/OPEN ORIGINAL IMAGE/i)).not.toBeInTheDocument();
   });

   it('calls onClose when the close button is clicked', async () => {
      const onClose = vi.fn();
      render(<CertificateImageModal certificate={baseCert} onClose={onClose} />);
      const {fireEvent} = await import('@testing-library/react');
      fireEvent.click(screen.getByRole('button', {name: /close certificate/i}));
      expect(onClose).toHaveBeenCalled();
   });
});