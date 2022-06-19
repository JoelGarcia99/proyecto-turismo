const CustomNormalInput = ({label, name, errorMsg, type="text", width="full", ...props}) => {
    return <div className={`w-${width} md:w-1/2 px-3 mb-6 md:mb-0`}>
      <label 
	className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
	htmlFor="grid-first-name"
      >
	{label}
      </label>
      <input 
	className={`appearance-none block w-full bg-${errorMsg && "red" || "gray"}-200 text-gray-700 border border-${errorMsg && "red" || "gray"}-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
	name={name}
	type={type}
	{...props}
      />
      {
	errorMsg && <p className="text-red-500 text-xs italic">*{errorMsg}</p>
      }
    </div>
}

export default CustomNormalInput
