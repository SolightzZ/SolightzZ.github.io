import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {InteractiveCopyEmail} from './InteractiveCopyEmail';

describe('<InteractiveCopyEmail />', () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {writeText},
    });
  });

  it('renders the email address', () => {
    render(<InteractiveCopyEmail email="hi@example.com" />);
    expect(screen.getByText('hi@example.com')).toBeInTheDocument();
  });

  it('copies the email to clipboard on button click', async () => {
    render(<InteractiveCopyEmail email="hi@example.com" />);

    fireEvent.click(screen.getByRole('button', {name: /copy email address/i}));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('hi@example.com');
    });
  });

  it('shows the "Copied" tooltip after a successful copy', async () => {
    render(<InteractiveCopyEmail email="hi@example.com" />);

    expect(screen.queryByText(/copied to clipboard/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: /copy email address/i}));

    expect(await screen.findByText(/copied to clipboard/i)).toBeInTheDocument();
  });

  it('appends a custom className to the wrapper', () => {
    const {container} = render(
      <InteractiveCopyEmail email="hi@example.com" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('toggles the tooltip off after the copy timeout', async () => {
    render(<InteractiveCopyEmail email="hi@example.com" />);

    fireEvent.click(screen.getByRole('button', {name: /copy email address/i}));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith('hi@example.com'),
    );
    expect(await screen.findByText(/copied to clipboard/i)).toBeInTheDocument();

    await waitFor(
      () =>
        expect(screen.queryByText(/copied to clipboard/i)).not.toBeInTheDocument(),
      {timeout: 3000, interval: 50},
    );
  });
});