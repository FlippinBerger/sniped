export const getImageUrl = (base: string, width: number, height: number): string => {
    let s = base.replace('{width}', width.toString());
    return s.replace('{height}', height.toString());
}