import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories";
import PropTypes from 'prop-types'; 

const initialState = {
  id: uuidv4(),
  categoria: 1,
  name: "",
  calorias: 0
};

export default function Form({ dispatch, state }) {
  const [activity, setActivity] = useState(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.find(activity => activity.id === state.activeId);
      if (selectedActivity) {
        setActivity(selectedActivity);
      }
    }
  }, [state.activeId, state.activities]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setActivity({
      ...activity,
      [id]: id === 'calorias' ? Number(value) : id === 'categoria' ? Number(value) : value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.name && activity.calorias > 0) {
      dispatch({ type: state.activeId ? 'update-activity' : 'add-activity', payload: activity });
      setActivity(initialState);
    }
  }

  // Validación simple para habilitar o deshabilitar el botón de envío
  const isValidActivity = () => activity.name && activity.calorias > 0;

  return (
    <form className="space-y-5 bg-white shadow-2xl p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="categoria" className="font-bold">Categoría</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="categoria"
          value={activity.categoria}
          onChange={handleChange}
        >
          {categories.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Comida, Zumo de naranja, Costillas, Correr, Nadar..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calorias" className="font-bold">Calorías</label>
        <input
          id="calorias"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: 300 o 500"
          value={activity.calorias}
          onChange={handleChange}
        />
      </div>

      <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-950 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.categoria === 1 ? "Guardar Comida" : "Guardar Actividad"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}

// Definir los tipos de las propiedades
Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    activeId: PropTypes.string,
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        categoria: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        calorias: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
