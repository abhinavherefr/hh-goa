import {
  BRAND,
  COLORS,
  FONT_STACK_DISPLAY,
  FONT_STACK_MONO,
} from "../../lib/constants";
import { drawImageCover } from "../../lib/imageUtils";

export const PFP_SIZE = 1080;

const PALETTE = {
  ink: "#082C23",
  forest: COLORS.forest || "#0F5A43",
  forestDark: COLORS.forestDark || "#0A3E30",
  mustard: COLORS.mustard || "#D9B13B",
  mustardLight: COLORS.mustardLight || "#E8C85E",
  pink: COLORS.pink || "#FF3D7F",
  cream: COLORS.cream || "#F6E9D3",
  warmCream: "#FFF5DE",
};

/**
 * Renders the square HH Goa profile frame used by CanvasRenderer.
 * Keeps the same transform contract as the card compositor.
 */
export function renderPfpFrame(ctx, { image, zoom = 1, offsetX = 0, offsetY = 0 }) {
  const S = PFP_SIZE;
  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  drawImageCover(ctx, image, { x: 0, y: 0, w: S, h: S, zoom, offsetX, offsetY });
  drawPhotoOverlay(ctx, S);
  drawOuterFrame(ctx, S);
  drawTropicalMarks(ctx, S);
  drawBrandLockup(ctx, S);

  ctx.restore();
  return { width: S, height: S };
}

function drawPhotoOverlay(ctx, S) {
  const vignette = ctx.createRadialGradient(S * 0.5, S * 0.42, S * 0.18, S * 0.5, S * 0.5, S * 0.76);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.62, "rgba(8,44,35,0.14)");
  vignette.addColorStop(1, "rgba(8,44,35,0.7)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, S, S);

  const warmth = ctx.createLinearGradient(0, 0, S, S);
  warmth.addColorStop(0, "rgba(255,245,222,0.12)");
  warmth.addColorStop(0.52, "rgba(217,177,59,0.05)");
  warmth.addColorStop(1, "rgba(255,61,127,0.22)");
  ctx.fillStyle = warmth;
  ctx.fillRect(0, 0, S, S);
}

function drawOuterFrame(ctx, S) {
  const pad = 42;
  const ring = ctx.createLinearGradient(0, 0, S, S);
  ring.addColorStop(0, PALETTE.mustardLight);
  ring.addColorStop(0.34, PALETTE.cream);
  ring.addColorStop(0.68, PALETTE.pink);
  ring.addColorStop(1, PALETTE.forest);

  ctx.lineWidth = 32;
  ctx.strokeStyle = ring;
  roundedRectPath(ctx, pad, pad, S - pad * 2, S - pad * 2, 92);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255,245,222,0.86)";
  roundedRectPath(ctx, pad + 28, pad + 28, S - (pad + 28) * 2, S - (pad + 28) * 2, 70);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(8,44,35,0.38)";
  roundedRectPath(ctx, pad - 18, pad - 18, S - (pad - 18) * 2, S - (pad - 18) * 2, 110);
  ctx.stroke();
}

function drawTropicalMarks(ctx, S) {
  ctx.save();
  ctx.lineCap = "round";
  drawSun(ctx, S * 0.82, S * 0.18, 54);
  drawPalm(ctx, S * 0.17, S * 0.78, 170, -0.2);
  drawWaves(ctx, S * 0.12, S * 0.88, S * 0.48);

  ctx.strokeStyle = "rgba(255,61,127,0.7)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(S * 0.82, S * 0.76, 72, 0.15, Math.PI * 1.45);
  ctx.stroke();

  ctx.fillStyle = "rgba(217,177,59,0.88)";
  roundedRectPath(ctx, S * 0.67, S * 0.72, 150, 42, 999);
  ctx.fill();
  ctx.restore();
}

function drawBrandLockup(ctx, S) {
  const x = 86;
  const y = 90;

  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = PALETTE.warmCream;
  ctx.shadowColor = "rgba(8,44,35,0.45)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  ctx.font = `800 78px ${FONT_STACK_DISPLAY}`;
  ctx.fillText(`${BRAND.eventName}`, x, y + 74);

  ctx.font = `800 44px ${FONT_STACK_DISPLAY}`;
  ctx.fillStyle = PALETTE.mustardLight;
  ctx.fillText(BRAND.year, x, y + 122);

  ctx.shadowColor = "transparent";
  ctx.font = `700 23px ${FONT_STACK_MONO}`;
  ctx.fillStyle = "rgba(255,245,222,0.88)";
  ctx.fillText(BRAND.hashtag, x, S - 86);

  ctx.textAlign = "right";
  ctx.fillText(BRAND.location, S - x, S - 86);
  ctx.restore();
}

function drawSun(ctx, cx, cy, r) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,245,222,0.72)";
  ctx.lineWidth = 5;
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 * i) / 16;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * (r + 12), cy + Math.sin(angle) * (r + 12));
    ctx.lineTo(cx + Math.cos(angle) * (r + 34), cy + Math.sin(angle) * (r + 34));
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(217,177,59,0.88)";
  ctx.fill();
  ctx.restore();
}

function drawPalm(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.strokeStyle = "rgba(255,245,222,0.68)";
  ctx.lineWidth = 7;

  ctx.beginPath();
  ctx.moveTo(0, size * 0.5);
  ctx.bezierCurveTo(size * 0.06, size * 0.18, size * 0.02, -size * 0.1, 0, -size * 0.34);
  ctx.stroke();

  for (let i = -3; i <= 3; i++) {
    const angle = -Math.PI / 2 + i * 0.34;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.34);
    ctx.quadraticCurveTo(
      Math.cos(angle) * size * 0.3,
      -size * 0.34 + Math.sin(angle) * size * 0.2,
      Math.cos(angle) * size * 0.53,
      -size * 0.34 + Math.sin(angle) * size * 0.42
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawWaves(ctx, x, y, width) {
  ctx.save();
  ctx.strokeStyle = "rgba(45,212,191,0.72)";
  ctx.lineWidth = 6;
  for (let row = 0; row < 3; row++) {
    ctx.beginPath();
    for (let i = 0; i <= 42; i++) {
      const px = x + (width * i) / 42;
      const py = y + row * 25 + Math.sin(i * 0.72 + row) * 8;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function roundedRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
