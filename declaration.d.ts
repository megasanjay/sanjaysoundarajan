declare namespace JSX {
  interface IntrinsicElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'lottie-player': any;
  }
}

declare module 'neko-ts' {
  export interface NekoOptions {
    origin: {
      x: number;
      y: number;
    };
  }

  export class Neko {
    constructor(options: NekoOptions);
    sleep(): void;
    wake(): void;
  }
}
