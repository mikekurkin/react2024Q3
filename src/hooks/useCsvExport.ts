interface StringRepresentable {
  toString: () => string;
}

interface ExportableObject {
  [key: string]: StringRepresentable;
}

/* credit: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side */
export function useCsvExport() {
  const objectsArrayToCSV = (data: ExportableObject[]) => {
    const header = data
      .map((row) =>
        Object.keys(row)
          .map((key) => key.toString())
          .map((k) => k.replace(/"/g, '""'))
          .map((k) => `"${k}"`)
          .join(',')
      )
      .reduce((a, b) => (a === b ? a : ''));

    const values = data
      .map((row) =>
        Object.values(row)
          .map((value) => value.toString())
          .map((v) => v.replace(/"/g, '""'))
          .map((v) => `"${v}"`)
          .join(',')
      )
      .join('\r\n');

    return (header ? `${header}\r\n` : '') + values;
  };

  function downloadBlob(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
  }

  return (data: ExportableObject[], filename: string) =>
    downloadBlob(objectsArrayToCSV(data), filename, 'text/csv;charset=utf-8;');
}
