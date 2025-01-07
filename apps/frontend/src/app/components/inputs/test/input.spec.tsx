/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../input';

describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Input label="First Name" value="" onChange={() => {}} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders the input with the correct label', () => {
    const { getByText } = render(
      <Input label="First Name" value="" onChange={() => {}} />
    );

    const label = getByText(/First Name/i);

    expect(label).toBeTruthy();
  });

  it('sets the value correctly', () => {
    const { getByDisplayValue } = render(
      <Input label="First Name" value="John" onChange={() => {}} />
    );

    const input = getByDisplayValue('John');
    expect(input).toBeTruthy();
  });

  it('calls onChange when the value changes', () => {
    const onChangeMock = vi.fn();
    const { getByPlaceholderText } = render(
      <Input label="First Name" value="" onChange={onChangeMock} />
    );

    const input = getByPlaceholderText('John');
    fireEvent.change(input, { target: { value: 'Jane' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('applies dark mode styles correctly', () => {
    const { getByPlaceholderText } = render(
      <Input label="First Name" value="" onChange={() => {}} />
    );

    const input = getByPlaceholderText('John');
    expect(input.className).toContain('dark:bg-gray-700');
    expect(input.className).toContain('dark:text-white');
  });
});
