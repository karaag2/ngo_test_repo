import QRCode from "qrcode";

const generateQrCode = async (data: string) => {
  const qrCode = await QRCode.toDataURL(data);
  return qrCode;
};

export default generateQrCode;