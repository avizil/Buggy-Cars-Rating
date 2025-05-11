export function generateRandomLabel(length: number = 8): string {
   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let randomStr = '';
   for (let i = 0; i < length; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return `${randomStr}`;
}
