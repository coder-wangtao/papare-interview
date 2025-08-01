type PromiseType<T> = T extends Promise<infer R> ? R : T;

type pt = PromiseType<Promise<string>>; // string
