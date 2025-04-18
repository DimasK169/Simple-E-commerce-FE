export const extractUrlsFromResponse = (
  response: string
): { qrUrl: string | null; deeplinkUrl: string | null } => {
  // Regex untuk mencari URL generate-qr-code
  const qrCodeRegex =
    /url=https:\/\/api\.sandbox\.midtrans\.com\/v2\/gopay\/[a-z0-9-]+\/qr-code/;
  // Regex untuk mencari URL deeplink
  const deeplinkRegex =
    /url=https:\/\/simulator\.sandbox\.midtrans\.com\/v2\/deeplink\/detail\?tref=([a-zA-Z0-9]+)/;

  // Ekstrak qrCode URL dari response
  const qrUrlMatch = response.match(qrCodeRegex);
  const qrUrl = qrUrlMatch ? qrUrlMatch[0].split("=")[1] : null;

  // Ekstrak tref dari deeplink URL
  const deeplinkTrefMatch = response.match(deeplinkRegex);
  const deeplinkTref = deeplinkTrefMatch ? deeplinkTrefMatch[1] : null;

  // Buat URL deeplink jika tref ditemukan
  const deeplinkUrl = deeplinkTref
    ? `https://simulator.sandbox.midtrans.com/v2/deeplink/detail?tref=${deeplinkTref}`
    : null;

  return { qrUrl, deeplinkUrl };
};
