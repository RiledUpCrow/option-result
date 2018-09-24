import { Result } from '../src';

describe('Result', () => {
  describe('Constructing', () => {
    it('creates a success Result', () => {
      const result = Result.ok('foo');
      expect(result.isOk()).toBe(true);
      expect(result.isErr()).toBe(false);
      expect(result.getResult()).toBe('foo');
    });

    it('creates an error Result', () => {
      const result = Result.err('foo');
      expect(result.isErr()).toBe(true);
      expect(result.isOk()).toBe(false);
      expect(result.getError()).toBe('foo');
    });

    it('throws when created with a null value', () => {
      expect(() => Result.ok(null)).toThrow();
      expect(() => Result.ok(undefined)).toThrow();
      expect(() => Result.err(null)).toThrow();
      expect(() => Result.err(undefined)).toThrow();
    });

    it('throws when getting an incorrect state', () => {
      expect(() => Result.ok('foo').getError()).toThrow();
      expect(() => Result.err('foo').getResult()).toThrow();
    });
  });

  describe('Converting to Option', () => {
    it('converts success to existing ok option', () => {
      const option = Result.ok('foo').ok();
      expect(option.isSome()).toBe(true);
      expect(option.get()).toBe('foo');
    });

    it('converts success to empty error option', () => {
      const option = Result.ok('foo').err();
      expect(option.isNone()).toBe(true);
    });

    it('converts error to existing error option', () => {
      const option = Result.err('foo').err();
      expect(option.isSome()).toBe(true);
      expect(option.get()).toBe('foo');
    });

    it('converts error to empty ok option', () => {
      const option = Result.err('foo').ok();
      expect(option.isNone()).toBe(true);
    });
  });

  describe('Mapping', () => {
    it('maps a success value', () => {
      const mapped = Result.ok('foo').map(val => val + 'bar');
      expect(mapped.isOk()).toBe(true);
      expect(mapped.getResult()).toBe('foobar');
    });

    it("doesn't touch error value", () => {
      const mapped = Result.err('foo').map(val => val + 'bar');
      expect(mapped.isErr()).toBe(true);
      expect(mapped.getError()).toBe('foo');
    });

    it('maps an error value', () => {
      const mapped = Result.err('foo').mapErr(val => val + 'bar');
      expect(mapped.isErr()).toBe(true);
      expect(mapped.getError()).toBe('foobar');
    });

    it("doesn't touch success value", () => {
      const mapped = Result.ok('foo').mapErr(val => val + 'bar');
      expect(mapped.isOk()).toBe(true);
      expect(mapped.getResult()).toBe('foo');
    });
  });

  describe('Converting to string', () => {
    it('prints as Ok()', () => {
      const result = Result.ok('foo').toString();
      expect(result).toBe('Ok(foo)');
    });

    it('prints as Err()', () => {
      const result = Result.err('foo').toString();
      expect(result).toBe('Err(foo)');
    });
  });
});
