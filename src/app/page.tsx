"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  player1: z.string({ required_error: "Insira o nome de jogador" }).min(3, { message: 'Nome do padelista deve ter pelo menos 3 letras' }).max(50),
  player2: z.string({ required_error: "Insira o nome de jogador" }).min(3, { message: 'Nome do padelista deve ter pelo menos 3 letras' }).max(50),
  player3: z.string({ required_error: "Insira o nome de jogador" }).min(3, { message: 'Nome do padelista deve ter pelo menos 3 letras' }).max(50),
  player4: z.string({ required_error: "Insira o nome de jogador" }).min(3, { message: 'Nome do padelista deve ter pelo menos 3 letras' }).max(50),
})

export default function Home() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player1: "",
      player2: "",
      player3: "",
      player4: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    router.push(`/game?players=${JSON.stringify(values)}`);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* <h1>Padel Score</h1> */}
      <div className="flex">

        <div className="z-10 relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" gap-y-80 gap-x-28 grid grid-template-quadra">
              <FormField
                control={form.control}
                name="player1"
                render={({ field }) => (
                  <FormItem className=" p1 bg-white/85 p-10 rounded ">
                    <FormControl>
                      <Input placeholder="Jogador 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="player2"
                render={({ field }) => (
                  <FormItem className="item p2 bg-white/85 p-10 rounded ">
                    <FormControl>
                      <Input placeholder="Jogador 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="player3"
                render={({ field }) => (
                  <FormItem className="item p3 bg-white/85 p-10 rounded ">
                    <FormControl>
                      <Input placeholder="Jogador 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="player4"
                render={({ field }) => (
                  <FormItem className="item p4 bg-white/85 p-10 rounded ">
                    <FormControl>
                      <Input placeholder="Jogador 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="absolute p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500" type="submit">Começar Jogo 🎾</Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
