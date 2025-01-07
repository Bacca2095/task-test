/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Textarea } from '../textarea';

describe('Textarea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Textarea label="Message" value="" onChange={() => {}} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders the textarea with the correct label', () => {
    const { getByText } = render(
      <Textarea label="Message" value="" onChange={() => {}} />
    );

    const label = getByText(/Message/i);

    expect(label).toBeTruthy();
  });

  it('sets the value correctly', () => {
    const { getByDisplayValue } = render(
      <Textarea label="Message" value="Initial text" onChange={() => {}} />
    );

    const textarea = getByDisplayValue('Initial text');
    expect(textarea).toBeTruthy();
  });

  it('calls onChange when the value changes', () => {
    const onChangeMock = vi.fn();
    const { getByPlaceholderText } = render(
      <Textarea label="Message" value="" onChange={onChangeMock} />
    );

    const textarea = getByPlaceholderText('Write your thoughts here...');
    fireEvent.change(textarea, { target: { value: 'Updated text' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('applies dark mode styles correctly', () => {
    const { getByPlaceholderText } = render(
      <Textarea label="Message" value="" onChange={() => {}} />
    );

    const textarea = getByPlaceholderText('Write your thoughts here...');
    expect(textarea.className).toContain('dark:bg-gray-700');
    expect(textarea.className).toContain('dark:text-white');
  });
});
