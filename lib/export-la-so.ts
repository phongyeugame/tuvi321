import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function exportLaSoAsPng(node: HTMLElement, fileName: string): Promise<string> {
  // pixelRatio cao để ảnh xuất nét, không bị mờ khi in
  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    backgroundColor: '#FDFBF5', // nền giấy, tránh xuất ra bị trong suốt/đen
    cacheBust: true,
  });
  const link = document.createElement('a');
  link.download = `${fileName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 1000);
  return dataUrl;
}

export async function exportLaSoAsPdf(node: HTMLElement, fileName: string): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    backgroundColor: '#FDFBF5',
    cacheBust: true,
  });
  const img = new Image();
  await new Promise((res) => {
    img.onload = res;
    img.src = dataUrl;
  });

  const pdf = new jsPDF({
    orientation: img.width > img.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [img.width, img.height],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
  pdf.save(`${fileName}.pdf`);
}
