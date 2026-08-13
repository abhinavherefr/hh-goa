// Shared "object-fit: cover" style image drawing for canvas, with pan/zoom.
//
// Transform contract (matches CropStage.jsx):
// - zoom: >= 1, multiplies the base cover scale
// - offsetX / offsetY: normalized roughly -1..1, representing the fraction
//   of available pan room to shift the image in each direction. 0 = centered.

export function drawImageCover(
  ctx,
  image,
  { x, y, w, h, zoom = 1, offsetX = 0, offsetY = 0 }
) {
  if (!image || !image.width || !image.height) return;

  // Base scale so the image fully covers the target box, then apply zoom.
  const baseScale = Math.max(w / image.width, h / image.height);
  const scale = baseScale * Math.max(zoom, 0.01);
  const drawW = image.width * scale;
  const drawH = image.height * scale;

  // How far the oversized image can shift before revealing empty space
  // past an edge of the target box.
  const maxPanX = Math.max(0, (drawW - w) / 2);
  const maxPanY = Math.max(0, (drawH - h) / 2);

  const panX = clamp(offsetX, -1, 1) * maxPanX;
  const panY = clamp(offsetY, -1, 1) * maxPanY;

  const dx = x + (w - drawW) / 2 + panX;
  const dy = y + (h - drawH) / 2 + panY;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(image, dx, dy, drawW, drawH);
  ctx.restore();
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
