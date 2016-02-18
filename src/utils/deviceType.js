export const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
export const isFileScheme = /file:/.test(location.protocol);
export const isShell = isMobile && isFileScheme;
export const isAndroid = /Android/i.test(navigator.userAgent);
export const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
export const isBrowser = !isAndroid && !isiOS;