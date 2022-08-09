export default function () {
  const { logout } = useStrapiAuth();
  logout();
  return navigateTo("/login");
}
