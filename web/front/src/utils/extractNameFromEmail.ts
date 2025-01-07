export function extractNameFromEmail(email: string): string {
  const [localPart] = email.split('@');
  const [firstName, lastName] = localPart.split('.');
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
