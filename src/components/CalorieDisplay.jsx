import PropTypes from 'prop-types';

export default function CalorieDisplay({ calories, text }) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange">{calories}</span> {text}
    </p>
  );
}

// Definición de PropTypes
CalorieDisplay.propTypes = {
  calories: PropTypes.number.isRequired, // Para asegurar de que sea un número y sea requerido
  text: PropTypes.string.isRequired,      // Para asegurar de que sea una cadena y sea requerido
};
