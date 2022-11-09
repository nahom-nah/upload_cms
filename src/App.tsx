import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  type Frame = {
    id: number;
    name: string;
    path: string;
    created_at: string;
    size: number;
  };
  const [file, setFile] = useState("");
  const [files, setFiles] = useState<Frame[]>([]);

  useEffect(() => {
    axios.get("http://localhost:9000/api/files", {}).then((res) => {
      let data = res.data.files
      // .map(
      //   (file: Omit<Frame, "created_at"> & { created_at: string }) =>
      //     ({
      //       ...file,
      //       created_at: new Date(file.created_at),
      //     } as Frame)
      // );

      console.log("data", data);
      setFiles(data);
      // files.push(data)

      console.log("state test :", files);
    });
  }, []);
  let handleSubmit = () => { 
    const formData = new FormData();
    formData.append("file", file);
    axios.post("http://localhost:9000/api/upload", formData, {}).then((res) => {
      console.log(res);
    });
  };

  let handleDelete = (id:number) =>{
    axios.delete("http://localhost:9000/api/delete", {
    }).then((res) => {
      console.log(res);
    });
  }
  let onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="py-10 flex justify-center align-center w-full  h-screen">
      <div className="w-4/5 h-4/5">
        <form onSubmit={handleSubmit} className="py-2">
          <input
            onChange={onFileChange}
            type="file"
            className="  text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold 
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 px-10 py-1  rounded-3xl text-white"
          >
            submit
          </button>
        </form>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">File Name</th>
              <th className="py-3 px-6">Size</th>
              <th className="py-3 px-6">Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map(el=>(
                <>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="py-3 px-6">{ files[0].name}</td>
                  <td className="py-3 px-6">{files[0].size}</td>
                  <td className="py-3 px-6">{files[0].created_at}</td>
                  <td><button className="bg-red-600 text-white px-10 py-2 rounded-3xl" onClick={()=>handleDelete(files[0].id)}>delete</button></td>
                </tr>
              </>
              ))
             
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
