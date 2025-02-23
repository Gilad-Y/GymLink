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
