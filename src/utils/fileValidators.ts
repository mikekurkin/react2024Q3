export const fileTypeValidator = (types: string[]) => {
  return (file: unknown) => {
    if (file instanceof FileList) file = file[0];
    if (file === undefined) return true;
    if (!(file instanceof File)) return false;
    if (file.size === 0 && file.type === 'application/octet-stream') return true;
    const valid = types.includes(file.type);
    return valid;
  };
};

export const fileSizeValidator = (size: number) => {
  return (file: unknown) => {
    if (file instanceof FileList) file = file[0];
    if (file === undefined) return true;
    if (!(file instanceof File)) return false;
    const valid = file.size <= size;
    return valid;
  };
};
