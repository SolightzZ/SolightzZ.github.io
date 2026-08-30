import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {ProjectDetailModal} from './ProjectDetailModal';
import type {ProjectItem} from '../../types/portfolio';

const sample: ProjectItem = {
   id: 'sample-1',
   slug: 'sample-1',
   title: 'Sample Project',
   category: 'WEB',
   description: 'A showcase of full-stack development.',
   tags: ['React', 'Node.js', 'Redis'],
   image: '/projects/sample.png',
   githubUrl: 'https://github.com/SolightzZ/sample',
   demoUrl: 'https://demo.example.com',
   featured: true,
   year: '2025',
   stats: '4.9k requests/min',
};

describe('<ProjectDetailModal />', () => {
   const onClose = vi.fn();

   it('renders nothing when project is null', () => {
      const {container} = render(<ProjectDetailModal project={null} onClose={onClose} />);
      expect(container.querySelector('[role="dialog"]')).toBeNull();
   });

   it('renders project category, year and title when project is provided', () => {
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      expect(screen.getByText('Sample Project')).toBeInTheDocument();
      expect(screen.getByText('WEB')).toBeInTheDocument();
      expect(screen.getByText('2025')).toBeInTheDocument();
   });

   it('renders the project overview with the localized heading and description', () => {
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      expect(screen.getByText(/ภาพรวมโปรเจกต์/i)).toBeInTheDocument();
      expect(screen.getByText('A showcase of full-stack development.')).toBeInTheDocument();
   });

   it('renders every tag', () => {
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      sample.tags.forEach((tag) => {
         expect(screen.getByText(tag)).toBeInTheDocument();
      });
   });

   it('renders stats badge when provided', () => {
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      expect(screen.getByText('4.9k requests/min')).toBeInTheDocument();
   });

   it('hides the stats badge when stats is missing', () => {
      const noStats = {...sample};
      delete noStats.stats;
      render(<ProjectDetailModal project={noStats} onClose={onClose} />);
      expect(screen.queryByText('4.9k requests/min')).not.toBeInTheDocument();
   });

   it('renders the GitHub link with safe rel and target', () => {
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      const link = screen.getByText(/ดูบน GitHub/i).closest('a');
      expect(link).toHaveAttribute('href', 'https://github.com/SolightzZ/sample');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
   });

   it('renders the demo link with safe rel and target', () => {
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      const link = screen.getByText(/ดูตัวอย่าง/i).closest('a');
      expect(link).toHaveAttribute('href', 'https://demo.example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
   });

   it('hides github/demo links when not provided', () => {
      const noLinks = {...sample};
      delete noLinks.githubUrl;
      delete noLinks.demoUrl;
      render(<ProjectDetailModal project={noLinks} onClose={onClose} />);
      expect(screen.queryByText(/ดูบน GitHub/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/ดูตัวอย่าง/i)).not.toBeInTheDocument();
   });

   it('renders the preview image when provided', () => {
      const {baseElement} = render(<ProjectDetailModal project={sample} onClose={onClose} />);
      const img = baseElement.querySelector('img[alt="Sample Project"]');
      expect(img).not.toBeNull();
      expect((img as HTMLImageElement).src).toContain('/projects/sample.png');
   });

   it('invokes onClose when the close button is clicked', () => {
      onClose.mockClear();
      render(<ProjectDetailModal project={sample} onClose={onClose} />);
      fireEvent.click(screen.getByRole('button', {name: /close project modal/i}));
      expect(onClose).toHaveBeenCalled();
   });

   it('does not render the year block when year is missing', () => {
      const noYear = {...sample};
      delete noYear.year;
      render(<ProjectDetailModal project={noYear} onClose={onClose} />);
      expect(screen.queryByText('2025')).not.toBeInTheDocument();
   });
});