import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

interface CustomFormFieldProps {
    control: any
    name: string
    label: string
    type: string
    placeholder: string
    description: string
}

export function CustomFormField({ control, name, label, type, placeholder, description }: CustomFormFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{ label }</FormLabel>
                    <FormControl>
                        <Input type={ type } placeholder={ placeholder } {...field} />
                    </FormControl>
                    <FormDescription>{ description }</FormDescription>
                    <FormMessage />
                </FormItem>
            )}                    
        />
    )
}