import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import ContactForm from './ContactForm';

const initialColor = {
	color: '',
	code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		console.log(colorToEdit);
		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				console.log(res.data);
				updateColors([...colors.filter(color => color.id !== colorToEdit.id), res.data]);
				setEditing(false);
				window.location.href = '/protected';
			})
			.catch(err => console.log(err));
	};

	const deleteColor = color => {
		console.log(color.id);
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${color.id}`)
			.then(res => {
				console.log(res.data);
				updateColors(res.data);
				window.location.href = '/protected';
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div className="color-box" style={{ backgroundColor: color.code.hex }} />
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e => setColorToEdit({ ...colorToEdit, color: e.target.value })}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			<ContactForm />
		</div>
	);
};

export default ColorList;
