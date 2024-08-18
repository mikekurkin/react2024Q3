const base64 = {
  encode: (file: File | FileList): Promise<string | null> => {
    if (file instanceof FileList) file = file[0];
    if (file === undefined || file.size === 0) return Promise.resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res, rej) => {
      reader.onload = () => res(reader.result === null ? null : reader.result.toString());
      reader.onerror = () => rej(reader.error);
    });
  },
};

export default base64;
