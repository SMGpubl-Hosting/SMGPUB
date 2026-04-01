export function calculateRoyalties(amount, splits){
  return splits.map(s => ({
    user: s.user,
    payout: amount * s.percent
  }));
}
