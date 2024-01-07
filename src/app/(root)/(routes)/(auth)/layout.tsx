import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center overflow-scroll bg-gray-50">
      <div className="relative h-full w-full min-w-[var(--app-min-width)] max-w-[var(--app-max-width)] bg-white">
        {children}
      </div>
    </div>
  )
}
