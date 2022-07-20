const Create = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
        />
        <input
          type="file"
          name="Asset"
          className="my-4 "
        />
        <button className="font-bold mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>

  )
}

export default Create