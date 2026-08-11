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
  inkMuted: "rgba(21,40,27,0.58)",

  grid: "rgba(21,40,27,0.055)",
  gridStrong: "rgba(21,40,27,0.085)",

  white: "rgba(255,251,242,0.94)",
};

const CARD = {
  x: 54,
  y: 42,
  w: CARD_W - 108,
  h: CARD_H - 84,
  r: 48,
};

/**
 * Premium HH Goa 2026 Builder Pass.
 *
 * Design principles:
 * - Large, readable HH / Hacker House logo.
 * - Builder Pass is the primary access-level indicator.
 * - Photo remains the visual centerpiece.
 * - Cream body uses ONLY a subtle technical grid.
 * - No flowers, petals, leaves, palms, botanical shapes,
 *   decorative plants, or organic decorations outside footer waves.
 * - Footer is compact.
 * - Footer waves are the only decorative organic geometry.
 */
export function renderBuilderCard(
  ctx,
  {
    image,
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

  const safeName = cleanText(
    name,
    "Unnamed Builder"
  );

  const safeStack = cleanText(
    stack,
    "Full-Stack Builder"
  );

  const safeTitle = cleanText(
    builderTitle,
    "Builder In Residence"
  );

  ctx.clearRect(
    0,
    0,
    CARD_W,
    CARD_H
  );

  ctx.save();

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  drawBackground(ctx, activeTheme);
  drawCard(ctx, activeTheme);

  drawHeader(
    ctx,
    logoImage,
    activeTheme,
    roleLabel
  );

  drawBodyTexture(ctx);

  drawPortrait(
    ctx,
    image,
    {
      zoom,
      offsetX,
      offsetY,
    }
  );

  drawIdentity(
    ctx,
    {
      name: safeName,
      stack: safeStack,
      title: safeTitle,
    }
  );

  drawFooter(ctx);

  drawFinish(ctx);

  ctx.restore();

  return {
    width: CARD_W,
    height: CARD_H,
  };
}

/* -------------------------------------------------------------------------- */
/* BACKGROUND                                                                 */
/* -------------------------------------------------------------------------- */

function drawBackground(ctx, theme) {
  const bg = ctx.createLinearGradient(
    0,
    0,
    CARD_W,
    CARD_H
  );

  const colors = theme?.bgGrad || ["#F7E9AF", "#F3D874", "#F2C8C5", "#E9A9C0"];

  bg.addColorStop(0, colors[0]);
  bg.addColorStop(0.42, colors[1]);
  bg.addColorStop(0.78, colors[2]);
  bg.addColorStop(1, colors[3]);

  ctx.fillStyle = bg;

  ctx.fillRect(
    0,
    0,
    CARD_W,
    CARD_H
  );

  drawSoftGlow(
    ctx,
    900,
    90,
    420,
    theme?.accent1 ? `${theme.accent1}44` : "rgba(245,220,62,0.42)"
  );

  drawSoftGlow(
    ctx,
    150,
    500,
    390,
    "rgba(44,102,58,0.09)"
  );

  drawSoftGlow(
    ctx,
    930,
    720,
    360,
    theme?.accent2 ? `${theme.accent2}22` : "rgba(234,51,120,0.08)"
  );
}

/* -------------------------------------------------------------------------- */
/* CARD CONTAINER                                                             */
/* -------------------------------------------------------------------------- */

function drawCard(ctx, theme) {
  drawShadow(
    ctx,
    0,
    34,
    68,
    "rgba(21,40,27,0.30)"
  );

  roundedRectPath(
    ctx,
    CARD.x,
    CARD.y,
    CARD.w,
    CARD.h,
    CARD.r
  );

  ctx.fillStyle = theme?.paper || C.paper;
  ctx.fill();

  clearShadow(ctx);

  ctx.strokeStyle =
    "rgba(255,255,255,0.78)";

  ctx.lineWidth = 5;

  roundedRectPath(
    ctx,
    CARD.x + 12,
    CARD.y + 12,
    CARD.w - 24,
    CARD.h - 24,
    CARD.r - 10
  );

  ctx.stroke();

  ctx.strokeStyle =
    "rgba(21,40,27,0.18)";

  ctx.lineWidth = 2;

  roundedRectPath(
    ctx,
    CARD.x,
    CARD.y,
    CARD.w,
    CARD.h,
    CARD.r
  );

  ctx.stroke();
}

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */

function drawHeader(
  ctx,
  logoImage,
  theme,
  roleLabel = "BUILDER PASS"
) {
  const h = 360;

  const headerGradColors = theme?.headerGrad || ["#1D4A2A", C.forest, "#215A38"];
  const header =
    ctx.createLinearGradient(
      CARD.x,
      CARD.y,
      CARD.x + CARD.w,
      CARD.y + h
    );

  header.addColorStop(0, headerGradColors[0]);
  header.addColorStop(0.55, headerGradColors[1]);
  header.addColorStop(1, headerGradColors[2]);

  ctx.fillStyle = header;

  roundedTopRectPath(
    ctx,
    CARD.x,
    CARD.y,
    CARD.w,
    h,
    CARD.r
  );

  ctx.fill();

  drawLanyardSlot(
    ctx,
    CARD.y + 28
  );

  const leftGuide = CARD.x + 48;

  if (logoImage) {
    drawCroppedLogo(
      ctx,
      logoImage,
      leftGuide,
      CARD.x + 28,
      CARD.y + 220,
      305,
      155
    );
  } else {
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = C.white;

    ctx.font =
      `900 78px ${FONT_STACK_DISPLAY}`;

    ctx.fillText(
      BRAND.eventName,
      leftGuide,
      CARD.y + 190
    );
  }

  const rightGuide = CARD.x + CARD.w - 46;

  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";

  /*
   * ROLE PASS
   */
  ctx.fillStyle = theme?.accent1 || C.mustardLight;

  ctx.font =
    `900 46px ${FONT_STACK_MONO}`;

  ctx.fillText(
    roleLabel,
    rightGuide,
    CARD.y + 168
  );

  /*
   * ACCESS • ALL AREAS
   */
  ctx.fillStyle =
    "rgba(255,251,242,0.58)";

  ctx.font =
    `800 22px ${FONT_STACK_MONO}`;

  ctx.fillText(
    "ACCESS • ALL AREAS",
    rightGuide,
    CARD.y + 205
  );

  /*
   * YEAR
   */
  ctx.fillStyle =
    C.mustard;

  ctx.font =
    `900 56px ${FONT_STACK_DISPLAY}`;

  ctx.fillText(
    BRAND.year,
    rightGuide,
    CARD.y + 275
  );

  /*
   * GOA, INDIA.
   *
   * Explicitly right aligned to the exact
   * same vertical wall as the rest of header.
   */
  ctx.fillStyle = C.white;

  ctx.font =
    `800 19px ${FONT_STACK_MONO}`;

  ctx.textAlign = "right";

  ctx.fillText(
    "GOA, INDIA",
    rightGuide,
    CARD.y + 310
  );

  /*
   * CLEAN DIVIDER.
   *
   * Exact same left guide as logo/footer date.
   */
  const dividerY =
    CARD.y + h - 30;

  ctx.fillStyle =
    C.mustard;

  ctx.fillRect(
    leftGuide,
    dividerY,
    190,
    7
  );

  ctx.fillStyle =
    C.pink;

  ctx.fillRect(
    leftGuide + 204,
    dividerY,
    72,
    7
  );
}

/* -------------------------------------------------------------------------- */
/* LANYARD SLOT                                                               */
/* -------------------------------------------------------------------------- */

function drawLanyardSlot(
  ctx,
  y
) {
  const x =
    CARD_W / 2 - 138;

  drawShadow(
    ctx,
    0,
    5,
    10,
    "rgba(0,0,0,0.20)"
  );

  roundedRectPath(
    ctx,
    x,
    y,
    276,
    48,
    24
  );

  ctx.fillStyle = C.paper;

  ctx.fill();

  clearShadow(ctx);

  roundedRectPath(
    ctx,
    x + 28,
    y + 13,
    220,
    22,
    11
  );

  ctx.fillStyle =
    "rgba(21,40,27,0.34)";

  ctx.fill();
}

/* -------------------------------------------------------------------------- */
/* BODY TECH TEXTURE                                                          */
/* -------------------------------------------------------------------------- */

function drawBodyTexture(ctx) {
  const top =
    CARD.y + 360;

  const bottom = 1240;

  ctx.save();

  ctx.beginPath();

  ctx.rect(
    CARD.x,
    top,
    CARD.w,
    bottom - top
  );

  ctx.clip();

  const gridSize = 42;

  /*
   * Vertical grid.
   */
  ctx.strokeStyle = C.grid;
  ctx.lineWidth = 1;

  for (
    let x = CARD.x;
    x <= CARD.x + CARD.w;
    x += gridSize
  ) {
    ctx.beginPath();

    ctx.moveTo(
      x,
      top
    );

    ctx.lineTo(
      x,
      bottom
    );

    ctx.stroke();
  }

  /*
   * Horizontal grid.
   */
  for (
    let y = top;
    y <= bottom;
    y += gridSize
  ) {
    ctx.beginPath();

    ctx.moveTo(
      CARD.x,
      y
    );

    ctx.lineTo(
      CARD.x + CARD.w,
      y
    );

    ctx.stroke();
  }

  /*
   * Stronger vertical grid.
   */
  ctx.strokeStyle =
    C.gridStrong;

  for (
    let x = CARD.x;
    x <= CARD.x + CARD.w;
    x += gridSize * 4
  ) {
    ctx.beginPath();

    ctx.moveTo(
      x,
      top
    );

    ctx.lineTo(
      x,
      bottom
    );

    ctx.stroke();
  }

  /*
   * Stronger horizontal grid.
   */
  for (
    let y = top;
    y <= bottom;
    y += gridSize * 4
  ) {
    ctx.beginPath();

    ctx.moveTo(
      CARD.x,
      y
    );

    ctx.lineTo(
      CARD.x + CARD.w,
      y
    );

    ctx.stroke();
  }

  /*
   * Code texture.
   *
   * Kept away from the portrait frame.
   *
   * NO <ship /> or "true;" directly beside
   * the portrait.
   */
  drawCodeTexture(
    ctx,
    CARD.x + 24,
    top + 58,
    [
      "// build in goa",
      "const builder = true;",
    ]
  );

  drawCodeTexture(
    ctx,
    CARD.x + CARD.w - 190,
    top + 500,
    [
      "// ship live",
    ]
  );

  /*
   * NO flowers.
   * NO petals.
   * NO leaves.
   * NO plants.
   * NO silhouettes.
   */

  ctx.restore();
}

function drawCodeTexture(
  ctx,
  x,
  y,
  lines
) {
  ctx.save();

  ctx.fillStyle =
    "rgba(21,40,27,0.045)";

  ctx.font =
    `700 17px ${FONT_STACK_MONO}`;

  lines.forEach(
    (line, index) => {
      ctx.fillText(
        line,
        x,
        y + index * 27
      );
    }
  );

  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/* PORTRAIT                                                                   */
/* -------------------------------------------------------------------------- */

function drawPortrait(
  ctx,
  image,
  transform
) {
  const w = 390;
  const h = 430;

  const x =
    CARD.x +
    CARD.w / 2 -
    w / 2;

  /*
   * Portrait remains in the same position.
   */
  const y = 446;

  /*
   * Dark green backing frame.
   */
  drawShadow(
    ctx,
    0,
    16,
    30,
    "rgba(21,40,27,0.22)"
  );

  roundedRectPath(
    ctx,
    x - 12,
    y - 12,
    w + 24,
    h + 24,
    30
  );

  ctx.fillStyle =
    C.forestDark;

  ctx.fill();

  clearShadow(ctx);

  /*
   * Photograph.
   */
  ctx.save();

  roundedRectPath(
    ctx,
    x,
    y,
    w,
    h,
    22
  );

  ctx.clip();

  drawImageCover(
    ctx,
    image,
    {
      x,
      y,
      w,
      h,
      ...transform,
    }
  );

  drawPhotoGrade(
    ctx,
    x,
    y,
    w,
    h
  );

  ctx.restore();

  /*
   * Cream border.
   */
  ctx.strokeStyle =
    C.paper;

  ctx.lineWidth = 8;

  roundedRectPath(
    ctx,
    x,
    y,
    w,
    h,
    22
  );

  ctx.stroke();

  /*
   * Single mustard accent.
   */
  ctx.strokeStyle =
    C.mustard;

  ctx.lineWidth = 4;

  roundedRectPath(
    ctx,
    x - 8,
    y - 8,
    w + 16,
    h + 16,
    28
  );

  ctx.stroke();
}

/* -------------------------------------------------------------------------- */
/* IDENTITY                                                                   */
/* -------------------------------------------------------------------------- */

function drawIdentity(
  ctx,
  {
    name,
    stack,
    title,
  }
) {
  const centerX =
    CARD.x +
    CARD.w / 2;

  /*
   * NAME
   *
   * Portrait ends around y = 876.
   *
   * Name was previously at 932 and visually
   * sat too close to the photo.
   *
   * 960 gives the name proper breathing room.
   */
  const nameY = 960;

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  drawFittedLines(
    ctx,
    name.toUpperCase(),
    {
      x: centerX,
      y: nameY,
      maxWidth: 770,
      maxFontPx: 65,
      minFontPx: 36,
      maxLines: 2,
      lineHeight: 0.95,
      fontWeight: 900,
      fontFamily:
        FONT_STACK_DISPLAY,
      fillStyle: C.ink,
      align: "center",
    }
  );

  /*
   * CENTRAL STACK.
   *
   * Moved slightly down relative to the
   * previous revision while maintaining
   * comfortable footer separation.
   */
  const dividerY = 1040;

  ctx.fillStyle =
    "rgba(21,40,27,0.14)";

  ctx.fillRect(
    CARD.x + 160,
    dividerY,
    CARD.w - 320,
    2
  );

  /*
   * STACK LABEL.
   */
  ctx.fillStyle =
    C.inkMuted;

  ctx.font =
    `800 18px ${FONT_STACK_MONO}`;

  ctx.fillText(
    "STACK",
    centerX,
    1076
  );

  /*
   * STACK VALUE.
   */
  fitSingleLine(
    ctx,
    stack.toUpperCase(),
    {
      x: centerX,
      y: 1110,
      maxWidth: 720,
      maxFontPx: 31,
      minFontPx: 17,
      fontWeight: 800,
      fontFamily:
        FONT_STACK_DISPLAY,
      fillStyle:
        C.forestDark,
      align: "center",
    }
  );

  /*
   * BUILDER TITLE.
   */
  fitSingleLine(
    ctx,
    title.toUpperCase(),
    {
      x: centerX,
      y: 1155,
      maxWidth: 720,
      maxFontPx: 34,
      minFontPx: 20,
      fontWeight: 900,
      fontFamily:
        FONT_STACK_DISPLAY,
      fillStyle: C.pink,
      align: "center",
    }
  );
}

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

function drawFooter(ctx) {
  /*
   * Compact footer.
   */
  const y = 1240;

  const h =
    CARD.y +
    CARD.h -
    y;

  const footer =
    ctx.createLinearGradient(
      CARD.x,
      y,
      CARD.x + CARD.w,
      y + h
    );

  footer.addColorStop(
    0,
    C.forestDark
  );

  footer.addColorStop(
    1,
    C.forest
  );

  ctx.fillStyle = footer;

  roundedBottomRectPath(
    ctx,
    CARD.x,
    y,
    CARD.w,
    h,
    CARD.r
  );

  ctx.fill();

  /*
   * Footer waves ONLY.
   *
   * These are the only organic decorative
   * geometry in the composition.
   */
  drawWaveLines(
    ctx,
    CARD.x + 54,
    y + 108,
    CARD.w - 108,
    "rgba(255,251,242,0.16)"
  );

  /*
   * LEFT DATE BLOCK.
   *
   * Exact same left guide as logo/divider.
   */
  const leftGuide =
    CARD.x + 48;

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = C.paper;

  ctx.font =
    `900 28px ${FONT_STACK_MONO}`;

  ctx.fillText(
    BRAND.dates,
    leftGuide,
    y + 58
  );

  ctx.fillStyle =
    "rgba(255,251,242,0.70)";

  ctx.font =
    `800 20px ${FONT_STACK_MONO}`;

  ctx.fillText(
    BRAND.location,
    leftGuide,
    y + 88
  );

  /*
   * HASHTAG.
   */
  ctx.textAlign = "right";

  ctx.fillStyle =
    C.mustardLight;

  ctx.font =
    `900 37px ${FONT_STACK_DISPLAY}`;

  ctx.fillText(
    BRAND.hashtag,
    CARD.x + CARD.w - 48,
    y + 67
  );

  /*
   * Editorial footer text.
   */
  ctx.textAlign = "center";

  ctx.fillStyle =
    "rgba(255,251,242,0.76)";

  ctx.font =
    `800 17px ${FONT_STACK_MONO}`;

  ctx.fillText(
    "BEACH LAB  •  SHIP LIVE",
    CARD_W / 2,
    y + 158
  );

  /*
   * Subtle GOA watermark.
   */
  ctx.fillStyle =
    "rgba(255,251,242,0.055)";

  ctx.font =
    `900 145px ${FONT_STACK_DISPLAY}`;

  ctx.textBaseline = "middle";

  ctx.fillText(
    "GOA",
    CARD_W / 2,
    y + 220
  );

  /*
   * 2:47 PM STUDIO intentionally removed.
   */
}

/* -------------------------------------------------------------------------- */
/* FINISH                                                                     */
/* -------------------------------------------------------------------------- */

function drawFinish(ctx) {
  /*
   * Extremely subtle inner highlight.
   */
  ctx.strokeStyle =
    "rgba(255,255,255,0.45)";

  ctx.lineWidth = 3;

  roundedRectPath(
    ctx,
    CARD.x + 24,
    CARD.y + 24,
    CARD.w - 48,
    CARD.h - 48,
    34
  );

  ctx.stroke();

  /*
   * Very soft diagonal shine.
   */
  const shine =
    ctx.createLinearGradient(
      160,
      44,
      880,
      850
    );

  shine.addColorStop(
    0,
    "rgba(255,255,255,0)"
  );

  shine.addColorStop(
    0.48,
    "rgba(255,255,255,0.10)"
  );

  shine.addColorStop(
    0.56,
    "rgba(255,255,255,0)"
  );

  ctx.fillStyle = shine;

  roundedRectPath(
    ctx,
    CARD.x,
    CARD.y,
    CARD.w,
    CARD.h,
    CARD.r
  );

  ctx.fill();
}

/* -------------------------------------------------------------------------- */
/* LOGO                                                                       */
/* -------------------------------------------------------------------------- */

function drawCroppedLogo(
  ctx,
  image,
  x,
  y,
  w,
  h
) {
  /*
   * Preserve the complete source logo.
   *
   * Large dedicated area.
   */
  if (
    !image ||
    !image.width ||
    !image.height
  ) {
    return;
  }

  const scale =
    Math.min(
      w / image.width,
      h / image.height
    );

  const drawW =
    image.width * scale;

  const drawH =
    image.height * scale;

  ctx.save();

  ctx.shadowColor =
    "rgba(0,0,0,0.16)";

  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  ctx.drawImage(
    image,
    x + (w - drawW) / 2,
    y + (h - drawH) / 2,
    drawW,
    drawH
  );

  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/* PHOTO                                                                      */
/* -------------------------------------------------------------------------- */

function drawPhotoGrade(
  ctx,
  x,
  y,
  w,
  h
) {
  const grade =
    ctx.createLinearGradient(
      x,
      y,
      x,
      y + h
    );

  grade.addColorStop(
    0,
    "rgba(255,251,242,0.05)"
  );

  grade.addColorStop(
    0.68,
    "rgba(21,40,27,0)"
  );

  grade.addColorStop(
    1,
    "rgba(21,40,27,0.22)"
  );

  ctx.fillStyle = grade;

  ctx.fillRect(
    x,
    y,
    w,
    h
  );
}

/* -------------------------------------------------------------------------- */
/* FOOTER WAVES                                                               */
/* -------------------------------------------------------------------------- */

function drawWaveLines(
  ctx,
  x,
  y,
  width,
  color
) {
  ctx.save();

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  for (
    let row = 0;
    row < 3;
    row++
  ) {
    ctx.beginPath();

    for (
      let i = 0;
      i <= 42;
      i++
    ) {
      const px =
        x +
        (width * i) / 42;

      const py =
        y +
        row * 22 +
        Math.sin(
          i * 0.72 +
          row * 0.5
        ) *
        6;

      if (i === 0) {
        ctx.moveTo(
          px,
          py
        );
      } else {
        ctx.lineTo(
          px,
          py
        );
      }
    }

    ctx.stroke();
  }

  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/* SOFT GLOW                                                                  */
/* -------------------------------------------------------------------------- */

function drawSoftGlow(
  ctx,
  cx,
  cy,
  radius,
  color
) {
  const glow =
    ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      radius
    );

  glow.addColorStop(
    0,
    color
  );

  glow.addColorStop(
    1,
    "rgba(255,255,255,0)"
  );

  ctx.fillStyle = glow;

  ctx.fillRect(
    cx - radius,
    cy - radius,
    radius * 2,
    radius * 2
  );
}

/* -------------------------------------------------------------------------- */
/* SHADOWS                                                                    */
/* -------------------------------------------------------------------------- */

function drawShadow(
  ctx,
  offsetX,
  offsetY,
  blur,
  color
) {
  ctx.shadowColor = color;

  ctx.shadowOffsetX =
    offsetX;

  ctx.shadowOffsetY =
    offsetY;

  ctx.shadowBlur =
    blur;
}

function clearShadow(ctx) {
  ctx.shadowColor =
    "transparent";

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

/* -------------------------------------------------------------------------- */
/* ROUNDED PATHS                                                              */
/* -------------------------------------------------------------------------- */

function roundedRectPath(
  ctx,
  x,
  y,
  w,
  h,
  r
) {
  const radius =
    Math.min(
      r,
      w / 2,
      h / 2
    );

  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

  ctx.arcTo(
    x + w,
    y,
    x + w,
    y + h,
    radius
  );

  ctx.arcTo(
    x + w,
    y + h,
    x,
    y + h,
    radius
  );

  ctx.arcTo(
    x,
    y + h,
    x,
    y,
    radius
  );

  ctx.arcTo(
    x,
    y,
    x + radius,
    y,
    radius
  );

  ctx.closePath();
}

function roundedTopRectPath(
  ctx,
  x,
  y,
  w,
  h,
  r
) {
  const radius =
    Math.min(
      r,
      w / 2,
      h
    );

  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

  ctx.arcTo(
    x + w,
    y,
    x + w,
    y + h,
    radius
  );

  ctx.lineTo(
    x + w,
    y + h
  );

  ctx.lineTo(
    x,
    y + h
  );

  ctx.lineTo(
    x,
    y + radius
  );

  ctx.arcTo(
    x,
    y,
    x + radius,
    y,
    radius
  );

  ctx.closePath();
}

function roundedBottomRectPath(
  ctx,
  x,
  y,
  w,
  h,
  r
) {
  const radius =
    Math.min(
      r,
      w / 2,
      h
    );

  ctx.beginPath();

  ctx.moveTo(
    x,
    y
  );

  ctx.lineTo(
    x + w,
    y
  );

  ctx.lineTo(
    x + w,
    y + h - radius
  );

  ctx.arcTo(
    x + w,
    y + h,
    x + w - radius,
    y + h,
    radius
  );

  ctx.lineTo(
    x + radius,
    y + h
  );

  ctx.arcTo(
    x,
    y + h,
    x,
    y + h - radius,
    radius
  );

  ctx.closePath();
}

/* -------------------------------------------------------------------------- */
/* TEXT FITTING                                                               */
/* -------------------------------------------------------------------------- */

function drawFittedLines(
  ctx,
  text,
  {
    x,
    y,
    maxWidth,
    maxFontPx,
    minFontPx,
    maxLines,
    lineHeight,
    fontWeight,
    fontFamily,
    fillStyle,
    align = "left",
  }
) {
  const words =
    String(text)
      .split(/\s+/)
      .filter(Boolean);

  let size = maxFontPx;
  let lines = [];

  while (
    size >= minFontPx
  ) {
    ctx.font =
      `${fontWeight} ${Math.round(
        size
      )}px ${fontFamily}`;

    lines = wrapWords(
      ctx,
      words,
      maxWidth,
      maxLines
    );

    const widest =
      Math.max(
        ...lines.map(
          (line) =>
            ctx.measureText(
              line
            ).width
        ),
        0
      );

    if (
      widest <= maxWidth &&
      lines.length <= maxLines
    ) {
      break;
    }

    size -= 2;
  }

  ctx.fillStyle =
    fillStyle;

  ctx.font =
    `${fontWeight} ${Math.round(
      Math.max(
        size,
        minFontPx
      )
    )}px ${fontFamily}`;

  ctx.textAlign = align;

  lines
    .slice(0, maxLines)
    .forEach(
      (line, index) => {
        ctx.fillText(
          line,
          x,
          y +
            index *
              Math.round(
                size *
                  lineHeight
              )
        );
      }
    );
}

function wrapWords(
  ctx,
  words,
  maxWidth,
  maxLines
) {
  const lines = [];

  let current = "";

  words.forEach(
    (word) => {
      const next = current
        ? `${current} ${word}`
        : word;

      if (
        !current ||
        ctx.measureText(
          next
        ).width <=
          maxWidth
      ) {
        current = next;
        return;
      }

      lines.push(
        current
      );

      current = word;
    }
  );

  if (current) {
    lines.push(
      current
    );
  }

  if (
    lines.length <=
    maxLines
  ) {
    return lines;
  }

  const kept =
    lines.slice(
      0,
      maxLines
    );

  let last =
    kept[maxLines - 1];

  while (
    last.length > 1 &&
    ctx.measureText(
      `${last}...`
    ).width >
      maxWidth
  ) {
    last =
      last.slice(
        0,
        -1
      );
  }

  kept[maxLines - 1] =
    `${last.trim()}...`;

  return kept;
}

function fitSingleLine(
  ctx,
  text,
  {
    x,
    y,
    maxWidth,
    maxFontPx,
    minFontPx,
    fontWeight,
    fontFamily,
    fillStyle,
    align = "left",
  }
) {
  let size =
    maxFontPx;

  ctx.fillStyle =
    fillStyle;

  ctx.textAlign =
    align;

  ctx.font =
    `${fontWeight} ${Math.round(
      size
    )}px ${fontFamily}`;

  while (
    ctx.measureText(
      text
    ).width >
      maxWidth &&
    size > minFontPx
  ) {
    size -= 1;

    ctx.font =
      `${fontWeight} ${Math.round(
        size
      )}px ${fontFamily}`;
  }

  ctx.fillText(
    text,
    x,
    y
  );
}

/* -------------------------------------------------------------------------- */
/* SANITIZATION                                                               */
/* -------------------------------------------------------------------------- */

function cleanText(
  value,
  fallback
) {
  const text =
    String(
      value || ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      );

  return (
    text || fallback
  );
}