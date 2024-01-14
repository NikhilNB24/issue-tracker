"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";
import {
    Avatar,
    Box,
    Button,
    Container,
    DropdownMenu,
    Flex,
    Text,
} from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";

const NavBar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <Flex align="end" gap="3">
                        <AuthStatus />
                    </Flex>
                </Flex>
            </Container>
        </nav>
    );
};

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <ul className="flex space-x-6">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        className={classnames({
                            "nav-link": true,
                            "!text-zinc-900": link.href === currentPath,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton width="3rem" />;
    if (status === "unauthenticated")
        return (
            <>
                <Link href="/register" className="nav-link">
                    Register
                </Link>
                <Link href="/api/auth/signin" className="nav-link">
                    Login
                </Link>
            </>
        );

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">
                        {session!.user!.email}
                        <CaretDownIcon />
                    </Button>
                    {/* <Avatar
                        src={session!.user!.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                        className="cursor-pointer"
                        referrerPolicy="no-referrer"
                    /> */}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    {/* <DropdownMenu.Label>
                        <Text size="2">{session!.user!.email}</Text>
                    </DropdownMenu.Label> */}
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};

export default NavBar;
