import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";

  interface Element {
    name: string,
    href: string
  }

export default function BreadCrumb( { elements }: {elements: Element[]}) {
    return(
        <Breadcrumb>
            <BreadcrumbList>

                {elements.map((element, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={element.href}>
                                {element.name}
                                {index !== elements.length - 1 && " >"}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        
                ))}


            </BreadcrumbList>
        </Breadcrumb>
    )
}