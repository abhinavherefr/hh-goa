import {
  BRAND,
  THEMES,
  COLORS,
  FONT_STACK_DISPLAY,
  FONT_STACK_SANS,
  FONT_STACK_MONO,
} from "../../lib/constants";
import { drawImageCover } from "../../lib/imageUtils";

export const PFP_SIZE = 1080;

/**
 * Renders the official Hacker House Goa 2026 PFP Frame matching the screenshot design.
 */
export function renderPfpFrame(
  ctx,
  {
    image,
    zoom = 1,
    offsetX = 0,
    offsetY = 0,
    theme = "ocean",
    role = "BUILDER",
  }
) {
  const S = PFP_SIZE;
  const themeObj = THEMES[theme] || THEMES.ocean;

  ctx.clearRect(0, 0, S, S);

  // 1. Outer Squircle Bezel (Pearl / Theme Glow Rim)
  const outerPad = 16;
  const outerRadius = 140;

  const bezelGrad = ctx.createLinearGradient(0, 0, S, S);
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
  ctx.roundRect(0, 0, S, S, outerRadius);
  ctx.fill();
  ctx.restore();

  // 2. Inner Frame Body
  const innerX = outerPad;
  const innerY = outerPad;
  const innerW = S - outerPad * 2;
  const innerH = S - outerPad * 2;
  const innerRadius = 120;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(innerX, innerY, innerW, innerH, innerRadius);
  ctx.clip();

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, S);
  bgGrad.addColorStop(0, "#F5F3EB");
  bgGrad.addColorStop(0.5, "#EDE9DC");
  bgGrad.addColorStop(1, "#E2DDD0");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // 3. User Photo Area
  if (image) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(innerX, innerY, innerW, innerH, innerRadius);
    ctx.clip();

    drawImageCover(ctx, image, {
      x: innerX,
      y: innerY,
      w: innerW,
      h: innerH,
      zoom,
      offsetX,
      offsetY,
    });
    ctx.restore();
  }

  // 4. Subtle Vignette / Edge Shading
  const vigGrad = ctx.createRadialGradient(
    S / 2,
    S / 2,
    S * 0.25,
    S / 2,
    S / 2,
    S * 0.6
  );
  vigGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
  vigGrad.addColorStop(1, "rgba(0, 0, 0, 0.25)");
  ctx.fillStyle = vigGrad;
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // 5. Top-Left Brand Logo: "HH GOA 2026"
  const logoX = innerX + 64;
  const logoY = innerY + 64;

  ctx.save();
  // Shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = "#FFFFFF";
  ctx.font = `900 48px ${FONT_STACK_SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("HH GOA", logoX, logoY);

  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.font = `900 28px ${FONT_STACK_MONO}`;
  ctx.fillText(BRAND.year, logoX, logoY + 54);
  ctx.restore();

  // 6. Top-Right: Solid Golden Sun Disc
  const sunRadius = 46;
  const sunX = innerX + innerW - 84;
  const sunY = innerY + 84;

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 14;

  ctx.fillStyle = themeObj.sunColor || "#F5DC3E";
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 7. Bottom-Left: Tropical Starburst Line Art & Ocean Waves
  const artBaseX = innerX + 70;
  const artBaseY = innerY + innerH - 120;

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
  ctx.lineWidth = 2.5;

  // Starburst / palm fan lines
  const fanRadius = 70;
  for (let a = -70; a <= 10; a += 20) {
    const rad = (a * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(artBaseX, artBaseY);
    ctx.lineTo(artBaseX + Math.cos(rad) * fanRadius, artBaseY + Math.sin(rad) * fanRadius);
    ctx.stroke();
  }

  // Wavy Ocean Lines
  ctx.strokeStyle = themeObj.waveColor || "#2DD4BF";
  ctx.lineWidth = 4;
  for (let w = 0; w < 3; w++) {
    const wy = innerY + innerH - 80 + w * 16;
    ctx.beginPath();
    ctx.moveTo(artBaseX - 20, wy);
    for (let wx = artBaseX - 20; wx <= artBaseX + 320; wx += 40) {
      ctx.quadraticCurveTo(wx + 10, wy - 8, wx + 20, wy);
      ctx.quadraticCurveTo(wx + 30, wy + 8, wx + 40, wy);
    }
    ctx.stroke();
  }
  ctx.restore();

  // 8. Bottom-Right: Role Pill Badge & Pink Arcs
  const badgeW = 160;
  const badgeH = 44;
  const badgeX = innerX + innerW - badgeW - 60;
  const badgeY = innerY + innerH - 160;

  ctx.save();
  // Pink accent arcs
  ctx.strokeStyle = themeObj.accent2 || "#EA3378";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(badgeX + badgeW + 10, badgeY + badgeH / 2, 38, 0.2 * Math.PI, 1.4 * Math.PI);
  ctx.stroke();

  // Badge pill shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;

  // Badge Pill body
  ctx.fillStyle = themeObj.accent1 || "#F5DC3E";
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 22);
  ctx.fill();

  // Role text inside badge
  ctx.fillStyle = COLORS.forestDark;
  ctx.font = `900 18px ${FONT_STACK_SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(String(role || "BUILDER").toUpperCase(), badgeX + badgeW / 2, badgeY + badgeH / 2);

  // Micro subtext "GOA, INDIA"
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = `700 13px ${FONT_STACK_MONO}`;
  ctx.textAlign = "right";
  ctx.fillText(BRAND.location, innerX + innerW - 60, innerY + innerH - 60);
  ctx.restore();

  // 9. Inner Thin Edge Outline
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(innerX + 4, innerY + 4, innerW - 8, innerH - 8, innerRadius - 2);
  ctx.stroke();

  ctx.restore();
}
