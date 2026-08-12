import {
  BRAND,
  COLORS,
  FONT_STACK_DISPLAY,
  FONT_STACK_MONO,
  THEMES,
  ROLES,
} from "../../lib/constants";
import { drawImageCover } from "../../lib/imageUtils";

export const CARD_W = 1080;
export const CARD_H = 1620;

const C = {
  paper: "#FFFBF2",
  cream: COLORS.cream || "#F7F3E8",
  forest: COLORS.forest || "#2C663A",
  forestDark: COLORS.forestDark || "#1D4A2A",
  mustard: COLORS.mustard || "#F5DC3E",
  mustardLight: "#FBEB8F",
  pink: COLORS.pink || "#EA3378",
  ink: "#15281B",
  white: "rgba(255,251,242,0.94)",
};

/**
 * Premium HH Goa 2026 Seamless Builder Pass.
 *
 * Design changes:
 * - Continuous full-bleed background using uploaded sunset image.
 * - Removed all harsh rectangular boxes and technical grids.
 * - Text and branding overlaid with subtle drop shadows for legibility.
 * - Image uses object-fit cover via drawImageCover within a stylized neon border.
 */
export function renderBuilderCard(
  ctx,
  {
    image,
    bgImage, // The new seamless Goa background image
    zoom = 1,
    offsetX = 0,
    offsetY = 0,
    name,
    stack,
    builderTitle,
    logoImage,
    theme = "ocean",
    role = "BUILDER",
  }
) {
  const activeTheme = THEMES[theme] || THEMES.ocean;
  const roleObj = ROLES.find((r) => r.id === role) || ROLES[0];
  const roleLabel = roleObj.label;

  const safeName = cleanText(name, "Naveen Kumar");
  const safeStack = cleanText(stack, "Full Stack Developer");
  const safeTitle = cleanText(builderTitle, "Builder In Residence");

  ctx.clearRect(0, 0, CARD_W, CARD_H);
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 1. Draw Continuous Full-Bleed Background
  drawBackground(ctx, bgImage, activeTheme);

  // 2. Draw Lanyard Hole (optional, keeping it for the physical pass feel)
  drawLanyardSlot(ctx, 42);

  // 3. Draw Branding Header seamlessly
  drawHeader(ctx, logoImage, activeTheme, roleLabel);

  // 4. Draw Portrait Seamlessly
  drawPortrait(ctx, image, { zoom, offsetX, offsetY });

  // 5. Draw Builder Identity below photo
  drawIdentity(ctx, {
    name: safeName,
    stack: safeStack,
    title: safeTitle,
    roleLabel
  });

  // 6. Draw Footer Info seamlessly
  drawFooter(ctx);

  // 7. Draw Subtle Outer Shine/Edge
  drawFinish(ctx);

  ctx.restore();

  return { width: CARD_W, height: CARD_H };
}

/* -------------------------------------------------------------------------- */
/* BACKGROUND                                                                 */
/* -------------------------------------------------------------------------- */

function drawBackground(ctx, bgImage, theme) {
  // If the user passes the new sunset image, draw it full-bleed
  if (bgImage) {
    drawImageCover(ctx, bgImage, {
      x: 0,
      y: 0,
      w: CARD_W,
      h: CARD_H,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });
    
    // Add a very subtle dark gradient from the bottom to ensure text readability
    const textVignette = ctx.createLinearGradient(0, CARD_H * 0.4, 0, CARD_H);
    textVignette.addColorStop(0, "rgba(10, 30, 20, 0)");
    textVignette.addColorStop(1, "rgba(10, 30, 20, 0.6)");
    ctx.fillStyle = textVignette;
    ctx.fillRect(0, 0, CARD_W, CARD_H);

  } else {
    // Fallback gradient if the image isn't loaded
    const bg = ctx.createLinearGradient(0, 0, 0, CARD_H);
    const colors = theme?.bgGrad || ["#1D4A2A", "#2C663A", "#D9B13B", "#EA3378"];
    bg.addColorStop(0, colors[0]);
    bg.addColorStop(0.4, colors[1]);
    bg.addColorStop(0.8, colors[2]);
    bg.addColorStop(1, colors[3]);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CARD_W, CARD_H);
  }
}

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */

