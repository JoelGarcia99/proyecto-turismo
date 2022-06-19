import Dropzone from "react-dropzone";

import PropTypes from "prop-types";
import {useState} from "react";

const FileUploaderComponent = ({callback}) => {

	const [files, _setFiles] = useState(null);

	const setFiles = (files) =>{
		_setFiles(files);
		callback(files);
		console.log("setted")
	}

	return <div id="file-uploader flex flex-col rounded shadow">
		<h1>Subir archivos</h1>
		<Dropzone onDrop={() => {}}>
			{({getRootProps, getInputProps}) => (
				<div>
					<label className="block text-sm font-medium text-gray-700">Imagen principal</label>
					<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
						<div className="space-y-1 text-center">
							{

									<svg
										className="mx-auto h-12 w-12 text-gray-400"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 48 48"
										aria-hidden="true"
									>
										<path
											d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
							}
							<div className="flex text-sm text-gray-600">
								<label
									htmlFor="file-upload"
									className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
								>
									{

											<>

												<span>Suba una imagen</span>
												<input
													{...getInputProps()}
													onInput={(e) => setFiles(e.target.files[0])}
													onDrop={(e) => setFiles(e.target.files[0])}
													id="file-upload"
													name="file-upload"
													type="file"
													className="sr-only"
												/>
											</>
									}
								</label>
								<p className="pl-1">o arrastre una</p>
							</div>
							<p className="text-xs text-gray-500">PNG, JPG de máximo 10MB</p>
						</div>
					</div>
				</div>
			)}
			{/* <section className="bg-slate-200 px-2 py-2 rounded"> */}
			{/* 	<div {...getRootProps()}> */}
			{/* 		<input {...getInputProps()} /> */}
			{/* 		<p>Drag 'n' drop some files here, or click to select files</p> */}
			{/* 	</div> */}
			{/* </section> */}
		</Dropzone>
	</div >
}

FileUploaderComponent.propTypes = {
	callback: PropTypes.func.isRequired
}

export default FileUploaderComponent
