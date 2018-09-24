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

    it('throws when getting if empty', () => {
      expect(() => Option.none().get()).toThrow();
    });

    it('wraps an existing value', () => {
      const option = Option.wrap('value');
      expect(option.isSome()).toBe(true);
    });

    it('throws when wrapping null with "some()"', () => {
      expect(() => Option.some(null)).toThrow();
      expect(() => Option.some(undefined)).toThrow();
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

  describe('Converting to Result', () => {
    it('converts to a success Result', () => {
      const option = Option.some('foo');
      const result = option.okOr('bar');
      expect(result.isOk()).toBe(true);
      expect(result.getResult()).toBe('foo');
    });

    it('converts to an error Result', () => {
      const option = Option.none();
      const result = option.okOr('bar');
      expect(result.isErr()).toBe(true);
      expect(result.getError()).toBe('bar');
    });

    it('uses a function to convert to a success Result', () => {
      const option = Option.some('foo');
      const result = option.okOrElse(() => 'bar');
      expect(result.isOk()).toBe(true);
      expect(result.getResult()).toBe('foo');
    });

    it('uses a function to convert to an error Result', () => {
      const option = Option.none();
      const result = option.okOrElse(() => 'bar');
      expect(result.isErr()).toBe(true);
      expect(result.getError()).toBe('bar');
    });
  });

  describe('Filtering value', () => {
    it('passes a correct value', () => {
      const option = Option.some(4);
      const result = option.if(val => val % 2 === 0).get();
      expect(result).toBe(4);
    });

    it('filters an incorrect value', () => {
      const option = Option.some(3);
      const result = option.if(val => val % 2 === 0).isNone();
      expect(result).toBe(true);
    });

    it('skips an empty Option', () => {
      const option = Option.none<number>();
      const result = option.if(val => val % 2 === 0).isNone();
      expect(result).toBe(true);
    });
  });

  describe('Mapping values', () => {
    it('maps a value to another', () => {
      const option = Option.some(10);
      const result = option.map(val => `Test: ${val * 2}`).get();
      expect(result).toBe('Test: 20');
    });

    it("doesn't map when empty", () => {
      const option = Option.none<number>();
      const result = option.map(val => `Test: ${val * 2}`).isNone();
      expect(result).toBe(true);
    });
  });

  describe('Mapping and flattening values', () => {
    it('maps a value to an existing value', () => {
      const option = Option.some(10);
      const result = option
        .flatMap(val => Option.some(`Test: ${val * 2}`))
        .get();
      expect(result).toBe('Test: 20');
    });

    it('maps a value to an an empty option', () => {
      const option = Option.some(10);
      const result = option.flatMap(val => Option.none<string>()).isNone();
      expect(result).toBe(true);
    });

    it("Doesn't map an empty value", () => {
      const option = Option.none<number>();
      const result = option
        .flatMap(val => Option.some(`Test: ${val * 2}`))
        .isNone();
      expect(result).toBe(true);
    });
  });

  describe('Converting to an array', () => {
    it('converts a value to an array', () => {
      const option = Option.some('foo');
      const result = option.toArray();
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('foo');
    });

    it('converts an empty option to an empty array', () => {
      const option = Option.none();
      const result = option.toArray();
      expect(result).toHaveLength(0);
    });
  });

  describe('Converting to a string', () => {
    it('converts existing option to a string', () => {
      const option = Option.some('foo');
      const result = option.toString();
      expect(result).toBe('Some(foo)');
    });

    it('converts empty option to a string', () => {
      const option = Option.none();
      const result = option.toString();
      expect(result).toBe('None()');
    });
  });
});