function drawHeader(ctx, logoImage, theme, roleLabel) {
  const leftGuide = 72;
  const rightGuide = CARD_W - 72;
  const topY = 140;

  // Add shadow for all header elements to stand out against the background
  drawShadow(ctx, 0, 4, 12, "rgba(0,0,0,0.5)");

  if (logoImage) {
    drawCroppedLogo(ctx, logoImage, leftGuide, topY, 305, 155);
  } else {
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = C.cream;
    ctx.font = `900 64px ${FONT_STACK_DISPLAY}`;
    ctx.fillText(BRAND.eventName, leftGuide, topY + 80);
  }

  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";

  // ROLE PASS
  ctx.fillStyle = theme?.accent1 || C.mustardLight;
  ctx.font = `900 42px ${FONT_STACK_MONO}`;
  ctx.fillText(roleLabel, rightGuide, topY + 40);

  // ACCESS • ALL AREAS
  ctx.fillStyle = "rgba(255,251,242,0.85)";
  ctx.font = `800 20px ${FONT_STACK_MONO}`;
  ctx.fillText("ACCESS • ALL AREAS", rightGuide, topY + 75);

  // YEAR
  ctx.fillStyle = C.mustard;
  ctx.font = `900 52px ${FONT_STACK_DISPLAY}`;
  ctx.fillText(BRAND.year, rightGuide, topY + 140);

  clearShadow(ctx);
}

/* -------------------------------------------------------------------------- */
/* LANYARD SLOT                                                               */
/* -------------------------------------------------------------------------- */

function drawLanyardSlot(ctx, y) {
  const w = 240;
  const h = 36;
  const x = CARD_W / 2 - w / 2;

  drawShadow(ctx, 0, 4, 8, "rgba(0,0,0,0.4)");
  roundedRectPath(ctx, x, y, w, h, 18);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fill();
  clearShadow(ctx);

  roundedRectPath(ctx, x + 20, y + 8, w - 40, h - 16, 10);
  ctx.fillStyle = "rgba(21,40,27,0.8)";
  ctx.fill();
}

/* -------------------------------------------------------------------------- */
/* PORTRAIT                                                                   */
/* -------------------------------------------------------------------------- */

