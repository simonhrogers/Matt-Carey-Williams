import Link from 'next/link'

export function SharedMenu() {

  const menuItems = [
    {
      title: 'About',
      slug: 'about'
    },
    {
      title: 'Contact',
      slug: 'contact'
    },
  ]

  return (
    <div className="shared-menu">
      {menuItems.map((item, key) => (
        <Link
          key={key}
          href={item.slug}
          className='item'
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default SharedMenu