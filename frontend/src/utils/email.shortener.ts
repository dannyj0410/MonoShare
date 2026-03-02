export function emailShortener(email: string) {
  if (email.length > 20) {
    const splitEmail = email.split("@");
    let shortenedName = splitEmail[0];
    let shortenedDomain = splitEmail[1];

    if (shortenedName.length > 12) {
      shortenedName = shortenedName.slice(0, 12) + "...";
    }

    if (shortenedDomain.length > 10) {
      shortenedDomain = shortenedDomain.slice(0, 10) + "...";
    }
    const shortenedEmail = `${shortenedName}@${shortenedDomain}`;

    return shortenedEmail;
  }
  return email;
}
