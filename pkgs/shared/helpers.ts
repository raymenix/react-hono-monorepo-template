export type BulkOperationData<Create extends object, Update extends object> = {
  add: Array<Create>;
  update: Array<Update>;
  remove: Array<string>;
};

export type Body<B extends object, K extends keyof B = never, O extends keyof B = never> = Pick<B, K> &
  Partial<Pick<B, O>>;

export type ResponseData<F extends (...args: any) => any> = Awaited<ReturnType<F>>;
