import { Option } from './Option';

export class Result<R, E> {
  public static ok = <R, E>(result: R): Result<R, E> =>
    new Result<R, E>(result, null);
  public static err = <R, E>(error: E): Result<R, E> =>
    new Result<R, E>(null, error);

  private constructor(private result: R | null, private error: E | null) {}

  public isOk = (): boolean => this.result !== null;
  public isErr = (): boolean => !this.isOk();
  public ok = (): Option<R> => Option.wrap(this.result);
  public err = (): Option<E> => Option.wrap(this.error);
  public map = <U>(func: (value: R) => U): Result<U, E> =>
    this.isOk()
      ? Result.ok(func(this.ok().get()))
      : Result.err(this.err().get());
  public mapErr = <O>(func: (value: E) => O): Result<R, O> =>
    this.isErr()
      ? Result.err(func(this.err().get()))
      : Result.ok(this.ok().get());
  public toString = (): string =>
    this.isOk() ? `Ok(${this.ok().get()})` : `Err(${this.err().get()})`;
}
