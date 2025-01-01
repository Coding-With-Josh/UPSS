import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export const SignIn = () => {
  return (
    <LoginLink>
        <Button>
          Login to your account
        </Button>
      </LoginLink>
  );
};
