import { Option } from './Option';

/**
 * Result represents a result of an operation which may fail. It contains either
 * a result of that operation or an error in case it failed.
 *
 * To create a Result use one of the static methods:
 * - `ok` if the operation was successful
 * - `err` if the operation failed
 *
 * Don't pass null/undefined values to these methods, instead wrap them in an
 * Option. Note that `ok` instance method will return `Option<Option<R>>` in
 * such case.
 */
export class Result<R, E = Error> {
  /**
   * Creates a new success Result with specified value.
   * Throws an Error if the value is null/undefined.
   */
  public static ok = <R, E = Error>(value: R): Result<R, E> => {
    const result = new Result<R, E>(value, null);
    if (!result.isOk()) {
      throw new Error('Null value passed to Result.ok()');
    }
    return result;
  };

  /**
   * Creates a new error Result with specified error.
   * Throws an Error if the error is null/undefined.
   */
  public static err = <R, E>(error: E): Result<R, E> => {
    const result = new Result<R, E>(null, error);
    if (!result.isErr()) {
      throw new Error('Null value passed to Result.err()');
    }
    return result;
  };

  private constructor(private value: R | null, private error: E | null) {}

  /**
   * Checks whether this Result is a success.
   */
  public isOk = (): boolean =>
    this.value !== null && this.value !== undefined && !this.isErr();

  /**
   * Checks whether this Result is an error.
   */
  public isErr = (): boolean =>
    this.error !== null && this.error !== undefined && !this.isOk();

  /**
   * Returns the success value of the Result. Only call this if you are sure
   * the Result is not an error at this point.
   * Throws an Error if called on an error Result.
   */
  public getResult = (): R => {
    if (this.isErr()) {
      throw new Error('Tried to get a value from an error result');
    }
    return this.value!;
  };

  /**
   * Returns the error of the Result. Only call this if you are sure the Result
   * is not a success at this point.
   * Throws an Error if called on a success Result.
   */
  public getError = (): E => {
    if (this.isOk()) {
      throw new Error('Tried to get an error from a success result');
    }
    return this.error!;
  };

  /**
   * Returns an Option with the success value. If it's an error Result
   * the Option will be empty.
   */
  public ok = (): Option<R> => Option.wrap(this.value);

  /**
   * Returns an Option with the error value. If it's a success Result
   * the Option will be empty.
   */
  public err = (): Option<E> => Option.wrap(this.error);

  /**
   * Converts the success value using specified function. Leaves the error
   * value untouched. Returns a Result with converted value.
   */
  public map = <U>(func: (value: R) => U): Result<U, E> =>
    this.isOk()
      ? Result.ok(func(this.ok().get()))
      : Result.err(this.err().get());

  /**
   * Converts the error value using specified function. Leaves the success
   * value untouched. Returns a Result with converted error.
   */
  public mapErr = <O>(func: (value: E) => O): Result<R, O> =>
    this.isErr()
      ? Result.err(func(this.err().get()))
      : Result.ok(this.ok().get());

  /**
   * Returns a string representation of the Result's state, useful for debugging.
   */
  public toString = (): string =>
    this.isOk() ? `Ok(${this.ok().get()})` : `Err(${this.err().get()})`;
}
