export interface Canvas2D {
   canvas: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
}

export const create2DCanvas = (width: number, height: number): Canvas2D | null => {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   const ctx = canvas.getContext('2d');
   return ctx ? { canvas, ctx } : null;
};
