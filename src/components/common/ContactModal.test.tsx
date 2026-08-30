import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {ContactModal} from './ContactModal';
import {PERSONAL_INFO} from '../../data/portfolioData';

describe('<ContactModal />', () => {
   const onClose = vi.fn();

   beforeEach(() => {
      onClose.mockClear();
      Object.defineProperty(navigator, 'clipboard', {
         configurable: true,
         value: {writeText: vi.fn().mockResolvedValue(undefined)},
      });
      // Stub HTMLAnchorElement.click so mail dispatch does not navigate in jsdom.
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders nothing meaningful when closed (form hidden behind Dialog)', () => {
      render(<ContactModal open={false} onClose={onClose} />);
      // Dialog is closed, but still mounted. Inputs should be absent in the DOM tree.
      expect(screen.queryByLabelText(/your email address/i)).not.toBeInTheDocument();
   });

   it('renders the form with email + message fields when open', () => {
      render(<ContactModal open={true} onClose={onClose} />);
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByRole('button', {name: /proceed to send/i})).toBeInTheDocument();
   });

   it('shows the personal email address in the header', () => {
      render(<ContactModal open={true} onClose={onClose} />);
      expect(screen.getAllByText(PERSONAL_INFO.email).length).toBeGreaterThan(0);
   });

   it('rejects empty email and shows an alert', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      const message = screen.getByLabelText(/message/i);
      fireEvent.change(message, {target: {value: 'Hello there, just saying hi.'}});

      const submit = screen.getByRole('button', {name: /proceed to send/i});
      fireEvent.click(submit);

      await waitFor(() => {
         expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
      });
      expect(screen.getByText(/กรุณากรอกอีเมลของคุณ/i)).toBeInTheDocument();
   });

   it('rejects malformed email and shows an alert', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'not-an-email'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'This is a long enough message body.'}});

      fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));

      await waitFor(() => {
         expect(screen.getByText(/รูปแบบอีเมลไม่ถูกต้อง/i)).toBeInTheDocument();
      });
   });

   it('rejects message shorter than 5 characters', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'foo@bar.com'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'hi'}});

      fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));

      await waitFor(() => {
         expect(screen.getByText(/ข้อความต้องมีความยาวอย่างน้อย 5 ตัวอักษร/i)).toBeInTheDocument();
      });
   });

   it('clears field-level error when user types into that field', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'hi'}});
      fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));

      await waitFor(() => {
         expect(screen.getByText(/ข้อความต้องมีความยาวอย่างน้อย 5 ตัวอักษร/i)).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'Hello there, friend'}});

      await waitFor(() => {
         expect(screen.queryByText(/ข้อความต้องมีความยาวอย่างน้อย 5 ตัวอักษร/i)).not.toBeInTheDocument();
      });
   });

   it('transitions to success state with a valid submission', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'visitor@example.com'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'Hello, this is a real inquiry about a project.'}});

      await act(async () => {
         fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));
      });

      await waitFor(
         () => {
            expect(screen.getByText(/Ready to Send|พร้อมส่ง/i)).toBeInTheDocument();
         },
         {timeout: 2000},
      );
   });

   it('success view exposes Gmail web + default mail app buttons', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'a@b.com'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'Hello, this is a long enough message.'}});

      await act(async () => {
         fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));
      });

      await waitFor(
         () => {
            expect(screen.getByText(/OPEN IN GMAIL WEB/i)).toBeInTheDocument();
            expect(screen.getByText(/DEFAULT MAIL APP/i)).toBeInTheDocument();
         },
         {timeout: 2000},
      );
   });

   it('Gmail web link contains recipient, subject and body params', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your name/i), {target: {value: 'Visitor'}});
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'a@b.com'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'Inquiry body content goes here.'}});

      await act(async () => {
         fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));
      });

      await waitFor(
         () => {
            const link = screen.getByText(/OPEN IN GMAIL WEB/i).closest('a');
            expect(link).not.toBeNull();
            const href = (link as HTMLAnchorElement).href;
            expect(href).toContain('mail.google.com');
            expect(href).toContain(encodeURIComponent(PERSONAL_INFO.email));
            expect(href).toContain('Portfolio%20Inquiry%20from%20Visitor');
            expect(href).toContain(encodeURIComponent('Inquiry body content goes here.'));
         },
         {timeout: 2000},
      );
   });

   it('success view copy button writes formatted payload to clipboard', async () => {
      const writeText = vi.mocked(navigator.clipboard.writeText);
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your name/i), {target: {value: 'Alice'}});
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'a@b.com'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'Hello, this is a long enough message.'}});

      await act(async () => {
         fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));
      });

      await waitFor(
         () => {
            expect(screen.getByText(/COPY TEXT/i)).toBeInTheDocument();
         },
         {timeout: 2000},
      );

      await act(async () => {
         fireEvent.click(screen.getByText(/COPY TEXT/i).closest('button')!);
      });

      await waitFor(() => {
         expect(writeText).toHaveBeenCalledTimes(1);
         const payload = writeText.mock.calls[0][0];
         expect(payload).toContain(PERSONAL_INFO.email);
         expect(payload).toContain('Alice');
         expect(payload).toContain('a@b.com');
         expect(payload).toContain('Hello, this is a long enough message.');
      });
   });

   it('copy button flips to COPIED! then resets', async () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.change(screen.getByLabelText(/your email address/i), {target: {value: 'a@b.com'}});
      fireEvent.change(screen.getByLabelText(/message/i), {target: {value: 'Hello, this is a long enough message.'}});

      await act(async () => {
         fireEvent.click(screen.getByRole('button', {name: /proceed to send/i}));
      });

      const copyBtn = await screen.findByText(/COPY TEXT/i);
      await act(async () => {
         fireEvent.click(copyBtn.closest('button')!);
      });

      expect(screen.getByText(/COPIED!/i)).toBeInTheDocument();
   });

   it('close button on the header invokes onClose', () => {
      render(<ContactModal open={true} onClose={onClose} />);
      fireEvent.click(screen.getByRole('button', {name: /close contact dialog/i}));
      expect(onClose).toHaveBeenCalled();
   });
});