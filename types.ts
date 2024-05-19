type InferResponseActualDataType<Res> = Res extends object
  ? Res extends { data?: infer Data }
    ? Data
    : never
  : never;
