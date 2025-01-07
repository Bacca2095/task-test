import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button label="Click" />);
    expect(baseElement).toBeTruthy();
  });

  it('renders the button with the correct label', () => {
    const { getByText } = render(<Button label="Click Me" />);

    expect(getByText(/Click Me/gi)).toBeTruthy();
  });

  it('applies primary styles by default', () => {
    const { getByText } = render(<Button label="Primary Button" />);

    const button = getByText(/Primary Button/gi);
    expect(button.className).toContain('bg-gray-800');
    expect(button.className).toContain('text-white');
  });

  it('applies secondary styles when variant is secondary', () => {
    const { getByText } = render(
      <Button label="Secondary Button" variant="secondary" />
    );

    const button = getByText(/Secondary Button/gi);
    expect(button.className).toContain('bg-white');
    expect(button.className).toContain('text-gray-800');
    expect(button.className).toContain('border-gray-300');
  });

  it('calls onClick when clicked', () => {
    const onClickMock = vi.fn();
    render(<Button label="Clickable" onClick={onClickMock} />);

    const button = screen.getByText('Clickable');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders as a button by default', () => {
    const { getByText } = render(<Button label="Default Type" />);
    const button = getByText(/Default Type/gi);

    expect(button.getAttribute('type')).toEqual('button');
  });

  it('renders with the correct type when specified', () => {
    const { getByText } = render(<Button type="submit" label="Submit Type" />);
    const button = getByText(/Submit Type/gi);

    expect(button.getAttribute('type')).toEqual('submit');
  });
});
