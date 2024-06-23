import Link from 'next/link'
import Image from 'next/image'
const HeaderLogo = () => {
  return (
    <div>
      <Link href='/'>
      <div className="item-center hidden lg:flex ">
        <Image src='/logo.jpeg' alt='logo' height={28} width={28} />
        <p className=' font-semibold text-white text-2xl ml-2.5'>
            Jarvis
        </p>
      </div>
      </Link>
    </div>
  )
}

export default HeaderLogo
