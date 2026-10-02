const cache = new Map<string, string>();

export async function tintImage(src: string, color: string, maxSize = 300): Promise<string> {
  if (typeof window === 'undefined' || !src) return '';
  const cacheKey = `${src}::${color}::${maxSize}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (err) => reject(err);
    img.src = src;
  });

  // Resize về maxSize trước khi tint, giữ tỉ lệ
  const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.drawImage(img, 0, 0, w, h);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);

  const dataUrl = canvas.toDataURL('image/png');
  cache.set(cacheKey, dataUrl);
  return dataUrl;
}
