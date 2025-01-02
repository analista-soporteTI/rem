export const STYLES = {
  border: {
    top: { style: 'thin', color: { rgb: '15803d' } },
    bottom: { style: 'thin', color: { rgb: '15803d' } },
    left: { style: 'thin', color: { rgb: '15803d' } },
    right: { style: 'thin', color: { rgb: '15803d' } }
  },
  header: {
    fill: { patternType: 'solid', fgColor: { rgb: '15803d' } },
    font: { name: 'Arial', bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
  },
  cell: {
    base: {
      font: { name: 'Arial', sz: 10, color: { rgb: '333333' } },
      alignment: { horizontal: 'left', vertical: 'center' }
    },
    label: {
      fill: { patternType: 'solid', fgColor: { rgb: 'D9F2E6' } },
      font: { bold: true }
    },
    value: {
      fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF' } }
    },
    title: {
      font: { bold: true, sz: 14, name: 'Arial', color: { rgb: '15803d' } },
      alignment: { horizontal: 'left', vertical: 'center' }
    }
  }
}
