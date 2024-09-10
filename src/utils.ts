const numberFormat = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
});

export function formatNumber(value: number, unit: string): string {
    const val = (value == null || isNaN(value)) ? 0 : value;
    return numberFormat.format(val) + ' ' + unit;
}
