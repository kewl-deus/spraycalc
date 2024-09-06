const numberFormat = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
});

export function formatNumber(value: number, unit: string): string {
    return value !== null ? numberFormat.format(value) + ' ' + unit : 'N/A';
}
