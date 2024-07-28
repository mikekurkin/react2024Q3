import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCsvExport } from '../../hooks/useCsvExport';

describe('useCsvExport', () => {
  it('should download csv', () => {
    const { result } = renderHook(useCsvExport);

    const spyLink = document.createElement('a');
    spyLink.click = vi.fn();
    vi.spyOn(document, 'createElement').mockImplementation(() => spyLink);
    const spyBlobConstructor = vi.fn();
    vi.spyOn(global, 'Blob').mockImplementation((...args) => spyBlobConstructor(...args));

    act(() => {
      result.current(
        [
          { a: 'b', c: 'd', e: 'f' },
          { a: 'g', c: 'h', e: 'j' },
        ],
        'filename.csv'
      );
    });

    expect(spyLink.getAttribute('download')).toEqual('filename.csv');
    expect(global.Blob).toHaveBeenCalledWith(['"a","c","e"\r\n"b","d","f"\r\n"g","h","j"'], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(spyLink.href).toMatch(/^blob:/);
    expect(spyLink.click).toHaveBeenCalledOnce();
  });
});
