const cache = new Map<string, string>();

export async function tintImage(src: string, color: string): Promise<string> {
  if (typeof window === 'undefined' || !src) return '';
  const cacheKey = `${src}::${color}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (err) => reject(err);
    img.src = src;
  });

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Vẽ ảnh gốc để lấy alpha (hình dạng)
  ctx.drawImage(img, 0, 0);

  // Tô màu mới, giữ nguyên alpha của ảnh gốc
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL('image/png');
  cache.set(cacheKey, dataUrl);
  return dataUrl;
}
