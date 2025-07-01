import Link from "next/link";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

// Server component wrapper
const Navbar = async () => {
  try {
    const nextCookies = cookies();
    const { user } = await getServerSideUser(nextCookies);

    // Only pass essential, serializable user data to avoid "Unsupported Server Component type" error
    const userData = user
      ? {
          email: user.email || "USER",
        }
      : null;

    return <NavbarClient user={userData} />;
  } catch (error) {
    console.error("Navbar error:", error);
    return <NavbarClient user={null} />;
  }
};

export default Navbar;
