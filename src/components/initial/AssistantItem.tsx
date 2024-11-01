import { ArrowUp, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const notifications = [
  {
    title: "Mensagens",
    description: "Há mensagens salvas no seus assistente",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function AssistantItem({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Assistente 1</CardTitle>
        <CardDescription>asdf548as74d8f59a8</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4 self-center">
          <ArrowUp color="rgb(22 163 74)"/>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Assistente on-line
            </p>
            <p className="text-sm text-muted-foreground">
              01/11/2024
            </p>
          </div>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-600" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ArrowRight /> Entrar
        </Button>
      </CardFooter>
    </Card>
  )
}
