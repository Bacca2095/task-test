/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../modal';

describe('Modal', () => {
  it('should not render when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(queryByText(/Test Modal/i)).toBeNull();
    expect(queryByText(/Modal Content/i)).toBeNull();
  });

  it('should render when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(getByText(/Test Modal/i)).toBeTruthy();
    expect(getByText(/Modal Content/i)).toBeTruthy();
  });

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByText(/×/i);
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render the footer when provided', () => {
    const footerContent = <button>Footer Button</button>;
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        footer={footerContent}
      >
        <p>Modal Content</p>
      </Modal>
    );

    expect(getByText(/Footer Button/i)).toBeTruthy();
  });

  it('should apply dark mode styles correctly', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const modal = getByText(/Test Modal/i).parentElement?.parentElement;

    expect(modal?.className).toContain('dark:bg-gray-800');
  });
});
