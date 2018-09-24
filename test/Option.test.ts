import { Option } from '../src/Option';

describe('Option', () => {
  describe('Basic usage', () => {
    it('stores a value', () => {
      const value = { some: 'object' };
      const option = Option.some(value);
      expect(option.isSome()).toBe(true);
      expect(option.isNone()).toBe(false);
      expect(option.get()).toBe(value);
    });

    it('is empty', () => {
      const option = Option.none();
      expect(option.isSome()).toBe(false);
      expect(option.isNone()).toBe(true);
    });

    it('wraps an existing value', () => {
      const option = Option.wrap('value');
      expect(option.isSome()).toBe(true);
    });

    it('wraps a null', () => {
      const option = Option.wrap(null);
      expect(option.isNone()).toBe(true);
    });

    it('wraps an undefined', () => {
      const option = Option.wrap(undefined);
      expect(option.isNone()).toBe(true);
    });
  });

  describe('Default values', () => {
    it('returns a stored value', () => {
      const option = Option.some('foo');
      const result = option.or('bar');
      expect(result).toBe('foo');
    });

    it('returns a default value', () => {
      const option = Option.none();
      const result = option.or('bar');
      expect(result).toBe('bar');
    });

    it('returns a stored value (callback)', () => {
      const option = Option.some('foo');
      const result = option.orElse(() => 'bar');
      expect(result).toBe('foo');
    });

    it('returns a generated value', () => {
      const option = Option.none();
      const result = option.orElse(() => 'bar');
      expect(result).toBe('bar');
    });
  });
});
