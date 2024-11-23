import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types'; // Importar PropTypes

export default function ActivityList({ activities, dispatch }) {
  const categoryName = useMemo(
    () => (category) => categories.find(cat => cat.id === category)?.name || '',
    []
  );

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      <h2 className='text-4xl font-bold text-slate-600 text-center'>Comida y Actividades</h2>
      {isEmptyActivities ? (
        <p className="text-center my-5">No hay actividades</p>
      ) : (
        activities.map(activity => (
          <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow-xl">
            <div className="space-y-2 relative">
              <p className={`absolute -top-8 -left-4 rounded-lg px-10 py-2 text-white uppercase font-bold ${activity.categoria === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                {categoryName(+activity.categoria)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">{activity.calorias} <span>Calorías</span></p>
            </div>
            <div className="flex gap-5 items-center">
              <button onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}>
                <PencilSquareIcon className="h-8 w-8 text-gray-900" />
              </button>
              <button onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}>
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}

// Definir los tipos de las propiedades
ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoria: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      calorias: PropTypes.number.isRequired,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};
