import SharedMenu from '@/components/shared/SharedMenu'

export default async function AboutContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="shared-menu-layout">
      <SharedMenu />
      {children}
    </div>
  )
}
