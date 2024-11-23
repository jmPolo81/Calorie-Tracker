import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducers";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <>
      <section
        className="relative pt-10 pb-20 px-5 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/Nutricion_deportiva.jpg)" }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative max-w-4xl mx-auto flex justify-between items-center mb-10 z-10">
          <h1
            className="text-6xl text-black-300 text-center font-bold"
            style={{
              fontFamily: "Slugs Racer",
              WebkitTextStroke: "1px yellow",
              textShadow: "2px 15px 15px rgba(0, 0, 0, 0.9)",
            }}
          >
            Calories Tracker
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-950 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar contador
          </button>
        </div>
        <div className="relative max-w-4xl mx-auto z-10">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section
        className="relative pt-10 pb-20 px-5 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/Nutricion_deportiva.jpg)" }}
      >
        {/* Capa de transparencia en el fondo */}
        <div className="absolute inset-0 bg-white/70 z-0"></div>

        {/* Contenido principal con z-index más alto */}
        <div className="relative p-10 mx-auto max-w-4xl z-10">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}

export default App;
