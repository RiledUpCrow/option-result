/**
 * Option is a wrapper around a possibly non-existing (null) value.
 *
 * To create an Option use one of the static methods:
 * - `some` if the value exists
 * - `none` to get an empty Option
 * - `wrap` if the value might be null/undefined
 */
export class Option<T> {
  /**
   * Creates a new Option with specified existing value.
   */
  public static some = <T>(value: T): Option<T> => new Option<T>(value);

  /**
   * Creates a new empty Option.
   */
  public static none = <T>(): Option<T> => new Option<T>(null);

  /**
   * Creates a new Option from specified, possibly non-existent value.
   * The Option will be empty if the value is null or undefined.
   */
  public static wrap = <T>(value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return Option.none();
    }
    return Option.some(value);
  };

  private constructor(private value: T | null) {}

  /**
   * Checks whether the Option contains a value.
   */
  public isSome = (): boolean =>
    this.value !== null && this.value !== undefined;

  /**
   * Checks whether the Option is empty.
   */
  public isNone = (): boolean => !this.isSome();

  /**
   * Returns the value of the Option. Only call this if you are sure
   * the option contains a value at this point.
   */
  public get = (): T => this.value!;

  /**
   * Returns the Option's value or specified other value if the Option
   * is empty.
   */
  public or = <R>(def: R): T | R => (this.isSome() ? this.get() : def);

  /**
   * Returns the Option's value or calls specified function to get
   * another value to return.
   */
  public orElse = <R>(func: () => R): T | R =>
    this.isSome() ? this.get() : func();

  /**
   * Calls the `predicate` function with the Option's value if it's present
   * and returns an Option with that value if the function returned `true`.
   * Otherwise an empty Option is returned.
   */
  public if = (predicate: (value: T) => boolean): Option<T> =>
    this.isSome() && predicate(this.get()) ? this : Option.none<T>();

  /**
   * Converts the Option's value using `transform` function and returns another
   * Option containing the result. If the Option is empty it returns an empty
   * option.
   */
  public map = <R>(transform: (value: T) => R): Option<R> =>
    this.isSome() ? Option.some(transform(this.get())) : Option.none<R>();

  /**
   * Converts the Option's value using `transform` function and "flattend" the
   * resulting Option, so it simply contains the value or is empty.
   */
  public flatMap = <R>(transform: (value: T) => Option<R>): Option<R> =>
    this.isSome() ? transform(this.get()) : Option.none();

  /**
   * Returns an array which either contains the Option's value or is empty.
   */
  public toArray = (): T[] => (this.isSome() ? [this.get()] : []);

  /**
   * Returns a string representation of the Option's state, useful for debugging.
   */
  public toString = (): string =>
    this.isSome() ? `Some(${this.get()})` : 'None()';
}
