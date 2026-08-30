import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen, within} from '@testing-library/react';
import {AboutPreview} from './AboutPreview';
import {CERTIFICATES_DATA, EDUCATION_DATA, PERSONAL_INFO} from '../../data/portfolioData';

describe('<AboutPreview />', () => {
   beforeEach(() => {
      Element.prototype.scrollIntoView = vi.fn();
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders the about section with the correct id', () => {
      const {container} = render(<AboutPreview />);
      expect(container.querySelector('#about')).not.toBeNull();
   });

   it('renders the personal name and nickname', () => {
      render(<AboutPreview />);
      expect(screen.getAllByText(PERSONAL_INFO.fullName).length).toBeGreaterThan(0);
      expect(screen.getByText(new RegExp(PERSONAL_INFO.nickname))).toBeInTheDocument();
   });

   it('renders the faculty + university and the location', () => {
      render(<AboutPreview />);
      const text = document.body.textContent || '';
      expect(text).toContain(PERSONAL_INFO.faculty);
      expect(text).toContain(PERSONAL_INFO.university);
      expect(text).toContain(PERSONAL_INFO.location);
   });

   it('renders every education entry', () => {
      render(<AboutPreview />);
      EDUCATION_DATA.forEach((edu) => {
         expect(screen.getAllByText(edu.institution).length).toBeGreaterThan(0);
         expect(screen.getByText(edu.degree)).toBeInTheDocument();
      });
   });

   it('renders every certificate title with an accessible label', () => {
      render(<AboutPreview />);
      CERTIFICATES_DATA.forEach((cert) => {
         expect(screen.getByLabelText(`View certificate: ${cert.title}`)).toBeInTheDocument();
      });
   });

   it('opens the certificate lightbox when a certificate is clicked', async () => {
      render(<AboutPreview />);
      const cert = CERTIFICATES_DATA[0];
      const card = screen.getByLabelText(`View certificate: ${cert.title}`);
      fireEvent.click(card);

      // CertificateImageModal renders into a portal
      const dialog = await screen.findByRole('dialog', undefined, {timeout: 3000});
      expect(dialog).toBeInTheDocument();
      expect(within(dialog).getByText(cert.title)).toBeInTheDocument();
   });

   it('supports keyboard activation via Enter key', async () => {
      render(<AboutPreview />);
      const cert = CERTIFICATES_DATA[0];
      const card = screen.getByLabelText(`View certificate: ${cert.title}`);
      card.focus();
      fireEvent.keyDown(card, {key: 'Enter'});

      const dialog = await screen.findByRole('dialog', undefined, {timeout: 3000});
      expect(dialog).toBeInTheDocument();
   });

   it('supports keyboard activation via Space key', async () => {
      render(<AboutPreview />);
      const cert = CERTIFICATES_DATA[0];
      const card = screen.getByLabelText(`View certificate: ${cert.title}`);
      card.focus();
      fireEvent.keyDown(card, {key: ' '});

      const dialog = await screen.findByRole('dialog', undefined, {timeout: 3000});
      expect(dialog).toBeInTheDocument();
   });
});