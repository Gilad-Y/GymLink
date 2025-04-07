export const sanitizeKeys = (obj: any) => {
  const sanitizedObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const sanitizedKey = key.replace(/\s+/g, ""); // Remove spaces from keys
      sanitizedObj[sanitizedKey] = obj[key];
    }
  }

  return sanitizedObj;
};
export const filterString = (string: string) => {
  const newString = string.replace(/\s+/g, "");
  return newString;
};
function isSameValue(a: any, b: any): boolean {
  if (a instanceof Date && b instanceof Date) {
    return !isNaN(a.getTime()) && !isNaN(b.getTime())
      ? a.getTime() === b.getTime()
      : isNaN(a.getTime()) && isNaN(b.getTime());
  }

  if (a instanceof Date) return isNaN(a.getTime()) && b === "";
  if (b instanceof Date) return isNaN(b.getTime()) && a === "";

  return a === b;
}

function normalizeKeys(obj: Record<string, any>): Record<string, any> {
  const normalized: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    normalized[key.replace(/\s/g, "")] = value;
  }
  return normalized;
}

export function isSubset(
  smallObj: Record<string, any>,
  bigObj: Record<string, any>
): boolean {
  const normalizedSmall = normalizeKeys(smallObj);
  const normalizedBig = normalizeKeys(bigObj);

  return Object.entries(normalizedSmall).every(([key, value]) => {
    if (!normalizedBig.hasOwnProperty(key)) return false;
    return isSameValue(value, normalizedBig[key]);
  });
}
