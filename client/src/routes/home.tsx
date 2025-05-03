import { Hero } from '@/components/hero'
import { createFileRoute, Link } from '@tanstack/react-router'
import { GalleryVerticalEnd } from 'lucide-react'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-6 md:py-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Easygenerator Inc.
          </Link>
        </div>
      </div>
      <Hero />
    </div>
  )
}
