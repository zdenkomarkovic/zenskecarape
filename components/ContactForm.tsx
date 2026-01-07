"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Molimo unesite vase ime i prezime" }),
  phone: z.string().optional(),
  email: z.string().email({ message: "Molimo unesite vasu email adresu" }),
  message: z.string().min(10, {
    message: "Poruka mora imati najmanje 10 karaktera.",
  }),
});
export default function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Poruka je uspešno poslata!");
        form.reset();
      } else {
        toast.error(data.error || "Greška pri slanju poruke.");
      }
    } catch (error) {
      console.error("Greška:", error);
      toast.error("Došlo je do greške. Pokušajte ponovo.");
    }
  };
  return (
    <div className="">
      <Form {...form}>
        <form
          className="grid grid-cols-3 items-center p-4 lg:p-10 shadow-xl shadow-primary rounded-xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-3 flex flex-col gap-4 lg:col-span-3 lg:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl">Ime i Prezime:</FormLabel>

                  <FormControl>
                    <Input placeholder="Unesite ime i prezime" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl">Broj telefona (opciono):</FormLabel>
                  <FormControl>
                    <Input placeholder="Unesite vas broj telefona" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl">Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl  ">Vasa poruka:</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Vasa poruka za nas"
                      className="text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="bg-primary  hover:bg-gray-600 transition-colors ease-in-out duration-500"
            >
              {isLoading ? "Slanje....." : "Pošalji"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
