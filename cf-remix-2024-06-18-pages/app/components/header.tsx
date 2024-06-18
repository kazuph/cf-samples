import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import * as React from "react";
import { useHydrated } from "remix-utils/use-hydrated";

import {
	getTheme,
	setTheme as setSystemTheme,
} from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";

export function Header() {
	const hydrated = useHydrated();
	const [, rerender] = React.useState({});
	const setTheme = React.useCallback((theme: string) => {
		setSystemTheme(theme);
		rerender({});
	}, []);
	const theme = getTheme();

	return (
		<header className="flex items-center justify-between px-4 py-2 md:py-4">
			<div className="flex items-center space-x-4">
				<Link className="flex items-center space-x-2" to="/">
					{/* <HomeIcon className="h-6 w-6" /> */}
					<span className="text-lg font-bold">shadcn</span>
				</Link>
			</div>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Item One</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink>Link</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="w-10 h-10 rounded-full border"
						size="icon"
						variant="ghost"
					>
						<span className="sr-only">Theme selector</span>
						{!hydrated ? null : theme === "dark" ? (
							<MoonIcon />
						) : theme === "light" ? (
							<SunIcon />
						) : (
							<LaptopIcon />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mt-2">
					<DropdownMenuLabel>Theme</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<button
							type="button"
							className="w-full"
							onClick={() => setTheme("light")}
							aria-selected={theme === "light"}
						>
							Light
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button
							type="button"
							className="w-full"
							onClick={() => setTheme("dark")}
							aria-selected={theme === "dark"}
						>
							Dark
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button
							type="button"
							className="w-full"
							onClick={() => setTheme("system")}
							aria-selected={theme === "system"}
						>
							System
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
