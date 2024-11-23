import { useMemo } from "react";
import PropTypes from 'prop-types';
import CalorieDisplay from "./CalorieDisplay";

export default function CalorieTracker({ activities }) {
  console.log("Actividades en CalorieTracker:", activities);

  const caloriesConsumed = useMemo(() => 
    activities.reduce((total, activity) => 
      activity.categoria === 1 ? total + activity.calorias : total,
      0
    ), 
    [activities]
  );

  const caloriesBurned = useMemo(() => 
    activities.reduce((total, activity) =>
      activity.categoria === 2 ? total + activity.calorias : total,
      0
    ), 
    [activities]
  );

  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [
    caloriesBurned,
    caloriesConsumed
  ]);

  console.log("Calorías consumidas:", caloriesConsumed);
  console.log("Calorías quemadas:", caloriesBurned);
  console.log("Calorías netas:", netCalories);

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Quemadas" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}

// Validación de las props
CalorieTracker.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoria: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      calorias: PropTypes.number.isRequired,
    })
  ).isRequired,
};
