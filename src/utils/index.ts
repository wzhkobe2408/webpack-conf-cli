// Util
export function validateFileName(filename: string) {
  return (
    filename.includes('.js') &&
    filename.includes('config') &&
    filename.includes('webpack')
  );
}
