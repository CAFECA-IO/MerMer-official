import Image from "next/image"
import { FormEvent } from "react"
// import { useRouter } from "next/navigation"

interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ search, setSearch }: Props) {

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearch("");
  }

  return (
    // onSubmit={e => hanldeSubmit()}然後把滑鼠移動到e上面就可以看到type
    <form className="flex h-[44px] w-[320px] justify-center gap-2 rounded-[41px] bg-dropDownHover px-4 py-3 md:justify-between"
      onSubmit={handleSubmit}
    >
      {/* input要用動態setSearch變換值 */}
      <Image
        src='/elements/search.svg'
        width={24}
        height={24}
        alt="Searc Icon"
      />
      <input
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value.trim())}
        className="h-auto w-full bg-gray-800/0 text-base text-lightWhite1 caret-lightWhite1 outline-none placeholder:text-lightGray1"
        placeholder="Search"
      />
    </form>
  )
}