function drawPortrait(ctx, image, transform) {
  const w = 520;
  const h = 580;
  const x = CARD_W / 2 - w / 2;
  const y = 340; // Positioned centrally in the upper-mid section
  const radius = 42;

  // Outer shadow for the portrait
  drawShadow(ctx, 0, 16, 40, "rgba(0,0,0,0.6)");

  ctx.save();
  roundedRectPath(ctx, x, y, w, h, radius);
  ctx.clip();
  clearShadow(ctx);

  // Draw the image seamlessly
  if (image) {
    drawImageCover(ctx, image, { x, y, w, h, ...transform });
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();

  // Premium Neon / Yellow Accent Border
  ctx.strokeStyle = "rgba(245, 220, 62, 0.9)"; // Mustard with slight transparency
  ctx.lineWidth = 6;
  roundedRectPath(ctx, x, y, w, h, radius);
  ctx.stroke();
}

/* -------------------------------------------------------------------------- */
/* IDENTITY                                                                   */
/* -------------------------------------------------------------------------- */

function drawIdentity(ctx, { name, stack, title, roleLabel }) {
  const centerX = CARD_W / 2;
  let startY = 1000;

  // Add strong drop shadows so text pops against the sunset image
  drawShadow(ctx, 0, 6, 16, "rgba(0,0,0,0.6)");

  // NAME
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  drawFittedLines(ctx, name.toUpperCase(), {
    x: centerX,
    y: startY,
    maxWidth: 880,
    maxFontPx: 85,
    minFontPx: 48,
    maxLines: 2,
    lineHeight: 0.95,
    fontWeight: 900,
    fontFamily: FONT_STACK_DISPLAY,
    fillStyle: C.cream,
    align: "center",
  });

  startY += 75;

  // BUILDER TITLE
  fitSingleLine(ctx, title.toUpperCase(), {
    x: centerX,
    y: startY,
    maxWidth: 840,
    maxFontPx: 40,
    minFontPx: 24,
    fontWeight: 800,
    fontFamily: FONT_STACK_DISPLAY,
    fillStyle: C.mustardLight,
    align: "center",
  });

  startY += 65;

  // STACK / ROLE PILL
  clearShadow(ctx);
  const pillText = `${roleLabel} | ${stack.toUpperCase()}`;
  ctx.font = `700 22px ${FONT_STACK_MONO}`;
  const textWidth = ctx.measureText(pillText).width;
  const pillW = textWidth + 80;
  const pillH = 50;
  
  ctx.fillStyle = "rgba(10, 30, 20, 0.5)"; 
  ctx.strokeStyle = "rgba(234, 51, 120, 0.6)"; // Pink accent
  ctx.lineWidth = 2;
  roundedRectPath(ctx, centerX - pillW / 2, startY, pillW, pillH, 25);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = C.cream;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(pillText, centerX, startY + pillH / 2 + 2);
}

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

function drawFooter(ctx) {
  const y = CARD_H - 140;
  const leftGuide = 72;
  const rightGuide = CARD_W - 72;

  drawShadow(ctx, 0, 4, 12, "rgba(0,0,0,0.6)");

  // DATES
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = C.cream;
  ctx.font = `900 32px ${FONT_STACK_MONO}`;
  ctx.fillText(BRAND.dates, leftGuide, y);

  // LOCATION
  ctx.fillStyle = "rgba(255,251,242,0.85)";
  ctx.font = `800 24px ${FONT_STACK_MONO}`;
  ctx.fillText(BRAND.location, leftGuide, y + 40);

  // HASHTAG
  ctx.textAlign = "right";
  ctx.fillStyle = C.pink;
  ctx.font = `900 48px ${FONT_STACK_DISPLAY}`;
  ctx.fillText(BRAND.hashtag, rightGuide, y + 35);

  clearShadow(ctx);
}

/* -------------------------------------------------------------------------- */
/* FINISH (Subtle borders)                                                    */
/* -------------------------------------------------------------------------- */

function drawFinish(ctx) {
  // Very subtle outer rim to contain the card
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 2;
  roundedRectPath(ctx, 16, 16, CARD_W - 32, CARD_H - 32, 42);
  ctx.stroke();
}

/* -------------------------------------------------------------------------- */
/* LOGO HELPER                                                                */
/* -------------------------------------------------------------------------- */

function drawCroppedLogo(ctx, image, x, y, w, h) {
  if (!image || !image.width || !image.height) return;
  const scale = Math.min(w / image.width, h / image.height);
  const drawW = image.width * scale;
  const drawH = image.height * scale;

  ctx.drawImage(image, x, y, drawW, drawH);
}

/* -------------------------------------------------------------------------- */
/* SHADOWS & PATH HELPERS                                                     */
/* -------------------------------------------------------------------------- */

function drawShadow(ctx, offsetX, offsetY, blur, color) {
  ctx.shadowColor = color;
  ctx.shadowOffsetX = offsetX;
  ctx.shadowOffsetY = offsetY;
  ctx.shadowBlur = blur;
}

function clearShadow(ctx) {
  ctx.shadowColor = "transparent";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

function roundedRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

/* -------------------------------------------------------------------------- */
/* TEXT FITTING HELPERS                                                       */
/* -------------------------------------------------------------------------- */

function drawFittedLines(
  ctx,
  text,
  { x, y, maxWidth, maxFontPx, minFontPx, maxLines, lineHeight, fontWeight, fontFamily, fillStyle, align = "left" }
) {
  const words = String(text).split(/\s+/).filter(Boolean);
  let size = maxFontPx;
  let lines = [];

  while (size >= minFontPx) {
    ctx.font = `${fontWeight} ${Math.round(size)}px ${fontFamily}`;
    lines = wrapWords(ctx, words, maxWidth, maxLines);
    const widest = Math.max(...lines.map((line) => ctx.measureText(line).width), 0);

    if (widest <= maxWidth && lines.length <= maxLines) break;
    size -= 2;
  }

  ctx.fillStyle = fillStyle;
  ctx.font = `${fontWeight} ${Math.round(Math.max(size, minFontPx))}px ${fontFamily}`;
  ctx.textAlign = align;

  lines.slice(0, maxLines).forEach((line, index) => {
    ctx.fillText(line, x, y + index * Math.round(size * lineHeight));
  });
}

function wrapWords(ctx, words, maxWidth, maxLines) {
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (!current || ctx.measureText(next).width <= maxWidth) {
      current = next;
      return;
    }
    lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;

  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];

  while (last.length > 1 && ctx.measureText(`${last}...`).width > maxWidth) {
    last = last.slice(0, -1);
  }
  kept[maxLines - 1] = `${last.trim()}...`;
  return kept;
}

function fitSingleLine(
  ctx,
  text,
  { x, y, maxWidth, maxFontPx, minFontPx, fontWeight, fontFamily, fillStyle, align = "left" }
) {
  let size = maxFontPx;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = align;
  ctx.font = `${fontWeight} ${Math.round(size)}px ${fontFamily}`;

  while (ctx.measureText(text).width > maxWidth && size > minFontPx) {
    size -= 1;
    ctx.font = `${fontWeight} ${Math.round(size)}px ${fontFamily}`;
  }
  ctx.fillText(text, x, y);
}

/* -------------------------------------------------------------------------- */
/* SANITIZATION                                                               */
/* -------------------------------------------------------------------------- */

function cleanText(value, fallback) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  return text || fallback;
}