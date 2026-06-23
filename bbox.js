const fs = require('fs');

const content = fs.readFileSync('/Users/yusufmax/Desktop/great turan/logo eng.svg', 'utf8');

const tagRegex = /<(path|polygon|rect)\b([\s\S]*?)\/?>/g;

let match;
let count = 0;
while ((match = tagRegex.exec(content)) !== null) {
  const tagName = match[1];
  const tagBody = match[2];
  
  if (!tagBody.includes('class="cls-1"')) continue;
  
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  function updateBBox(x, y) {
    if (isNaN(x) || isNaN(y)) return;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  if (tagName === 'polygon') {
    const pointsMatch = tagBody.match(/points="([\s\S]*?)"/);
    if (pointsMatch) {
      const pts = pointsMatch[1].trim().split(/[\s,]+/);
      for (let i = 0; i < pts.length; i += 2) {
        updateBBox(parseFloat(pts[i]), parseFloat(pts[i+1]));
      }
    }
  } else if (tagName === 'path') {
    const dMatch = tagBody.match(/d="([\s\S]*?)"/);
    if (dMatch) {
      const d = dMatch[1];
      const tokens = d.match(/[a-df-z]|-?\d+\.?\d*/ig);
      if (!tokens) continue;
      
      let cx = 0, cy = 0;
      let i = 0;
      while (i < tokens.length) {
        const token = tokens[i];
        if (isNaN(parseFloat(token))) {
          const cmd = token;
          i++;
          if (cmd === 'M' || cmd === 'L') {
            cx = parseFloat(tokens[i++]);
            cy = parseFloat(tokens[i++]);
            updateBBox(cx, cy);
          } else if (cmd === 'm' || cmd === 'l') {
            cx += parseFloat(tokens[i++]);
            cy += parseFloat(tokens[i++]);
            updateBBox(cx, cy);
          } else if (cmd === 'H') {
            cx = parseFloat(tokens[i++]);
            updateBBox(cx, cy);
          } else if (cmd === 'h') {
            cx += parseFloat(tokens[i++]);
            updateBBox(cx, cy);
          } else if (cmd === 'V') {
            cy = parseFloat(tokens[i++]);
            updateBBox(cx, cy);
          } else if (cmd === 'v') {
            cy += parseFloat(tokens[i++]);
            updateBBox(cx, cy);
          } else if (cmd === 'C') {
            const x1 = parseFloat(tokens[i++]);
            const y1 = parseFloat(tokens[i++]);
            const x2 = parseFloat(tokens[i++]);
            const y2 = parseFloat(tokens[i++]);
            cx = parseFloat(tokens[i++]);
            cy = parseFloat(tokens[i++]);
            updateBBox(x1, y1);
            updateBBox(x2, y2);
            updateBBox(cx, cy);
          } else if (cmd === 'c') {
            const x1 = cx + parseFloat(tokens[i++]);
            const y1 = cy + parseFloat(tokens[i++]);
            const x2 = cx + parseFloat(tokens[i++]);
            const y2 = cy + parseFloat(tokens[i++]);
            cx += parseFloat(tokens[i++]);
            cy += parseFloat(tokens[i++]);
            updateBBox(x1, y1);
            updateBBox(x2, y2);
            updateBBox(cx, cy);
          } else if (cmd === 'S') {
            const x2 = parseFloat(tokens[i++]);
            const y2 = parseFloat(tokens[i++]);
            cx = parseFloat(tokens[i++]);
            cy = parseFloat(tokens[i++]);
            updateBBox(x2, y2);
            updateBBox(cx, cy);
          } else if (cmd === 's') {
            const x2 = cx + parseFloat(tokens[i++]);
            const y2 = cy + parseFloat(tokens[i++]);
            cx += parseFloat(tokens[i++]);
            cy += parseFloat(tokens[i++]);
            updateBBox(x2, y2);
            updateBBox(cx, cy);
          } else if (cmd === 'Z' || cmd === 'z') {
            // close
          }
        } else {
          cx += parseFloat(tokens[i++]);
          cy += parseFloat(tokens[i++]);
          updateBBox(cx, cy);
        }
      }
    }
  }
  
  console.log(`Path ${count++} (${tagName}): x: [${minX}, ${maxX}], y: [${minY}, ${maxY}]`);
}
