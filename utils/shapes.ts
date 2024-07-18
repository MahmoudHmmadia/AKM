export function accountShape(account: any) {
  return {
    name: account.name,
    email: account.email,
    id: account.id,
    active: account.active,
    role: account.role,
    token: account.token,
    profile: account.profile,
    createdAt: account.createdAt,
    [account.role]: account[account.role],
  };
}
