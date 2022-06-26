import {Editor} from "@tinymce/tinymce-react";
import {useRef} from "react";

const CustomRichText = ({title, name, value, onChange, description}) => {

	const editorRef = useRef(null);

	return <div>
		<label htmlFor="about" className="block text-sm font-medium text-gray-700">
			{title}
		</label>
		<div className="mt-1">
			<Editor
				apiKey={process.env.REACT_APP_TINY_API}
				onInit={(evt, editor) => editorRef.current = editor}
				value={value}
				onEditorChange={(newValue, _) => onChange({target: {name: name, value: newValue}})}
				init={{
					height: 500,
					menubar: false,
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
			/>
		</div>
		<p className="mt-2 text-sm text-gray-500">
			{description}
		</p>
	</div>
}

export default CustomRichText
