type FirstArg<T> = T extends (first: infer R, ...args: any[]) => void ? R : T;

type fa = FirstArg<(name: string, age: number) => void>;
