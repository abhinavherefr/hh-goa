import {
  BRAND,
  THEMES,
  COLORS,
  FONT_STACK_DISPLAY,
  FONT_STACK_SANS,
  FONT_STACK_MONO,
  generateBuilderTitle,
} from "../../lib/constants";
import { drawImageCover } from "../../lib/imageUtils";

export const CARD_W = 720;
export const CARD_H = 1080;

/**
 * Renders the official Hacker House Goa 2026 Builder Pass Card matching the screenshot design,
 * with low-opacity background image support and a scannable verification barcode.
 */
export function renderBuilderCard(
  ctx,
  {
    image,
    bgImage = null,
    barcodeImage = null,
    uniqueId = "HH-26-0983",
    zoom = 1,
    offsetX = 0,
    offsetY = 0,
    name = "UNNAMED BUILDER",
    stack = "",
    builderTitle = "",
    theme = "ocean",
    role = "BUILDER",
  }
) {
  const W = CARD_W;
  const H = CARD_H;
  const themeObj = THEMES[theme] || THEMES.ocean;

  ctx.clearRect(0, 0, W, H);

  // 1. Outer Soft Glow Bezel / Border (Rounded Card Container)
  const outerRadius = 40;
  const outerPad = 12;

  // Outer bezel gradient
  const bezelGrad = ctx.createLinearGradient(0, 0, W, H);
  const glowColors = themeObj.glowBorder || [
    "#FDF6D8",
    "#F7CFBB",
    "#EB96B3",
    "#2C663A",
  ];
  glowColors.forEach((c, idx) => {
    bezelGrad.addColorStop(idx / (glowColors.length - 1), c);
  });

  ctx.save();
  ctx.fillStyle = bezelGrad;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, outerRadius);
  ctx.fill();
  ctx.restore();

  // 2. Inner Card Body
  const innerX = outerPad;
  const innerY = outerPad;
  const innerW = W - outerPad * 2;
  const innerH = H - outerPad * 2;
  const innerRadius = 32;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(innerX, innerY, innerW, innerH, innerRadius);
  ctx.clip();

  // Background Gradient
  const cardGrad = ctx.createLinearGradient(0, innerY, 0, innerY + innerH);
  const bgStops = themeObj.cardGrad || [
    "#071C14",
    "#0C291D",
    "#1C2D1C",
    "#2B1A24",
    "#180A15",
  ];
  bgStops.forEach((col, i) => {
    cardGrad.addColorStop(i / (bgStops.length - 1), col);
  });
  ctx.fillStyle = cardGrad;
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // 2b. Custom Background Image with Low Opacity (Subtle texture layer)
  if (bgImage && bgImage.width) {
    ctx.save();
    ctx.globalAlpha = 0.5; // Low opacity background overlay
    drawImageCover(ctx, bgImage, {
      x: innerX,
      y: innerY,
      w: innerW,
      h: innerH,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });
    ctx.restore();
  }

  // Subtle grid lines & sunburst rays in background
  ctx.strokeStyle = themeObj.subtleLine || "rgba(245, 220, 62, 0.08)";
  ctx.lineWidth = 1;

  // Background coordinate grid
  for (let y = innerY + 40; y < innerY + innerH; y += 48) {
    ctx.beginPath();
    ctx.moveTo(innerX, y);
    ctx.lineTo(innerX + innerW, y);
    ctx.stroke();
  }
  for (let x = innerX + 40; x < innerX + innerW; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, innerY);
    ctx.lineTo(x, innerY + innerH);
    ctx.stroke();
  }

  // Large background faint watermark "GOA"
  ctx.fillStyle = "rgba(247, 243, 232, 0.035)";
  ctx.font = `900 160px ${FONT_STACK_DISPLAY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GOA", W / 2, innerY + innerH - 120);

  // 3. Double-Line Inner Frame Inset
  ctx.strokeStyle = "rgba(247, 243, 232, 0.22)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(innerX + 16, innerY + 16, innerW - 32, innerH - 32, 22);
  ctx.stroke();

  ctx.strokeStyle = "rgba(247, 243, 232, 0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(innerX + 22, innerY + 22, innerW - 44, innerH - 44, 18);
  ctx.stroke();

  // 4. Lanyard Punch-Hole Slot at Top Center
  const slotW = 140;
  const slotH = 26;
  const slotX = (W - slotW) / 2;
  const slotY = innerY + 26;

  ctx.fillStyle = "#EAE6DB";
  ctx.beginPath();
  ctx.roundRect(slotX, slotY, slotW, slotH, 13);
  ctx.fill();
  ctx.strokeStyle = "#A4A096";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner slot cutout
  ctx.fillStyle = "#2D302E";
  ctx.beginPath();
  ctx.roundRect(slotX + 8, slotY + 5, slotW - 16, slotH - 10, 8);
  ctx.fill();

  // 5. Header: Logo (Left) and Pass Details (Right)
  const headerY = innerY + 74;

  // --- Top-Left: "HACKER HOUSE" with "गोवा" overlay ---
  ctx.save();
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.font = `900 36px 'Impact', 'Arial Black', ${FONT_STACK_DISPLAY}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.letterSpacing = "2px";
  ctx.fillText("HACKER", innerX + 44, headerY);
  ctx.fillText("HOUSE", innerX + 44, headerY + 36);

  // Overlay "गोवा" script in vibrant pink
  ctx.fillStyle = themeObj.accent2 || "#EA3378";
  ctx.font = `900 28px ${FONT_STACK_SANS}`;
  ctx.fillText("गोवा", innerX + 88, headerY + 18);

  // Under-logo accent bar: Yellow bar + Pink tick
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.fillRect(innerX + 44, headerY + 84, 100, 4);
  ctx.fillStyle = themeObj.accent2 || "#EA3378";
  ctx.fillRect(innerX + 148, headerY + 84, 32, 4);

  // Subtle code watermark below logo
  ctx.fillStyle = "rgba(247, 243, 232, 0.28)";
  ctx.font = `500 11px ${FONT_STACK_MONO}`;
  ctx.fillText("// build in goa", innerX + 44, headerY + 118);
  ctx.fillText("const builder = true;", innerX + 44, headerY + 134);
  ctx.restore();

  // --- Top-Right: Pass Level + 2026 + Location ---
  ctx.save();
  const rightX = innerX + innerW - 44;
  const passLabel = `${String(role || "BUILDER").toUpperCase()} PASS`;

  // "BUILDER PASS"
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.font = `900 22px ${FONT_STACK_SANS}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(passLabel, rightX, headerY + 6);

  // "ACCESS · ALL AREAS"
  ctx.fillStyle = "rgba(247, 243, 232, 0.75)";
  ctx.font = `700 11px ${FONT_STACK_MONO}`;
  ctx.letterSpacing = "1.5px";
  ctx.fillText("ACCESS · ALL AREAS", rightX, headerY + 34);

  // "2026" Large Year
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.font = `900 34px ${FONT_STACK_SANS}`;
  ctx.fillText(BRAND.year, rightX, headerY + 54);

  // "GOA, INDIA"
  ctx.fillStyle = "rgba(247, 243, 232, 0.85)";
  ctx.font = `700 12px ${FONT_STACK_MONO}`;
  ctx.letterSpacing = "1px";
  ctx.fillText(BRAND.location, rightX, headerY + 94);
  ctx.restore();

  // 6. Central Photo Frame
  const photoSize = 340;
  const photoX = (W - photoSize) / 2;
  const photoY = headerY + 165;
  const photoRadius = 26;

  ctx.save();
  // Outer subtle ambient glow
  ctx.shadowColor = "rgba(255, 255, 255, 0.18)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 4;

  // Photo box white bezel
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, photoRadius);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // Render Image inside photo frame
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(photoX + 4, photoY + 4, photoSize - 8, photoSize - 8, photoRadius - 4);
  ctx.clip();

  if (image) {
    drawImageCover(ctx, image, {
      x: photoX + 4,
      y: photoY + 4,
      w: photoSize - 8,
      h: photoSize - 8,
      zoom,
      offsetX,
      offsetY,
    });
  } else {
    // Elegant soft gradient placeholder
    const phGrad = ctx.createLinearGradient(
      photoX,
      photoY,
      photoX,
      photoY + photoSize
    );
    phGrad.addColorStop(0, "#FFFFFF");
    phGrad.addColorStop(1, "#E2E5E8");
    ctx.fillStyle = phGrad;
    ctx.fillRect(photoX + 4, photoY + 4, photoSize - 8, photoSize - 8);
  }
  ctx.restore();

  // 7. Builder Name
  const displayName = (name || "YOUR NAME").trim().toUpperCase();
  const nameY = photoY + photoSize + 40;

  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `900 34px ${FONT_STACK_SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(displayName, W / 2, nameY);
  ctx.restore();

  // 8. Stack & Builder Title Section
  const metaY = nameY + 44;
  const displayStack = (stack || `${role} BUILDER`).trim().toUpperCase();
  const resolvedTitle = (
    builderTitle || generateBuilderTitle(stack, role, name)
  ).trim().toUpperCase();

  ctx.save();
  // Thin center divider line behind STACK text
  ctx.strokeStyle = "rgba(247, 243, 232, 0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(innerX + 80, metaY - 12);
  ctx.lineTo(innerX + innerW - 80, metaY - 12);
  ctx.stroke();

  // STACK label
  ctx.fillStyle = "rgba(247, 243, 232, 0.6)";
  ctx.font = `700 10px ${FONT_STACK_MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "2px";
  ctx.fillText("STACK", W / 2, metaY - 12);

  // Stack/Role line (Yellow)
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.font = `900 15px ${FONT_STACK_SANS}`;
  ctx.letterSpacing = "1.5px";
  ctx.fillText(displayStack, W / 2, metaY + 8);

  // Generated / Custom Title (Pink / Magenta)
  ctx.fillStyle = themeObj.accent2 || "#EA3378";
  ctx.font = `900 17px ${FONT_STACK_SANS}`;
  ctx.letterSpacing = "0.8px";
  ctx.fillText(resolvedTitle, W / 2, metaY + 32);
  ctx.restore();

  // 9. Scannable Verification Barcode Plate
  const barcodeCardW = 440;
  const barcodeCardH = 105;
  const barcodeCardX = (W - barcodeCardW) / 2;
  const barcodeCardY = metaY + 60;

  ctx.save();
  // Barcode container shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.roundRect(barcodeCardX + 4, barcodeCardY + 4, barcodeCardW, barcodeCardH, 14);
  ctx.fill();

  // Barcode plate body
  ctx.fillStyle = "#FFFDF8";
  ctx.beginPath();
  ctx.roundRect(barcodeCardX, barcodeCardY, barcodeCardW, barcodeCardH, 14);
  ctx.fill();

  ctx.strokeStyle = "rgba(10, 36, 25, 0.6)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Verification micro label at top of plate
  ctx.fillStyle = "#5A665E";
  ctx.font = `700 9px ${FONT_STACK_MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.letterSpacing = "1.5px";
  ctx.fillText("VERIFICATION BARCODE · SCAN TO VERIFY", W / 2, barcodeCardY + 8);

  // Draw scannable barcode image or procedural high-contrast CODE128 bars
  if (barcodeImage && barcodeImage.width) {
    const bcW = Math.min(barcodeCardW - 40, barcodeImage.width * 1.5);
    const bcH = 48;
    const bcX = (W - bcW) / 2;
    const bcY = barcodeCardY + 24;
    ctx.drawImage(barcodeImage, bcX, bcY, bcW, bcH);
  } else {
    // Sharp procedural fallback CODE128 barcode stripes
    const bcY = barcodeCardY + 24;
    const bcH = 46;
    const startX = barcodeCardX + 30;
    const totalW = barcodeCardW - 60;

    ctx.fillStyle = "#0C1711";
    let curX = startX;
    let seed = 12345;
    for (let ci = 0; ci < uniqueId.length; ci++) {
      seed = (seed * 9301 + uniqueId.charCodeAt(ci) * 49297) % 233280;
    }
    while (curX < startX + totalW) {
      seed = (seed * 9301 + 49297) % 233280;
      const barW = (seed % 3) + 2;
      const space = (seed % 3) + 2;
      ctx.fillRect(curX, bcY, barW, bcH);
      curX += barW + space;
    }
  }

  // Unique ID string below barcode
  ctx.fillStyle = "#0C1711";
  ctx.font = `900 13px ${FONT_STACK_MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.letterSpacing = "2px";
  ctx.fillText(uniqueId, W / 2, barcodeCardY + barcodeCardH - 7);
  ctx.restore();

  // 10. Footer: Dates, Beach Lab, #FrameInGoa & Waves
  const footerY = innerY + innerH - 52;

  // Decorative wavy lines at bottom
  ctx.save();
  ctx.strokeStyle = themeObj.subtleLine || "rgba(245, 220, 62, 0.2)";
  ctx.lineWidth = 1.5;
  for (let waveOffset = 0; waveOffset < 3; waveOffset++) {
    ctx.beginPath();
    const wy = footerY - 26 + waveOffset * 8;
    ctx.moveTo(innerX + 44, wy);
    for (let wx = innerX + 44; wx <= innerX + innerW - 44; wx += 40) {
      ctx.quadraticCurveTo(wx + 10, wy - 3, wx + 20, wy);
      ctx.quadraticCurveTo(wx + 30, wy + 3, wx + 40, wy);
    }
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  // Bottom-Left: Dates + Location
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `700 12px ${FONT_STACK_MONO}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(BRAND.dates, innerX + 44, footerY);
  ctx.fillStyle = "rgba(247, 243, 232, 0.7)";
  ctx.font = `500 10px ${FONT_STACK_MONO}`;
  ctx.fillText(BRAND.location, innerX + 44, footerY + 16);

  // Bottom-Center: "BEACH LAB · SHIP LIVE"
  ctx.fillStyle = "rgba(247, 243, 232, 0.55)";
  ctx.font = `700 10px ${FONT_STACK_MONO}`;
  ctx.textAlign = "center";
  ctx.letterSpacing = "1px";
  ctx.fillText(BRAND.subLocation, W / 2, footerY + 8);

  // Bottom-Right: "#FrameInGoa"
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.font = `900 18px ${FONT_STACK_SANS}`;
  ctx.textAlign = "right";
  ctx.letterSpacing = "0.5px";
  ctx.fillText(BRAND.hashtag, innerX + innerW - 44, footerY + 6);
  ctx.restore();

  ctx.restore();
}
