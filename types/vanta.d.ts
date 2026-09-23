declare module "vanta/dist/vanta.birds.min" {
  type VantaOptions = {
    el: HTMLElement;
    THREE: unknown;

    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;

    minHeight?: number;
    minWidth?: number;

    scale?: number;
    scaleMobile?: number;

    backgroundColor?: number;
    color1?: number;
    color2?: number;

    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;

    separation?: number;
    alignment?: number;
    cohesion?: number;

    quantity?: number;
  };

  type VantaEffect = {
    destroy: () => void;
    resize: () => void;
  };

  const BIRDS: (options: VantaOptions) => VantaEffect;

  export default BIRDS;
}