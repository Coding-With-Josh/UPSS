import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ClientSidebar } from "./dashboard/sidebar";


export async function AppSidebar() {

  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const userProp = {
    name:  `${user.given_name} " " ${user.family_name}`,
    email: user.email
  }

  return (
    <ClientSidebar user={userProp} />
  );
}
