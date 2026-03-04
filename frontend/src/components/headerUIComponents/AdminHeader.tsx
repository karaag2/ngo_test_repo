import NavigationMenu from "@/src/components/headerUIComponents/NavigationMenu";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { ThemeToggle } from "@/src/components/theme-toggle";
import Link from "next/link";
import DynamicTitle from "./DynamicTitle";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border px-2 min-[390px]:px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-x-2  min-[390px]:gap-x-4 group cursor-pointer">
        <div className="relative min-[390px]:size-10 size-8 flex items-center justify-center bg-primary rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
          <Image
            src="/logo.svg"
            alt="Logo MKRT"
            width={32}
            height={32}
            className="w-4 h-4 min-[390px]:w-6 min-[390px]:h-6 invert"
          />
        </div>
        <span className="text-base font-black tracking-tighter text-main">
          MKRT
        </span>
      </Link>
      {/* Navigation et CTA */}
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {/* <NavigationMenu /> */}
        <DynamicTitle />
      </div>
    </header>
  );
};

export default AdminHeader;
