"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { userSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserFormData = z.infer<typeof userSchema>;

const UserRegistrationForm = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post("/api/register", data);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occured");
        }
    });

    return (
        <div className="max-w-xl space-y-3">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        placeholder="Email"
                        {...register("email")}
                    />
                </TextField.Root>
                <TextField.Root>
                    <TextField.Input
                        placeholder="Password"
                        {...register("password")}
                    />
                </TextField.Root>
                <ErrorMessage>{error && errors.toString()}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    {"Register "}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default UserRegistrationForm;
