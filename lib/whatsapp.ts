export const WHATSAPP_PHONE = "94741035606";
export const DIRECT_PHONE = "+94741035606";
export const DISPLAY_PHONE = "074 103 5606";

export function getWhatsAppLink(message?: string): string {
  const defaultText = "Hello Ritz Nature Villa, I would like to inquire about booking. Please send me package details.";
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

export function getPhoneDialLink(): string {
  return `tel:${DIRECT_PHONE}`;
}

export function getGoogleMapsLink(): string {
  return "https://maps.app.goo.gl/Bf1N4JbM4pPFZxKH8";
}
