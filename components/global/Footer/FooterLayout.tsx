import type { PortableTextBlock } from '@portabletext/types'

import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  const items = [
    {
      title: 'Newsletter',
      href: '/newsletter'
    },
    {
      title: 'Contact',
      href: '/contact'
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/thisisnotagallery/'
    },
    {
      title: 'Privacy Policy',
      href: '/privacy-policy'
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-items">
        {items.map((item, key) => (
          <a
            key={key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item"
          >
            {item.title}
          </a>
        )
        )}
      </div>
      {/* {footer && (
        <CustomPortableText
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      )} */}
    </footer>
  )
}
