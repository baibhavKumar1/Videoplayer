import useTheme from "./useTheme"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex gap-5 border rounded-full p-1 px-2">
    <button className='text-black dark:text-white' onClick={() => setTheme("light")}>Light</button>
    <button className='text-black dark:text-white' onClick={() => setTheme("dark")}>Dark</button>
    </div>
  )
}
