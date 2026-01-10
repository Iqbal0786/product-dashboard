import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders pagination controls', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('does not render when totalPages is 1 or less', () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('renders all page numbers for small page counts', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders ellipsis for large page counts', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      );
      
      const ellipsis = screen.getAllByText('...');
      expect(ellipsis.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation', () => {
    it('calls onPageChange when Next is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const nextButton = screen.getByText('Next');
      await user.click(nextButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when Previous is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const prevButton = screen.getByText('Previous');
      await user.click(prevButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when page number is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const pageButton = screen.getByText('2');
      await user.click(pageButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Disabled States', () => {
    it('disables Previous button on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const prevButton = screen.getByText('Previous');
      expect(prevButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });

    it('does not disable Previous button when not on first page', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const prevButton = screen.getByText('Previous');
      expect(prevButton).not.toBeDisabled();
    });

    it('does not disable Next button when not on last page', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const nextButton = screen.getByText('Next');
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('Active Page', () => {
    it('highlights current page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      
      const currentPageButton = screen.getByText('3');
      expect(currentPageButton).toHaveClass(/from-indigo-600/);
    });
  });
});
